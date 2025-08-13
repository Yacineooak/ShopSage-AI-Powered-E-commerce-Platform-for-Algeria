import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, MapPin, Truck, Shield, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../lib/stores/cart-store';
import { useAuthStore } from '../lib/stores/auth-store';
import { usePaymentStore, PaymentMethod, paymentMethodInfo } from '../lib/stores/payment-store';
import { useShippingStore, ShippingMethod } from '../lib/stores/shipping-store';
import { useTranslation, formatCurrency, Language } from '../lib/i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Checkbox } from '../components/ui/checkbox';

// Algerian wilayas
const ALGERIAN_WILAYAS = {
  '01': 'Adrar', '02': 'Chlef', '03': 'Laghouat', '04': 'Oum El Bouaghi', '05': 'Batna',
  '06': 'Béjaïa', '07': 'Biskra', '08': 'Béchar', '09': 'Blida', '10': 'Bouira',
  '11': 'Tamanrasset', '12': 'Tébessa', '13': 'Tlemcen', '14': 'Tiaret', '15': 'Tizi Ouzou',
  '16': 'Algiers', '17': 'Djelfa', '18': 'Jijel', '19': 'Sétif', '20': 'Saïda',
  '21': 'Skikda', '22': 'Sidi Bel Abbès', '23': 'Annaba', '24': 'Guelma', '25': 'Constantine',
  '26': 'Médéa', '27': 'Mostaganem', '28': 'M\'Sila', '29': 'Mascara', '30': 'Ouargla',
  '31': 'Oran', '32': 'El Bayadh', '33': 'Illizi', '34': 'Bordj Bou Arréridj', '35': 'Boumerdès',
  '36': 'El Tarf', '37': 'Tindouf', '38': 'Tissemsilt', '39': 'El Oued', '40': 'Khenchela',
  '41': 'Souk Ahras', '42': 'Tipaza', '43': 'Mila', '44': 'Aïn Defla', '45': 'Naâma',
  '46': 'Aïn Témouchent', '47': 'Ghardaïa', '48': 'Relizane'
};

interface CheckoutForm {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Address
  streetAddress: string;
  apartment: string;
  wilaya: string;
  commune: string;
  postalCode: string;
  landmark: string;
  
  // Payment
  paymentMethod: PaymentMethod | '';
  
  // Card details (for card payments)
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardHolderName: string;
  
  // Bank transfer details
  rib: string;
  bankName: string;
  
  // Mobile money (Flexy)
  mobileNumber: string;
  
