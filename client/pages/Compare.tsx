import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Star, Heart, ShoppingCart, ArrowLeft, RotateCcw, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useComparisonStore } from '../lib/stores/comparison-store';
import { useCartStore } from '../lib/stores/cart-store';
import { useWishlistStore } from '../lib/stores/wishlist-store';
import { sampleProducts } from '../lib/data/products';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const comparisonFeatures = [
  { key: 'price', label: 'Price', type: 'currency' },
  { key: 'rating', label: 'Rating', type: 'rating' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'inStock', label: 'Availability', type: 'boolean' },
  { key: 'description', label: 'Description', type: 'text' },
];

export default function Compare() {
  const { items, removeItem, clearComparison, addItem } = useComparisonStore();
  const { addItem: addToCart, currency } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  const renderFeatureValue = (product: any, feature: any) => {
    const value = product[feature.key];
    
    switch (feature.type) {
      case 'currency':
        return formatPrice(value);
      case 'rating':
        return (
          <div className="flex items-center space-x-1">
            {renderStars(value)}
            <span className="text-sm ml-2">({value})</span>
          </div>
        );
      case 'boolean':
        return (
          <Badge variant={value ? 'default' : 'destructive'}>
            {value ? 'In Stock' : 'Out of Stock'}
          </Badge>
        );
      case 'text':
        return feature.key === 'category' ? 
          <Badge variant="outline">{value.replace('-', ' ')}</Badge> :
          <span className="text-sm">{value}</span>;
      default:
        return value;
    }
  };

  const handleAddProduct = () => {
    if (selectedProduct && items.length < 4) {
      const product = sampleProducts.find(p => p.id === selectedProduct);
      if (product) {
        addItem(product);
        setSelectedProduct('');
      }
    }
  };

  const availableProducts = sampleProducts.filter(
    product => !items.find(item => item.id === product.id)
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Empty State */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center"
            >
              <RotateCcw className="w-16 h-16 text-muted-foreground" />
            </motion.div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Product Comparison</h1>
              <p className="text-xl text-muted-foreground">
                Compare up to 4 products side-by-side to make the best decision.
              </p>
            </div>

            <div className="space-y-4">
              <Button asChild size="lg">
                <Link to="/products">
                  Browse Products
                </Link>
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Click the compare icon on any product to add it to comparison
              </div>
            </div>

            {/* How it works */}
            <div className="grid md:grid-cols-3 gap-6 pt-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <Plus className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Add Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Add up to 4 products to compare
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <RotateCcw className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Compare Features</h3>
                  <p className="text-sm text-muted-foreground">
                    See differences side-by-side
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Make Decision</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose the best product for you
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 via-sage-100/50 to-accent/10 dark:from-primary/5 dark:via-sage-900/20 dark:to-accent/5">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Button variant="ghost" asChild>
                <Link to="/products">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Link>
              </Button>
            </div>
            
            <div className="text-center space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold">
                Product{' '}
                <span className="bg-gradient-to-r from-primary to-sage-600 bg-clip-text text-transparent">
                  Comparison
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Comparing {items.length} product{items.length !== 1 ? 's' : ''} side-by-side
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {items.length < 4 && (
                  <div className="flex items-center space-x-2">
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Add another product" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddProduct} disabled={!selectedProduct}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <Button variant="outline" onClick={clearComparison}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
                
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Comparison
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="min-w-full"
            >
              <Card>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-6 w-48">
                          <span className="font-semibold">Features</span>
                        </th>
                        {items.map((product, index) => (
                          <th key={product.id} className="text-center p-6 min-w-64">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="space-y-4"
                            >
                              <div className="relative">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute -top-2 -right-2 z-10"
                                  onClick={() => removeItem(product.id)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg line-clamp-2">
                                  {product.name}
                                </h3>
                                <p className="text-2xl font-bold text-primary mt-2">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                              <div className="flex justify-center space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => addToCart(product)}
                                  className="flex-1"
                                >
                                  <ShoppingCart className="w-4 h-4 mr-1" />
                                  Add to Cart
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (isInWishlist(product.id)) {
                                      removeFromWishlist(product.id);
                                    } else {
                                      addToWishlist(product);
                                    }
                                  }}
                                >
                                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                </Button>
                              </div>
                            </motion.div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((feature, featureIndex) => (
                        <motion.tr
                          key={feature.key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: featureIndex * 0.05 }}
                          className="border-b hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-6 font-medium bg-muted/30">
                            {feature.label}
                          </td>
                          {items.map((product) => (
                            <td key={product.id} className="p-6 text-center">
                              {renderFeatureValue(product, feature)}
                            </td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Similar Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              You might also be interested in these related products.
            </p>
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/products">
                Explore More Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
