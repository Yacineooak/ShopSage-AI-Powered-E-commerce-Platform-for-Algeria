import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, TrendingUp, Clock, X, ArrowRight } from 'lucide-react';
import { useAppStore } from '../../lib/stores/app-store';
import { useAuthStore } from '../../lib/stores/auth-store';
import { sampleProducts, categories } from '../../lib/data/products';
import { useTranslation, Language, formatCurrency } from '../../lib/i18n';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';

interface SmartSearchProps {
  className?: string;
  placeholder?: string;
  onSelectProduct?: (productId: string) => void;
  onSearch?: (query: string) => void;
}

const getPopularSearches = (language: Language) => {
  if (language === 'ar') {
    return [
      'سماعات لاسلكية',
      'ساعة ذكية', 
      'أحذية رياضية',
      'آلة قهوة',
      'حقيبة لابتوب',
      'بساط يوغا',
      'غطاء هاتف',
      'مجموعة عناية بالبشرة'
    ];
  } else if (language === 'fr') {
    return [
      'Écouteurs sans fil',
      'Montre intelligente',
      'Chaussures de course',
      'Machine à café',
      'Sac pour ordinateur portable',
      'Tapis de yoga',
      'Coque de téléphone',
      'Kit de soins de la peau'
    ];
  }
  return [
    'Wireless headphones',
    'Smart watch',
    'Running shoes',
    'Coffee maker',
    'Laptop bag',
    'Yoga mat',
    'Phone case',
    'Skincare set'
  ];
};

const getTrendingSearches = (language: Language) => {
  if (language === 'ar') {
    return [
      'أجهزة ذكية',
      'منتجات مستدامة',
      'مكتب منزلي',
      'معدات رياضية',
      'أجهزة منزل ذكي'
    ];
  } else if (language === 'fr') {
    return [
      'Gadgets IA',
      'Produits durables',
      'Bureau à domicile',
      'Équipement fitness',
      'Appareils maison intelligente'
    ];
  }
  return [
    'AI gadgets',
    'Sustainable products',
    'Home office setup',
    'Fitness equipment',
    'Smart home devices'
  ];
};

