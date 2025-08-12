import { ArrowRight, Sparkles, ShoppingBag, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sage-50 via-white to-sage-100 dark:from-sage-950 dark:via-background dark:to-sage-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Sparkles className="w-6 h-6 text-sage-400" />
      </div>
      <div className="absolute top-40 right-20 animate-bounce">
        <ShoppingBag className="w-8 h-8 text-sage-500" />
      </div>
      <div className="absolute bottom-20 left-20 animate-pulse">
        <Zap className="w-5 h-5 text-sage-600" />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Shopping Experience
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Shop Smarter with{' '}
                <span className="bg-gradient-to-r from-primary to-sage-600 bg-clip-text text-transparent">
                  ShopSage
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover premium products curated by AI. Get personalized recommendations, 
                compare prices across currencies, and enjoy seamless shopping in multiple languages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-white">
                <Link to="/products">
                  Start Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/categories">
                  Browse Categories
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&q=80"
                alt="Shopping Experience"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 z-20 bg-white dark:bg-card p-4 rounded-lg shadow-lg border animate-pulse">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Fast Delivery</div>
                  <div className="text-xs text-muted-foreground">2-day shipping</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 z-20 bg-white dark:bg-card p-4 rounded-lg shadow-lg border animate-bounce">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">★</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Top Rated</div>
                  <div className="text-xs text-muted-foreground">4.9/5 stars</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
