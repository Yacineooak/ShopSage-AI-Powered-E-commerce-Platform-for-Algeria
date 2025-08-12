import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { featuredProducts } from '../../lib/data/products';
import { ProductCard } from '../products/ProductCard';
import { Button } from '../ui/button';

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">
              Handpicked products just for you
            </p>
          </div>
          
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link to="/products">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
