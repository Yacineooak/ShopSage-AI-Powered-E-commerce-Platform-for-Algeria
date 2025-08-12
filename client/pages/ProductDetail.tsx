import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { sampleProducts } from '../lib/data/products';
import { useCartStore } from '../lib/stores/cart-store';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Card, CardContent } from '../components/ui/card';

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const { addItem, currency } = useCartStore();
  
  const product = sampleProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

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
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-5 h-5 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  // For demo purposes, using the same image multiple times
  const images = [product.image, product.image, product.image];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-8 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-primary">
          Home
        </Link>
        <span className="text-muted-foreground">/</span>
        <Link to="/products" className="text-muted-foreground hover:text-primary">
          Products
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="font-medium">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                  selectedImage === index
                    ? 'border-primary'
                    : 'border-transparent hover:border-muted-foreground'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="capitalize">
                {product.category.replace('-', ' ')}
              </Badge>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
                <span className="text-sm text-muted-foreground ml-2">
                  ({product.rating} out of 5)
                </span>
              </div>
              <span className="text-sm text-muted-foreground">156 reviews</span>
            </div>
            
            <div className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <Separator />

          {/* Purchase Options */}
          <div className="space-y-6">
            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-lg font-medium min-w-[40px] text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-medium">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 text-sm">
              <Truck className="w-5 h-5 text-muted-foreground" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <RotateCcw className="w-5 h-5 text-muted-foreground" />
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-bold text-primary mt-1">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