export function SmartSearch({ 
  className = '', 
  placeholder,
  onSelectProduct,
  onSearch
}: SmartSearchProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { searchQuery, setSearchQuery, setSelectedCategory } = useAppStore();
  const { user } = useAuthStore();
  const language: Language = user?.preferences.language || 'fr';
  const t = useTranslation(language);
  const isRTL = language === 'ar';
  
  const popularSearches = getPopularSearches(language);
  const trendingSearches = getTrendingSearches(language);
  
  const defaultPlaceholder = language === 'ar' ? 'البحث عن المنتجات...' : language === 'fr' ? 'Rechercher des produits...' : 'Search products...';

  // Handle search submission
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    // Update recent searches
    const newRecentSearches = [
      searchTerm,
      ...recentSearches.filter(term => term !== searchTerm)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recent-searches', JSON.stringify(newRecentSearches));
    
    // Update global search query
    setSearchQuery(searchTerm);
    
    // Reset states
    setIsOpen(false);
    setQuery('');
    
    // Call onSearch callback or navigate to products
    if (onSearch) {
      onSearch(searchTerm);
    } else {
      navigate('/products');
    }
  };

  // Handle category search
  const handleCategorySearch = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsOpen(false);
    setQuery('');
    navigate('/products');
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to parse recent searches from localStorage');
        localStorage.removeItem('recent-searches');
      }
    }
  }, []);

  // Get suggestions based on query
  const suggestions = query.length > 0 ? {
    products: sampleProducts
      .filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5),
    categories: categories
      .filter(category => 
        category.name.toLowerCase().includes(query.toLowerCase()) ||
        category.description.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 3)
  } : { products: [], categories: [] };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(query);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent-searches');
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 ${isRTL ? 'right-3' : 'left-3'}`} />
        <Input
          type="text"
          placeholder={placeholder || defaultPlaceholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={`${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 ${isRTL ? 'left-1' : 'right-1'}`}
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Dropdown */}
      {isOpen && (
        <Card className={`absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
          <CardContent className="p-0">
            {query.length === 0 ? (
              /* Default suggestions when no query */
              <div className="p-4 space-y-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center text-sm font-medium text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {language === 'ar' ? 'عمليات البحث الأخيرة' : language === 'fr' ? 'Recherches récentes' : 'Recent Searches'}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={clearRecentSearches}
                      >
                        {language === 'ar' ? 'مسح' : language === 'fr' ? 'Effacer' : 'Clear'}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          className={`w-full px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                          onClick={() => handleSearch(term)}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {recentSearches.length > 0 && <Separator />}

                {/* Popular Searches */}
                <div>
                  <div className={`flex items-center text-sm font-medium text-muted-foreground mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <TrendingUp className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'عمليات البحث الشائعة' : language === 'fr' ? 'Recherches populaires' : 'Popular Searches'}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {popularSearches.slice(0, 6).map((term, index) => (
                      <button
                        key={index}
                        className={`px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                        onClick={() => handleSearch(term)}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Trending */}
                <div>
                  <div className={`flex items-center text-sm font-medium text-muted-foreground mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Sparkles className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'الأكثر رواجاً الآن' : language === 'fr' ? 'Tendance maintenant' : 'Trending Now'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((term, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => handleSearch(term)}
                      >
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Search results */
              <div className="p-4 space-y-4">
                {/* AI Suggestion */}
                {query.length > 2 && (
                  <div className="bg-gradient-to-r from-primary/10 to-sage-100/50 dark:from-primary/5 dark:to-sage-900/20 p-3 rounded-lg">
                    <div className={`flex items-center text-sm font-medium text-primary mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Sparkles className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {language === 'ar' ? 'اقتراح ذكي' : language === 'fr' ? 'Suggestion IA' : 'AI Suggestion'}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' 
                        ? `تبحث عن "${query}"؟ جرب البحث عن "${query} لاسلكي" أو تحقق من فئة الإلكترونيات للعناصر المشابهة.`
                        : language === 'fr'
                        ? `Vous cherchez "${query}" ? Essayez de rechercher "${query} sans fil" ou consultez notre catégorie Électronique pour des articles similaires.`
                        : `Looking for "${query}"? Try searching for "wireless ${query}" or check our Electronics category for similar items.`
                      }
                    </p>
                  </div>
                )}

                {/* Product Suggestions */}
                {suggestions.products.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-3">
                      {language === 'ar' ? 'المنتجات' : language === 'fr' ? 'Produits' : 'Products'}
                    </div>
                    <div className="space-y-2">
                      {suggestions.products.map((product) => (
                        <button
                          key={product.id}
                          className={`w-full flex items-center p-2 hover:bg-muted rounded-md transition-colors ${isRTL ? 'space-x-reverse space-x-3 text-right' : 'space-x-3 text-left'}`}
                          onClick={() => {
                            onSelectProduct?.(product.id);
                            setIsOpen(false);
                          }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{product.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatCurrency(product.price, 'DZD')}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {language === 'ar' ? t.categories[product.category as keyof typeof t.categories] : categories.find(c => c.id === product.category)?.name}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category Suggestions */}
                {suggestions.categories.length > 0 && (
                  <div>
                    {suggestions.products.length > 0 && <Separator />}
                    <div className="text-sm font-medium text-muted-foreground mb-3">
                      {language === 'ar' ? 'الفئات' : language === 'fr' ? 'Catégories' : 'Categories'}
                    </div>
                    <div className="space-y-1">
                      {suggestions.categories.map((category) => (
                        <button
                          key={category.id}
                          className={`w-full flex items-center p-2 hover:bg-muted rounded-md transition-colors ${isRTL ? 'space-x-reverse space-x-3 text-right' : 'space-x-3 text-left'}`}
                          onClick={() => handleCategorySearch(category.id)}
                        >
                          <div className="text-2xl">{category.icon}</div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              {language === 'ar' ? t.categories[category.id as keyof typeof t.categories] : category.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {category.productCount} {language === 'ar' ? 'منتج' : language === 'fr' ? 'produits' : 'products'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {suggestions.products.length === 0 && suggestions.categories.length === 0 && (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <div className="text-sm font-medium mb-1">
                      {language === 'ar' ? 'لم يتم العثور على نتائج' : language === 'fr' ? 'Aucun résultat trouvé' : 'No results found'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'جرب البحث عن شيء آخر' : language === 'fr' ? 'Essayez de rechercher autre chose' : 'Try searching for something else'}
                    </div>
                  </div>
                )}

                {/* Search Button */}
                <div className="pt-3 border-t">
                  <Button
                    className="w-full"
                    onClick={() => handleSearch(query)}
                  >
                    {language === 'ar' ? `البحث عن "${query}"` : language === 'fr' ? `Rechercher "${query}"` : `Search for "${query}"`}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
