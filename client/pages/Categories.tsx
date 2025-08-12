import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Users, Star, ArrowRight, Grid, List, Filter } from 'lucide-react';
import { categories } from '../lib/data/products';
import { useAppStore } from '../lib/stores/app-store';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-sage-100/50 to-accent/10 dark:from-primary/5 dark:via-sage-900/20 dark:to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Grid className="w-4 h-4 mr-2" />
              Browse All Categories
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Discover Products by{' '}
              <span className="bg-gradient-to-r from-primary to-sage-600 bg-clip-text text-transparent">
                Category
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated categories with over {totalProducts.toLocaleString()} products 
              across {categories.length} different categories. Find exactly what you're looking for.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-12 text-lg border-2 focus:border-primary"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{categories.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalProducts.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{trendingCategories.length}</div>
                <div className="text-sm text-muted-foreground">Trending</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="border-b bg-background/95 backdrop-blur sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {filteredCategories.length} categories found
              </span>
              {searchQuery && (
                <Badge variant="secondary">
                  Searching: "{searchQuery}"
                </Badge>
              )}
              {showTrendingOnly && (
                <Badge variant="default">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Trending Only
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={showTrendingOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowTrendingOnly(!showTrendingOnly)}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
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
              <h3 className="text-2xl font-bold mb-2">No categories found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or remove filters
              </p>
              <Button onClick={() => { setSearchQuery(''); setShowTrendingOnly(false); }}>
                Clear Search
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
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <div className="text-2xl bg-white/90 rounded-lg p-2">
                          {category.icon}
                        </div>
                        {category.trending && (
                          <Badge className="bg-primary text-primary-foreground">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      
                      {/* Product Count */}
                      <div className="absolute bottom-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-black">
                          {category.productCount} products
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="space-y-4">
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm mt-2">
                          {category.description}
                        </p>
                      </div>

                      {/* Subcategories */}
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          Popular subcategories:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {category.subcategories.slice(0, 3).map((sub) => (
                            <Badge key={sub} variant="outline" className="text-xs">
                              {sub}
                            </Badge>
                          ))}
                          {category.subcategories.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.subcategories.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                            4.{Math.floor(Math.random() * 5) + 3}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {Math.floor(category.productCount / 10)}k+ sold
                          </div>
                        </div>

                        <Button
                          asChild
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          <Link to={`/products?category=${category.id}`}>
                            Explore
                            <ArrowRight className="w-4 h-4 ml-2" />
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
              <h2 className="text-3xl font-bold mb-4">Trending Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover what's hot right now! These categories are seeing the most activity and customer interest.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingCategories.map((category) => (
                <Card key={category.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={categoryImages[category.id as keyof typeof categoryImages]}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-3 text-white">
                      <div className="text-lg font-bold">{category.name}</div>
                      <div className="text-sm opacity-90">{category.productCount} products</div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
