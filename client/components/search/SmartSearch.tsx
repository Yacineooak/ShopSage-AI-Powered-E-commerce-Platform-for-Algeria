import { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, TrendingUp, Clock, X } from 'lucide-react';
import { useAppStore } from '../../lib/stores/app-store';
import { sampleProducts, categories } from '../../lib/data/products';
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

const popularSearches = [
  'Wireless headphones',
  'Smart watch',
  'Running shoes',
  'Coffee maker',
  'Laptop bag',
  'Yoga mat',
  'Phone case',
  'Skincare set'
];

const trendingSearches = [
  'AI gadgets',
  'Sustainable products',
  'Home office setup',
  'Fitness equipment',
  'Smart home devices'
];

export function SmartSearch({ 
  className = '', 
  placeholder = 'Search products...',
  onSelectProduct,
  onSearch
}: SmartSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { searchQuery, setSearchQuery } = useAppStore();

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

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      // Update recent searches
      const newRecentSearches = [
        searchTerm,
        ...recentSearches.filter(term => term !== searchTerm)
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      
      // Update global search query
      setSearchQuery(searchTerm);
      
      // Call onSearch callback
      onSearch?.(searchTerm);
    }
    
    setIsOpen(false);
    setQuery(searchTerm);
  };

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
    localStorage.removeItem('recentSearches');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-4"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
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
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {query.length === 0 ? (
              /* Default suggestions when no query */
              <div className="p-4 space-y-4">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        Recent Searches
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={clearRecentSearches}
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
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
                  <div className="flex items-center text-sm font-medium text-muted-foreground mb-3">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Popular Searches
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {popularSearches.slice(0, 6).map((term, index) => (
                      <button
                        key={index}
                        className="text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
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
                  <div className="flex items-center text-sm font-medium text-muted-foreground mb-3">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Trending Now
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
                    <div className="flex items-center text-sm font-medium text-primary mb-2">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Suggestion
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Looking for "{query}"? Try searching for "wireless {query}" or check our Electronics category for similar items.
                    </p>
                  </div>
                )}

                {/* Product Suggestions */}
                {suggestions.products.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-3">
                      Products
                    </div>
                    <div className="space-y-2">
                      {suggestions.products.map((product) => (
                        <button
                          key={product.id}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-md transition-colors text-left"
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
                              {formatPrice(product.price)}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {categories.find(c => c.id === product.category)?.name}
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
                      Categories
                    </div>
                    <div className="space-y-1">
                      {suggestions.categories.map((category) => (
                        <button
                          key={category.id}
                          className="w-full flex items-center space-x-3 p-2 hover:bg-muted rounded-md transition-colors text-left"
                          onClick={() => handleSearch(`category:${category.name}`)}
                        >
                          <div className="text-2xl">{category.icon}</div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{category.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {category.productCount} products
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
                    <div className="text-sm font-medium mb-1">No results found</div>
                    <div className="text-xs text-muted-foreground">
                      Try searching for something else
                    </div>
                  </div>
                )}

                {/* Search Button */}
                <div className="pt-3 border-t">
                  <Button
                    className="w-full"
                    onClick={() => handleSearch(query)}
                  >
                    Search for "{query}"
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
