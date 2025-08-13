import { Product } from '../stores/cart-store';

export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets, devices, and electronic accessories',
    icon: '📱',
    productCount: 150,
    trending: true,
    subcategories: ['Smartphones', 'Laptops', 'Headphones', 'Smart Home', 'Gaming', 'Cameras']
  },
  {
    id: 'clothing',
    name: 'Fashion & Clothing',
    description: 'Trendy apparel, shoes, and accessories for all occasions',
    icon: '👗',
    productCount: 230,
    trending: true,
    subcategories: ['Men\'s Fashion', 'Women\'s Fashion', 'Kids\' Clothing', 'Shoes', 'Accessories', 'Jewelry']
  },
  {
    id: 'home',
    name: 'Home & Garden',
    description: 'Everything for your home, from furniture to gardening supplies',
    icon: '🏠',
    productCount: 180,
    trending: false,
    subcategories: ['Furniture', 'Kitchen & Dining', 'Bedding', 'Home Decor', 'Garden', 'Tools']
  },
  {
    id: 'books',
    name: 'Books & Media',
    description: 'Books, e-books, audiobooks, and educational materials',
    icon: '📚',
    productCount: 320,
    trending: false,
    subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children\'s Books', 'E-books', 'Audiobooks']
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    description: 'Fitness equipment, outdoor gear, and sports accessories',
    icon: '⚽',
    productCount: 95,
    trending: true,
    subcategories: ['Fitness', 'Outdoor Recreation', 'Team Sports', 'Water Sports', 'Winter Sports', 'Cycling']
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    description: 'Skincare, makeup, fragrances, and wellness products',
    icon: '💄',
    productCount: 140,
    trending: true,
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Personal Care', 'Wellness']
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Car accessories, parts, and automotive care products',
    icon: '🚗',
    productCount: 75,
    trending: false,
    subcategories: ['Car Accessories', 'Parts & Tools', 'Car Care', 'Electronics', 'Interior', 'Exterior']
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    description: 'Fun toys, board games, and educational playthings for all ages',
    icon: '🧸',
    productCount: 120,
    trending: true,
    subcategories: ['Educational Toys', 'Board Games', 'Action Figures', 'Dolls', 'Outdoor Toys', 'Video Games']
  },
];

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&auto=format&q=80',
    category: 'electronics',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Compatible with all devices.',
    rating: 4.5,
    inStock: true,
    currency: 'DZD',
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&auto=format&q=80',
    category: 'clothing',
    description: 'Comfortable, sustainable organic cotton t-shirt in various colors. Perfect for Algerian climate.',
    rating: 4.2,
    inStock: true,
    currency: 'DZD',
  },
  {
    id: '3',
    name: 'Smart Watch Series 9',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&h=500&fit=crop&auto=format&q=80',
    category: 'electronics',
    description: 'Advanced smartwatch with health monitoring, GPS, and water resistance. Arabic interface support.',
    rating: 4.8,
    inStock: true,
    currency: 'DZD',
  },
  {
    id: '4',
    name: 'Yoga Mat Premium',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1506629905427-0e4b80043e58?w=500&h=500&fit=crop&auto=format&q=80',
    category: 'sports',
    description: 'Non-slip, eco-friendly yoga mat with superior cushioning and durability. Ideal for home workouts.',
    rating: 4.6,
    inStock: true,
    currency: 'DZD',
  },
  {
    id: '5',
    name: 'Ceramic Coffee Mug Set',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&h=500&fit=crop&auto=format&q=80',
    category: 'home',
    description: 'Set of 4 handcrafted ceramic mugs perfect for Arabic coffee, mint tea, or atay.',
    rating: 4.3,
    inStock: true,
    currency: 'DZD',
  },
  {
    id: '6',
    name: 'Leather Crossbody Bag',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&auto=format&q=80',
    category: 'clothing',
    description: 'Genuine leather crossbody bag with adjustable strap and multiple compartments. Elegant design for everyday use.',
    rating: 4.7,
    inStock: true,
    currency: 'DZD',
  },
  {
    id: '7',
    name: 'LED Desk Lamp',
    price: 7000,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop&auto=format&q=80',
    category: 'home',
    description: 'Adjustable LED desk lamp with touch controls and USB charging port. Energy efficient for study and work.',
    rating: 4.4,
    inStock: true,
    currency: 'DZD',
  },
  {
    id: '8',
    name: 'Natural Face Moisturizer',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=500&h=500&fit=crop&auto=format&q=80',
    category: 'beauty',
    description: 'Organic face moisturizer with hyaluronic acid and vitamin C. Perfect for dry Algerian climate.',
    rating: 4.5,
    inStock: true,
    currency: 'DZD',
  },
];

export const featuredProducts = sampleProducts.slice(0, 4);
