import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Sun, Moon, Globe, Heart, RotateCcw, LogOut, Settings, Shield } from 'lucide-react';
import { useCartStore } from '../../lib/stores/cart-store';
import { useWishlistStore } from '../../lib/stores/wishlist-store';
import { useComparisonStore } from '../../lib/stores/comparison-store';
import { useAuthStore } from '../../lib/stores/auth-store';
import { useAppStore } from '../../lib/stores/app-store';
import { useTranslation, Language, formatCurrency } from '../../lib/i18n';
import { SmartSearch } from '../search/SmartSearch';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getTotalItems, setIsOpen } = useCartStore();
  const { getTotalItems: getWishlistItems } = useWishlistStore();
  const { getTotalItems: getComparisonItems } = useComparisonStore();
  const { user, isAuthenticated, logout, updatePreferences } = useAuthStore();
  const { theme, setTheme, language, setLanguage, searchQuery, setSearchQuery } = useAppStore();

  const currentLanguage: Language = (user?.preferences.language || language || 'fr') as Language;
  const t = useTranslation(currentLanguage);
  const isRTL = currentLanguage === 'ar';

  const totalItems = getTotalItems();
  const wishlistItems = getWishlistItems();
  const comparisonItems = getComparisonItems();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleSearch = (query: string) => {
    navigate('/products');
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
  ];

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    if (user) {
      updatePreferences({ language: lang });
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-sage-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-sage-600 bg-clip-text text-transparent">
            ShopSage
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.home}
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.products}
          </Link>
          <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.categories}
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
            {t.nav.about}
          </Link>
        </nav>

        {/* Smart Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-sm mx-8">
          <SmartSearch
            className="w-full"
            placeholder={t.common.search}
            onSelectProduct={handleProductSelect}
            onSearch={handleSearch}
          />
        </div>

        {/* Right Side Actions */}
        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code as Language)}
                  className={currentLanguage === lang.code ? 'bg-accent' : ''}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

          {/* Comparison */}
          <Button variant="ghost" size="sm" className="relative" asChild>
            <Link to="/compare">
              <RotateCcw className="h-4 w-4" />
              {comparisonItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {comparisonItems}
                </span>
              )}
            </Link>
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" size="sm" className="relative" asChild>
            <Link to="/wishlist">
              <Heart className="h-4 w-4" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>
          </Button>

          {/* User Account */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                    {t.nav.profile}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">
                    <ShoppingCart className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                    {t.profile.orders}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                    {t.profile.preferences}
                  </Link>
                </DropdownMenuItem>
                {user?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <Shield className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      {t.nav.admin}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                  {t.nav.logout}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">
                <User className="h-4 w-4" />
              </Link>
            </Button>
          )}

          {/* Cart */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Smart Search */}
            <SmartSearch
              placeholder={t.common.search}
              onSelectProduct={handleProductSelect}
              onSearch={handleSearch}
            />

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.home}
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.products}
              </Link>
              <Link
                to="/categories"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.categories}
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.about}
              </Link>
            </nav>

            {/* Mobile Language Selector */}
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <Globe className="h-4 w-4 text-muted-foreground" />
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="bg-transparent text-sm border-none outline-none"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
