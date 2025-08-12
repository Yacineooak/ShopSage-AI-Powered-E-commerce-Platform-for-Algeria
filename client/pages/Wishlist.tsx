import { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Share2, Grid, List, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../lib/stores/wishlist-store';
import { useCartStore } from '../lib/stores/cart-store';
import { ProductCard } from '../components/products/ProductCard';
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

export default function Wishlist() {
  const { items, clearWishlist, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');

  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // recent
        return 0;
    }
  });

  const handleAddAllToCart = () => {
    items.forEach(item => addToCart(item));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My ShopSage Wishlist',
          text: `Check out my wishlist with ${items.length} amazing products!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Wishlist link copied to clipboard!');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Empty State */}
            <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Heart className="w-16 h-16 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Your Wishlist is Empty</h1>
              <p className="text-xl text-muted-foreground">
                Save items you love to your wishlist and find them easily later.
              </p>
            </div>

            <div className="space-y-4">
              <Button asChild size="lg">
                <Link to="/products">
                  Start Shopping
                </Link>
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Tip: Click the heart icon on any product to add it to your wishlist
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 pt-12">
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Save Favorites</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep track of products you love
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Share2 className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Share Lists</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your wishlist with friends
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Quick Purchase</h3>
                  <p className="text-sm text-muted-foreground">
                    Add all items to cart at once
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
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-sm font-medium">
              <Heart className="w-4 h-4 mr-2 fill-current" />
              Your Wishlist
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold">
              Saved for{' '}
              <span className="bg-gradient-to-r from-primary to-sage-600 bg-clip-text text-transparent">
                Later
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              You have {items.length} item{items.length !== 1 ? 's' : ''} saved in your wishlist
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleAddAllToCart} size="lg">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add All to Cart
              </Button>
              
              <Button variant="outline" onClick={handleShare} size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share Wishlist
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearWishlist}
                size="lg"
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="border-b bg-background/95 backdrop-blur sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">
                {items.length} item{items.length !== 1 ? 's' : ''} in wishlist
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="h-6" />

              {/* View Mode */}
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

      {/* Wishlist Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-6'
          }>
            {sortedItems.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                
                {/* Quick Actions Overlay */}
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white shadow-sm"
                    onClick={() => removeItem(product.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">You Might Also Like</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Based on your wishlist, here are some products you might be interested in.
            </p>
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/products">
                Discover More Products
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
