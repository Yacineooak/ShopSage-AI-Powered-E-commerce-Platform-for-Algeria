import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../lib/stores/cart-store';
import { useAuthStore } from '../../lib/stores/auth-store';
import { useTranslation, Language, formatCurrency } from '../../lib/i18n';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

export function CartSidebar() {
  const navigate = useNavigate();
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    currency,
  } = useCartStore();
  const { user } = useAuthStore();
  const language: Language = user?.preferences.language || 'fr';
  const t = useTranslation(language);
  const isRTL = language === 'ar';

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  const total = getTotalPrice();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className={`w-full sm:max-w-lg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <SheetHeader>
          <SheetTitle className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t.cart.title}
            {items.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                {language === 'ar' ? 'مسح الكل' : language === 'fr' ? 'Vider tout' : 'Clear All'}
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Trash2 className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{t.cart.empty}</h3>
                <p className="text-muted-foreground mb-4">
                  {t.cart.emptyMessage}
                </p>
                <Button onClick={() => setIsOpen(false)}>
                  {t.cart.continueShopping}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className={`flex items-start ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {formatCurrency(item.price, currency)}
                        </p>
                        
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        
                        <p className="text-sm font-medium">
                          {formatCurrency(item.price * item.quantity, currency)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className={`flex items-center justify-between text-lg font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{t.common.total}</span>
                  <span>{formatCurrency(total, currency)}</span>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg" onClick={handleCheckout}>
                    {t.checkout.title}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {t.cart.continueShopping}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
