# 🛍️ ShopSage - AI-Powered E-commerce Platform for Algeria

<div align="center">

![ShopSage Logo](https://via.placeholder.com/200x80/8B5CF6/FFFFFF?text=ShopSage)
<img width="1024" height="240" alt="ChatGPT Image 16 août 2025, 16_15_58" src="https://github.com/user-attachments/assets/3140c5e6-7c97-452c-8580-80c9fd892b0d" />


**A modern, multilingual e-commerce platform specifically designed for the Algerian market**

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-blue.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-yellow.svg)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-4.x-orange.svg)](https://zustand-demo.pmnd.rs/)

[Demo](https://shopsage-demo.vercel.app) • [Documentation](#documentation) • [Report Bug](https://github.com/username/shopsage/issues) • [Request Feature](https://github.com/username/shopsage/issues)

</div>

## 🌟 Features

### 🇩🇿 Algeria-Specific Features
- **🏛️ Local Payment Methods**: CIB Bank, Eddahabia, Flexy, Cash on Delivery
- **🚚 Algeria-Wide Delivery**: Yalidina, Aramex, and local courier services
- **💰 Algerian Dinar (DZD)**: Native currency support with proper formatting
- **🗺️ 48 Wilayas Coverage**: Complete address system with wilaya and commune support
- **🔒 Enhanced Security**: SMS verification, 2FA, and PCI DSS compliant payments

### 🌐 Multilingual Support
- **العربية (Arabic)**: Full RTL support with native Arabic interface
- **Français (French)**: Complete French localization
- **English**: International English support
- **Dynamic Language Switching**: Real-time language changes with user preferences

### 🛒 E-commerce Core
- **AI-Powered Recommendations**: Smart product suggestions
- **Advanced Search & Filters**: Category-based filtering with smart search
- **Product Comparison**: Side-by-side product comparison tool
- **Wishlist Management**: Save and organize favorite products
- **Shopping Cart**: Persistent cart with quantity management
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### 🎨 Modern UI/UX
- **Beautiful Animations**: Framer Motion powered smooth transitions
- **Dark/Light Mode**: System preference aware theme switching
- **Professional Design**: Modern gradient-based design system
- **Accessibility**: WCAG 2.1 compliant with screen reader support
- **Fast Performance**: Optimized bundle size and lazy loading

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **Zustand State Management**: Lightweight and efficient state management
- **Component Library**: Reusable UI components with Radix UI
- **Responsive Images**: Optimized image loading with fallbacks
- **SEO Optimized**: Meta tags and structured data
- **PWA Ready**: Service worker and offline capabilities

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/username/shopsage.git
   cd shopsage
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
shopsage/
├── client/                     # Frontend React application
│   ├── components/            # Reusable UI components
│   │   ├── home/             # Homepage specific components
│   │   ├── layout/           # Layout components (Header, Footer)
│   │   ├── products/         # Product-related components
│   │   ├── search/           # Search functionality
│   │   ├── security/         # Security verification components
│   │   └── ui/               # Base UI components
│   ├── lib/                  # Utilities and configurations
│   │   ├── data/            # Static data and product information
│   │   ├── i18n/            # Internationalization system
│   │   └── stores/          # Zustand state stores
│   ├── pages/               # Page components (routing)
│   └── global.css          # Global styles and Tailwind imports
├── server/                  # Backend API (optional)
├── public/                  # Static assets
└── docs/                    # Documentation files
```

## 🎯 Key Components

### State Management (Zustand Stores)

- **`cart-store.ts`**: Shopping cart functionality with persistence
- **`auth-store.ts`**: User authentication and profile management
- **`payment-store.ts`**: Payment methods and transaction handling
- **`shipping-store.ts`**: Delivery options and address management
- **`wishlist-store.ts`**: Product wishlist functionality
- **`comparison-store.ts`**: Product comparison features

### Payment Integration

```typescript
// Algerian payment methods
const paymentMethods = [
  'cib',           // CIB Bank cards
  'eddahabia',     // Algeria Post cards
  'flexy',         // Mobile money
  'goldcard',      // Premium bank cards
  'cod',           // Cash on delivery
  'bankTransfer'   // Direct bank transfer
];
```

### Internationalization

```typescript
// Multi-language support
const languages = {
  ar: 'العربية',    // Arabic (RTL)
  fr: 'Français',   // French
  en: 'English'     // English
};
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=ShopSage

# Payment Configuration
VITE_CIB_API_KEY=your_cib_api_key
VITE_EDDAHABIA_MERCHANT_ID=your_merchant_id

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA_TRACKING_ID
```

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- **Custom colors**: Purple-based primary palette
- **Algerian flag colors**: Green, white, red accents
- **RTL support**: Automatic RTL layout for Arabic
- **Custom animations**: Smooth transitions and micro-interactions

## 📱 Mobile Experience

ShopSage is fully responsive and optimized for mobile devices:

- **Touch-friendly interfaces**: Large touch targets and gesture support
- **Mobile-first design**: Optimized for smaller screens
- **Fast loading**: Optimized bundle size for mobile networks
- **Offline support**: PWA capabilities for offline browsing

## 🔒 Security Features

### Payment Security
- **SSL Encryption**: 256-bit SSL encryption for all transactions
- **PCI DSS Compliance**: Secure payment processing standards
- **2FA Authentication**: SMS and email verification
- **Transaction Monitoring**: Real-time fraud detection

### Data Protection
- **GDPR Compliant**: European data protection standards
- **Data Encryption**: Sensitive data encryption at rest
- **Secure Sessions**: JWT-based authentication
- **Privacy Controls**: User data management controls

## 🌍 Algerian Market Features

### Payment Methods
- **CIB Bank**: Secure bank card payments
- **Eddahabia**: Algeria Post electronic payments
- **Flexy**: Mobile money transfers
- **Cash on Delivery**: Pay when you receive your order

### Delivery Network
- **Yalidina**: National delivery service (48 wilayas)
- **Aramex**: Express delivery for major cities
- **Local Couriers**: Same-day delivery in Algiers, Oran, Constantine

### Address System
- **48 Wilayas**: Complete Algerian administrative divisions
- **Commune Support**: Local area specification
- **Landmarks**: Cultural landmark references for better delivery
- **Postal Codes**: Algerian postal code validation

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Quality

The project maintains high code quality through:
- **TypeScript**: Static type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Testing**: Unit and integration tests

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📊 Performance

ShopSage is optimized for performance:

- **Core Web Vitals**: Optimized LCP, FID, and CLS scores
- **Lighthouse Score**: 95+ performance score
- **Bundle Size**: Optimized JavaScript bundles
- **Image Optimization**: WebP format with fallbacks
- **Caching Strategy**: Efficient browser and CDN caching

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

### Community
- **GitHub Issues**: [Report bugs and request features](https://github.com/username/shopsage/issues)
- **Discussions**: [Join community discussions](https://github.com/username/shopsage/discussions)
- **Discord**: [Join our Discord server](https://discord.gg/shopsage)

### Professional Support
For enterprise support and custom development:
- **Email**: support@shopsage.com
- **Website**: [www.shopsage.com](https://www.shopsage.com)

## 📈 Roadmap

### Version 2.0 (Coming Soon)
- [ ] **AI Chatbot**: Customer support chatbot in Arabic and French
- [ ] **Vendor Portal**: Multi-vendor marketplace support
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **Advanced Analytics**: Sales and customer analytics dashboard
- [ ] **Social Commerce**: Social media integration and sharing

### Future Features
- [ ] **Cryptocurrency Payments**: Bitcoin and Ethereum support
- [ ] **AR Product Preview**: Augmented reality product visualization
- [ ] **Voice Search**: Voice-activated search in Arabic and French
- [ ] **Subscription Commerce**: Recurring product subscriptions

## 🏆 Acknowledgments

- **Design Inspiration**: Modern e-commerce platforms
- **Icons**: Lucide React icons
- **Images**: Unsplash for demo product images
- **Fonts**: Inter font family
- **Community**: Open source contributors

---

<div align="center">

**Built with ❤️ for the Algerian market**

[⭐ Star this repository](https://github.com/username/shopsage) if you found it helpful!

</div>