  // Agreements
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

const initialForm: CheckoutForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  streetAddress: '',
  apartment: '',
  wilaya: '',
  commune: '',
  postalCode: '',
  landmark: '',
  paymentMethod: '',
  cardNumber: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
  cardHolderName: '',
  rib: '',
  bankName: '',
  mobileNumber: '',
  agreeToTerms: false,
  subscribeNewsletter: false,
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { processPayment, validatePaymentMethod } = usePaymentStore();
  const { getShippingRates, selectShippingMethod, selectedShippingMethod } = useShippingStore();
  
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null);
  
  const language: Language = user?.preferences.language || 'fr';
  const t = useTranslation(language);
  const isRTL = language === 'ar';
  
  const subtotal = getTotalPrice();
  const shippingCost = selectedShipping ? getShippingRates(form.wilaya || '16')[0]?.price || 0 : 0;
  const tax = subtotal * 0.19; // 19% TVA in Algeria
  const total = subtotal + shippingCost + tax;
  
  // Initialize form with user data
  useEffect(() => {
    if (user?.profile) {
      setForm(prev => ({
        ...prev,
        firstName: user.name.split(' ')[0] || '',
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email,
        phone: user.profile.phone || '',
        streetAddress: user.profile.address?.street || '',
        wilaya: user.profile.address?.wilaya || '',
        commune: user.profile.address?.commune || '',
        postalCode: user.profile.address?.zipCode || '',
      }));
    }
  }, [user]);
  
  // Validation functions
  const validateAlgerianPhone = (phone: string): boolean => {
    // Algerian phone numbers: +213 followed by 9 digits
    const phoneRegex = /^(\+213|0)(5|6|7)[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };
  
  const validateAlgerianRIB = (rib: string): boolean => {
    // Algerian RIB: 20 digits
    const ribRegex = /^[0-9]{20}$/;
    return ribRegex.test(rib.replace(/\s/g, ''));
  };
  
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<CheckoutForm> = {};
    
    if (step === 1) {
      // Personal Info
      if (!form.firstName.trim()) newErrors.firstName = t.common.required;
      if (!form.lastName.trim()) newErrors.lastName = t.common.required;
      if (!form.email.trim()) newErrors.email = t.common.required;
      if (!form.phone.trim()) newErrors.phone = t.common.required;
      else if (!validateAlgerianPhone(form.phone)) newErrors.phone = 'Invalid phone number format';
    }
    
    if (step === 2) {
      // Address
      if (!form.streetAddress.trim()) newErrors.streetAddress = t.common.required;
      if (!form.wilaya) newErrors.wilaya = t.common.required;
      if (!form.commune.trim()) newErrors.commune = t.common.required;
      if (!form.postalCode.trim()) newErrors.postalCode = t.common.required;
    }
    
    if (step === 3) {
      // Payment
      if (!form.paymentMethod) newErrors.paymentMethod = t.common.required;
      
      if (form.paymentMethod === 'cib' || form.paymentMethod === 'eddahabia' || form.paymentMethod === 'goldcard') {
        if (!form.cardNumber.trim()) newErrors.cardNumber = t.common.required;
        if (!form.expiryMonth) newErrors.expiryMonth = t.common.required;
        if (!form.expiryYear) newErrors.expiryYear = t.common.required;
        if (!form.cvv.trim()) newErrors.cvv = t.common.required;
        if (!form.cardHolderName.trim()) newErrors.cardHolderName = t.common.required;
      }
      
      if (form.paymentMethod === 'bankTransfer') {
        if (!form.rib.trim()) newErrors.rib = t.common.required;
        else if (!validateAlgerianRIB(form.rib)) newErrors.rib = 'Invalid RIB format';
        if (!form.bankName) newErrors.bankName = t.common.required;
      }
      
      if (form.paymentMethod === 'flexy') {
        if (!form.mobileNumber.trim()) newErrors.mobileNumber = t.common.required;
        else if (!validateAlgerianPhone(form.mobileNumber)) newErrors.mobileNumber = 'Invalid mobile number';
      }
    }
    
    if (step === 4) {
      // Final validation
      if (!form.agreeToTerms) newErrors.agreeToTerms = t.common.required;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };
  
  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsProcessing(true);
    setPaymentError('');
    
    try {
      // Process payment
      const paymentResult = await processPayment(
        `ORDER_${Date.now()}`,
        total,
        form.paymentMethod as PaymentMethod
      );
      
      if (paymentResult.success) {
        clearCart();
        setOrderSuccess(true);
      } else {
        setPaymentError(paymentResult.error || 'Payment failed');
      }
    } catch (error) {
      setPaymentError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <h2 className="text-2xl font-bold mb-4">{t.cart.empty}</h2>
            <p className="text-gray-600 mb-6">{t.cart.emptyMessage}</p>
            <Button onClick={() => navigate('/')} className="w-full">
              {t.cart.continueShopping}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">{t.messages.orderPlaced}</h2>
            <p className="text-gray-600 mb-6">
              {language === 'ar' ? 'شكراً لك! سيتم الاتصال بك قريباً لتأكيد الطلب.' :
               language === 'fr' ? 'Merci ! Nous vous contacterons bientôt pour confirmer votre commande.' :
               'Thank you! We will contact you soon to confirm your order.'}
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              {t.nav.home}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.common.back}
          </Button>
          <h1 className="text-3xl font-bold">{t.checkout.title}</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      step < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {currentStep === 1 && (language === 'ar' ? 'المعلومات الشخصية' : language === 'fr' ? 'Informations Personnelles' : 'Personal Information')}
                  {currentStep === 2 && (language === 'ar' ? 'عنوان التسليم' : language === 'fr' ? 'Adresse de Livraison' : 'Delivery Address')}
                  {currentStep === 3 && (language === 'ar' ? 'طريقة الدفع' : language === 'fr' ? 'Mode de Paiement' : 'Payment Method')}
                  {currentStep === 4 && (language === 'ar' ? 'مراجعة الطلب' : language === 'fr' ? 'Révision de Commande' : 'Order Review')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t.auth.firstName} *
                          </label>
                          <Input
                            value={form.firstName}
                            onChange={(e) => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                            className={errors.firstName ? 'border-red-500' : ''}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t.auth.lastName} *
                          </label>
                          <Input
                            value={form.lastName}
                            onChange={(e) => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                            className={errors.lastName ? 'border-red-500' : ''}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {t.common.email} *
                        </label>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {t.common.phone} *
                        </label>
                        <Input
                          placeholder="+213 5XX XXX XXX"
                          value={form.phone}
                          onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                  
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {language === 'ar' ? 'عنوان الشارع' : language === 'fr' ? 'Adresse' : 'Street Address'} *
                        </label>
                        <Input
                          value={form.streetAddress}
                          onChange={(e) => setForm(prev => ({ ...prev, streetAddress: e.target.value }))}
                          className={errors.streetAddress ? 'border-red-500' : ''}
                        />
                        {errors.streetAddress && (
                          <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {language === 'ar' ? 'الشقة/المكتب' : language === 'fr' ? 'Appartement/Bureau' : 'Apartment/Office'}
                        </label>
                        <Input
                          value={form.apartment}
                          onChange={(e) => setForm(prev => ({ ...prev, apartment: e.target.value }))}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t.common.wilaya} *
                          </label>
                          <Select
                            value={form.wilaya}
                            onValueChange={(value) => setForm(prev => ({ ...prev, wilaya: value }))}
                          >
                            <SelectTrigger className={errors.wilaya ? 'border-red-500' : ''}>
                              <SelectValue placeholder={t.common.select} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(ALGERIAN_WILAYAS).map(([code, name]) => (
                                <SelectItem key={code} value={code}>
                                  {code} - {name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.wilaya && (
                            <p className="text-red-500 text-xs mt-1">{errors.wilaya}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            {t.common.commune} *
                          </label>
                          <Input
                            value={form.commune}
                            onChange={(e) => setForm(prev => ({ ...prev, commune: e.target.value }))}
                            className={errors.commune ? 'border-red-500' : ''}
                          />
                          {errors.commune && (
                            <p className="text-red-500 text-xs mt-1">{errors.commune}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {language === 'ar' ? 'نقطة مرجعية' : language === 'fr' ? 'Point de Repère' : 'Landmark'}
                        </label>
                        <Input
                          placeholder={language === 'ar' ? 'مثال: بالقرب من المسجد' : language === 'fr' ? 'Ex: Près de la mosquée' : 'Ex: Near the mosque'}
                          value={form.landmark}
                          onChange={(e) => setForm(prev => ({ ...prev, landmark: e.target.value }))}
                        />
                      </div>
                    </motion.div>
                  )}
                  
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(paymentMethodInfo).map(([method, info]) => (
                          <Card
                            key={method}
                            className={`cursor-pointer transition-all ${
                              form.paymentMethod === method
                                ? 'ring-2 ring-purple-600 bg-purple-50'
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setForm(prev => ({ ...prev, paymentMethod: method as PaymentMethod }))}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{info.icon}</span>
                                <div>
                                  <h3 className="font-medium">{info.name}</h3>
                                  <p className="text-sm text-gray-600">{info.description}</p>
                                  <Badge variant="secondary" className="mt-1">
                                    {language === 'ar' ? 'رسوم:' : language === 'fr' ? 'Frais:' : 'Fees:'} {info.fees}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {/* Payment method specific fields */}
                      {(form.paymentMethod === 'cib' || form.paymentMethod === 'eddahabia' || form.paymentMethod === 'goldcard') && (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            {language === 'ar' ? 'تفاصيل البطاقة' : language === 'fr' ? 'Détails de la Carte' : 'Card Details'}
                          </h4>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              {language === 'ar' ? 'رقم البطاقة' : language === 'fr' ? 'Numéro de Carte' : 'Card Number'} *
                            </label>
                            <Input
                              placeholder="1234 5678 9012 3456"
                              value={form.cardNumber}
                              onChange={(e) => setForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                              className={errors.cardNumber ? 'border-red-500' : ''}
                            />
                            {errors.cardNumber && (
                              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                {language === 'ar' ? 'الشهر' : language === 'fr' ? 'Mois' : 'Month'} *
                              </label>
                              <Select
                                value={form.expiryMonth}
                                onValueChange={(value) => setForm(prev => ({ ...prev, expiryMonth: value }))}
                              >
                                <SelectTrigger className={errors.expiryMonth ? 'border-red-500' : ''}>
                                  <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 12 }, (_, i) => (
                                    <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                      {String(i + 1).padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                {language === 'ar' ? 'السنة' : language === 'fr' ? 'Année' : 'Year'} *
                              </label>
                              <Select
                                value={form.expiryYear}
                                onValueChange={(value) => setForm(prev => ({ ...prev, expiryYear: value }))}
                              >
                                <SelectTrigger className={errors.expiryYear ? 'border-red-500' : ''}>
                                  <SelectValue placeholder="YY" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({ length: 10 }, (_, i) => {
                                    const year = new Date().getFullYear() + i;
                                    return (
                                      <SelectItem key={year} value={String(year).slice(-2)}>
                                        {year}
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">CVV *</label>
                              <Input
                                placeholder="123"
                                maxLength={4}
                                value={form.cvv}
                                onChange={(e) => setForm(prev => ({ ...prev, cvv: e.target.value }))}
                                className={errors.cvv ? 'border-red-500' : ''}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              {language === 'ar' ? 'اسم حامل البطاقة' : language === 'fr' ? 'Nom du Porteur' : 'Card Holder Name'} *
                            </label>
                            <Input
                              value={form.cardHolderName}
                              onChange={(e) => setForm(prev => ({ ...prev, cardHolderName: e.target.value }))}
                              className={errors.cardHolderName ? 'border-red-500' : ''}
                            />
                          </div>
                        </div>
                      )}
                      
                      {form.paymentMethod === 'flexy' && (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {language === 'ar' ? 'تفاصيل فليكسي' : language === 'fr' ? 'Détails Flexy' : 'Flexy Details'}
                          </h4>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              {language === 'ar' ? 'رقم الهاتف' : language === 'fr' ? 'Numéro de Mobile' : 'Mobile Number'} *
                            </label>
                            <Input
                              placeholder="+213 5XX XXX XXX"
                              value={form.mobileNumber}
                              onChange={(e) => setForm(prev => ({ ...prev, mobileNumber: e.target.value }))}
                              className={errors.mobileNumber ? 'border-red-500' : ''}
                            />
                            {errors.mobileNumber && (
                              <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {form.paymentMethod === 'cod' && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {language === 'ar' 
                              ? 'سيتم إضافة رسوم إضافية قدرها 50 دج للدفع عند التسليم'
                              : language === 'fr'
                              ? 'Des frais supplémentaires de 50 DA s\'appliquent pour le paiement à la livraison'
                              : 'An additional fee of 50 DA applies for cash on delivery'
                            }
                          </AlertDescription>
                        </Alert>
                      )}
                    </motion.div>
                  )}
                  
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={form.agreeToTerms}
                            onCheckedChange={(checked) => setForm(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                          />
                          <label htmlFor="terms" className="text-sm">
                            {language === 'ar' 
                              ? 'أوافق على الشروط والأحكام وسياسة الخصوصية'
                              : language === 'fr'
                              ? 'J\'accepte les conditions générales et la politique de confidentialité'
                              : 'I agree to the terms and conditions and privacy policy'
                            } *
                          </label>
                        </div>
                        {errors.agreeToTerms && (
                          <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>
                        )}
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={form.subscribeNewsletter}
                            onCheckedChange={(checked) => setForm(prev => ({ ...prev, subscribeNewsletter: checked as boolean }))}
                          />
                          <label htmlFor="newsletter" className="text-sm">
                            {language === 'ar' 
                              ? 'أريد الاشتراك في النشرة الإخبارية للحصول على العروض الخاصة'
                              : language === 'fr'
                              ? 'Je souhaite m\'abonner à la newsletter pour recevoir les offres spéciales'
                              : 'Subscribe to newsletter for special offers'
                            }
                          </label>
                        </div>
                      </div>
                      
                      {paymentError && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{paymentError}</AlertDescription>
                        </Alert>
                      )}
                      
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          {language === 'ar' 
                            ? 'جميع المعاملات المالية محمية بتشفير SSL 256-bit'
                            : language === 'fr'
                            ? 'Toutes les transactions sont sécurisées par un cryptage SSL 256-bit'
                            : 'All transactions are secured with 256-bit SSL encryption'
                          }
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    {t.common.previous}
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button onClick={handleNext}>
                      {t.common.next}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={isProcessing}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {language === 'ar' ? 'جاري المعالجة...' : language === 'fr' ? 'Traitement...' : 'Processing...'}
                        </span>
                      ) : (
                        t.checkout.placeOrder
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>{t.checkout.orderSummary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">
                        {formatCurrency(item.price * item.quantity, 'DZD')}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t.common.subtotal}</span>
                    <span>{formatCurrency(subtotal, 'DZD')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{t.common.shipping}</span>
                    <span>{formatCurrency(shippingCost, 'DZD')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>TVA (19%)</span>
                    <span>{formatCurrency(tax, 'DZD')}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t.common.total}</span>
                    <span>{formatCurrency(total, 'DZD')}</span>
                  </div>
                </div>
                
                {/* Security Badge */}
                <div className="flex items-center gap-2 text-xs text-gray-600 pt-4">
                  <Shield className="h-4 w-4" />
                  <span>
                    {language === 'ar' ? 'دفع آمن' : language === 'fr' ? 'Paiement sécurisé' : 'Secure payment'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
