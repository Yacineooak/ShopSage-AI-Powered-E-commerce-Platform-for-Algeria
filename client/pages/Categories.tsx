import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Users, Star, ArrowRight, Grid, List, Filter, Home, ChevronRight } from 'lucide-react';
import { categories } from '../lib/data/products';
import { useAppStore } from '../lib/stores/app-store';
import { useAuthStore } from '../lib/stores/auth-store';
import { useTranslation, Language } from '../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const categoryImages = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
  clothing: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
  home: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
  books: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
  sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
  beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
  automotive: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop',
  toys: 'https://images.unsplash.com/photo-1558060370-d140d2fc6d95?w=600&h=400&fit=crop',
};

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);
  const { setSelectedCategory } = useAppStore();
  const { user } = useAuthStore();
  const language: Language = user?.preferences.language || 'fr';
  const t = useTranslation(language);
  const isRTL = language === 'ar';

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTrending = !showTrendingOnly || category.trending;
    
    return matchesSearch && matchesTrending;
  });

  const trendingCategories = categories.filter(cat => cat.trending);
  const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-muted/20 to-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-6">
        <nav className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-sm text-muted-foreground mb-4`}>
          <Link to="/" className="flex items-center hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">
            {language === 'ar' ? 'الفئات' : language === 'fr' ? 'Catégories' : 'Categories'}
          </span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-sage-100/50 to-accent/10 dark:from-primary/5 dark:via-sage-900/20 dark:to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {language === 'ar' ? 'استكشف فئاتنا' : language === 'fr' ? 'Explorez nos catégories' : 'Explore Our Categories'}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف مجموعة واسعة من المنتجات المنظمة بعناية لتناسب احتياجاتك'
                : language === 'fr'
                ? 'Découvrez une large gamme de produits soigneusement organisés pour répondre à vos besoins'
                : 'Discover a wide range of products carefully organized to meet your needs'
              }
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto mb-8">
              <div className="relative">
                <Search className={`absolute top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 ${isRTL ? 'right-4' : 'left-4'}`} />
                <Input
                  type="text"
                  placeholder={language === 'ar' ? 'البحث عن فئة...' : language === 'fr' ? 'Rechercher une catégorie...' : 'Search categories...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`text-center ${isRTL ? 'pr-12' : 'pl-12'} py-3 text-lg border-2 border-primary/20 focus:border-primary`}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{categories.length}</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'فئة' : language === 'fr' ? 'Catégories' : 'Categories'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{totalProducts.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'منتج' : language === 'fr' ? 'Produits' : 'Products'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{trendingCategories.length}</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'رائج' : language === 'fr' ? 'Tendances' : 'Trending'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b bg-background/95 backdrop-blur sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className={`flex flex-col lg:flex-row items-center justify-between gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <span className="text-sm font-medium">
                {language === 'ar' 
                  ? `تم العثور على ${filteredCategories.length} فئة`
                  : language === 'fr'
                  ? `${filteredCategories.length} catégories trouvées`
                  : `${filteredCategories.length} categories found`
                }
              </span>
              {searchQuery && (
                <Badge variant="secondary">
                  {language === 'ar' ? `البحث: "${searchQuery}"` : language === 'fr' ? `Recherche: "${searchQuery}"` : `Searching: "${searchQuery}"`}
                </Badge>
              )}
              {showTrendingOnly && (
                <Badge variant="default">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {language === 'ar' ? 'الرائج فقط' : language === 'fr' ? 'Tendances uniquement' : 'Trending Only'}
                </Badge>
              )}
            </div>

            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Button
                variant={showTrendingOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowTrendingOnly(!showTrendingOnly)}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'رائج' : language === 'fr' ? 'Tendances' : 'Trending'}
              </Button>

              <Separator orientation="vertical" className="h-6" />

              <div className="flex border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {language === 'ar' ? 'لم يتم العثور على فئات' : language === 'fr' ? 'Aucune catégorie trouvée' : 'No categories found'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {language === 'ar' 
                  ? 'جرب تعديل مصطلحات البحث أو إزالة الفلاتر'
                  : language === 'fr'
                  ? 'Essayez d\'ajuster vos termes de recherche ou de supprimer les filtres'
                  : 'Try adjusting your search terms or remove filters'
                }
              </p>
              <Button onClick={() => { setSearchQuery(''); setShowTrendingOnly(false); }}>
                {language === 'ar' ? 'مسح البحث' : language === 'fr' ? 'Effacer la recherche' : 'Clear Search'}
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            }>
              {filteredCategories.map((category) => (
                <Card
                  key={category.id}
                  className={`group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                    <div className="relative overflow-hidden">
                      <img
                        src={categoryImages[category.id as keyof typeof categoryImages]}
                        alt={category.name}
                        className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                          viewMode === 'list' ? 'w-full h-48' : 'w-full h-48'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Category Icon & Trending Badge */}
                      <div className={`absolute top-4 flex items-center ${isRTL ? 'right-4 space-x-reverse space-x-2' : 'left-4 space-x-2'}`}>
                        <div className="text-2xl bg-white/90 rounded-lg p-2">
                          {category.icon}
                        </div>
                        {category.trending && (
                          <Badge className="bg-primary text-primary-foreground">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {language === 'ar' ? 'رائج' : language === 'fr' ? 'Tendance' : 'Trending'}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Product Count */}
                      <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                        <Badge variant="secondary" className="bg-white/90 text-black">
                          {category.productCount} {language === 'ar' ? 'منتج' : language === 'fr' ? 'produits' : 'products'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="space-y-4">
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {language === 'ar' ? t.categories[category.id as keyof typeof t.categories] : category.name}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm mt-2">
                          {category.description}
                        </p>
                      </div>

                      {/* Subcategories */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {language === 'ar' ? 'فئات فرعية شائعة:' : language === 'fr' ? 'Sous-catégories populaires:' : 'Popular subcategories:'}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {category.subcategories.slice(0, 3).map((sub) => (
                            <Badge key={sub} variant="outline" className="text-xs">
                              {sub}
                            </Badge>
                          ))}
                          {category.subcategories.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.subcategories.length - 3} {language === 'ar' ? 'أكثر' : language === 'fr' ? 'plus' : 'more'}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className={`flex items-center justify-between pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'} text-sm text-muted-foreground`}>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            4.{Math.floor(Math.random() * 5) + 3}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {Math.floor(category.productCount / 10)}k+ {language === 'ar' ? 'مبيع' : language === 'fr' ? 'vendus' : 'sold'}
                          </div>
                        </div>

                        <Button
                          asChild
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          <Link to={`/products?category=${category.id}`}>
                            {language === 'ar' ? 'استكشف' : language === 'fr' ? 'Explorer' : 'Explore'}
                            <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Categories */}
      {!searchQuery && !showTrendingOnly && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'الفئات الرائجة' : language === 'fr' ? 'Catégories tendances' : 'Trending Categories'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar' 
                  ? 'اكتشف ما هو رائج الآن! هذه الفئات تشهد أكبر نشاط واهتمام من العملاء.'
                  : language === 'fr'
                  ? 'Découvrez ce qui est tendance en ce moment ! Ces catégories connaissent le plus d\'activité et d\'intérêt client.'
                  : 'Discover what\'s hot right now! These categories are seeing the most activity and customer interest.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={categoryImages[category.id as keyof typeof categoryImages]}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className={`absolute bottom-2 text-white ${isRTL ? 'right-3' : 'left-3'}`}>
                        <div className="text-lg font-bold">
                          {language === 'ar' ? t.categories[category.id as keyof typeof t.categories] : category.name}
                        </div>
                        <div className="text-sm opacity-90">
                          {category.productCount} {language === 'ar' ? 'منتج' : language === 'fr' ? 'produits' : 'products'}
                        </div>
                      </div>
                      <div className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'}`}>
                        <Badge className="bg-red-500 text-white">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {language === 'ar' ? 'حار' : language === 'fr' ? 'Chaud' : 'Hot'}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
