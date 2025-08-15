import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, Shield, Globe, MapPin, Phone, Banknote, Clock, CheckCircle, Star, Award, Heart } from 'lucide-react';
import { useAuthStore } from '../../lib/stores/auth-store';
import { useTranslation, Language, formatCurrency } from '../../lib/i18n';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function AlgerianFeaturesSection() {
  const { user } = useAuthStore();
  const language: Language = user?.preferences.language || 'fr';
  const t = useTranslation(language);
  const isRTL = language === 'ar';

  const paymentMethods = [
    {
      icon: CreditCard,
      name: 'CIB Bank',
      nameAr: 'بنك CIB',
      nameFr: 'Banque CIB',
      description: 'Secure & instant payments',
      descriptionAr: 'دفعات آمنة وفورية',
      descriptionFr: 'Paiements sécurisés et instantanés',
      gradient: 'from-blue-500 to-blue-600',
      accent: 'bg-blue-50 border-blue-200',
    },
    {
      icon: Banknote,
      name: 'Eddahabia',
      nameAr: 'الذهبية',
      nameFr: 'Eddahabia',
      description: 'Algeria Post official card',
      descriptionAr: 'بطاقة بريد الجزائر الرسمية',
      descriptionFr: 'Carte officielle d\'Algérie Poste',
      gradient: 'from-green-500 to-emerald-600',
      accent: 'bg-green-50 border-green-200',
    },
    {
      icon: Phone,
      name: 'Flexy',
      nameAr: 'فليكسي',
      nameFr: 'Flexy',
      description: 'Mobile money transfer',
      descriptionAr: 'تحويل الأموال عبر الهاتف',
      descriptionFr: 'Transfert d\'argent mobile',
      gradient: 'from-orange-500 to-amber-600',
      accent: 'bg-orange-50 border-orange-200',
    },
    {
      icon: Truck,
      name: 'Cash on Delivery',
      nameAr: 'الدفع عند التسليم',
      nameFr: 'Paiement à la livraison',
      description: 'Pay when delivered',
      descriptionAr: 'ادفع عند الاستلام',
      descriptionFr: 'Payez à la réception',
      gradient: 'from-purple-500 to-violet-600',
      accent: 'bg-purple-50 border-purple-200',
    },
  ];

  const deliveryPartners = [
    {
      name: 'Yalidina',
      nameAr: 'ياليدينا',
      nameFr: 'Yalidina',
      coverage: '48 Wilayas',
      coverageAr: '48 ولاية',
      coverageFr: '48 Wilayas',
      logo: '🚚',
      rating: 4.8,
      deliveryTime: '2-4 days',
      deliveryTimeAr: '2-4 أيام',
      deliveryTimeFr: '2-4 jours',
    },
    {
      name: 'Aramex',
      nameAr: 'أراميكس',
      nameFr: 'Aramex',
      coverage: 'Express Service',
      coverageAr: 'خدمة سريعة',
      coverageFr: 'Service Express',
      logo: '📦',
      rating: 4.6,
      deliveryTime: '1-3 days',
      deliveryTimeAr: '1-3 أيام',
      deliveryTimeFr: '1-3 jours',
    },
    {
      name: 'Local Delivery',
      nameAr: 'التوصيل المحلي',
      nameFr: 'Livraison Locale',
      coverage: 'Same Day',
      coverageAr: 'نفس اليوم',
      coverageFr: 'Même Jour',
      logo: '⚡',
      rating: 4.9,
      deliveryTime: 'Same day',
      deliveryTimeAr: 'نفس اليوم',
      deliveryTimeFr: 'Même jour',
    },
  ];

  const stats = [
    {
      number: '50K+',
      label: language === 'ar' ? 'عميل راضٍ' : language === 'fr' ? 'Clients satisfaits' : 'Happy customers',
      icon: Heart,
    },
    {
      number: '48',
      label: language === 'ar' ? 'ولاية مخدومة' : language === 'fr' ? 'Wilayas desservies' : 'Wilayas served',
      icon: MapPin,
    },
    {
      number: '99%',
      label: language === 'ar' ? 'معدل التسليم' : language === 'fr' ? 'Taux de livraison' : 'Delivery rate',
      icon: CheckCircle,
    },
    {
      number: '4.8/5',
      label: language === 'ar' ? 'تقييم العملاء' : language === 'fr' ? 'Note client' : 'Customer rating',
      icon: Star,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardHoverVariants = {
    hover: { 
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section className={`relative py-20 overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background with modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50"></div>
      <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.03\"%3E%3Cpath d=\"m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 via-white to-red-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-sm">🇩🇿</span>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {language === 'ar' ? 'مصمم خصيصاً للجزائر' : 
               language === 'fr' ? 'Conçu spécialement pour l\'Algérie' : 
               'Made Specifically for Algeria'}
            </span>
            <Award className="w-5 h-5 text-amber-500" />
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {language === 'ar' ? (
              <>تسوق بثقة مع <br /><span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">الحلول المحلية</span></>
            ) : language === 'fr' ? (
              <>Achetez en confiance avec <br /><span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">les solutions locales</span></>
            ) : (
              <>Shop with Confidence using <br /><span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Local Solutions</span></>
            )}
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'اكتشف تجربة تسوق مصممة خصيصاً للسوق الجزائري مع طرق دفع محلية، توصيل لجميع الولايات، وأمان عالي المستوى'
              : language === 'fr'
              ? 'Découvrez une expérience d\'achat conçue spécialement pour le marché algérien avec des moyens de paiement locaux, livraison dans toutes les wilayas, et sécurité de haut niveau'
              : 'Discover a shopping experience designed specifically for the Algerian market with local payment methods, delivery to all wilayas, and high-level security'
            }
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants} whileHover={cardHoverVariants.hover}>
                <Card className="text-center p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Payment Methods Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'طرق الدفع المتاحة' : 
               language === 'fr' ? 'Moyens de Paiement Disponibles' : 
               'Available Payment Methods'}
            </h3>
            <p className="text-lg text-gray-600">
              {language === 'ar' ? 'ادفع بالطريقة التي تناسبك' : 
               language === 'fr' ? 'Payez comme vous le souhaitez' : 
               'Pay the way that suits you'}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div key={index} variants={itemVariants} whileHover={cardHoverVariants.hover}>
                  <Card className={`relative overflow-hidden border-2 ${method.accent} hover:shadow-xl transition-all duration-300 group`}>
                    <CardContent className="p-6">
                      <div className={`bg-gradient-to-r ${method.gradient} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">
                        {language === 'ar' ? method.nameAr : 
                         language === 'fr' ? method.nameFr : 
                         method.name}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {language === 'ar' ? method.descriptionAr : 
                         language === 'fr' ? method.descriptionFr : 
                         method.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">
                          {language === 'ar' ? 'متاح' : language === 'fr' ? 'Disponible' : 'Available'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Delivery Partners Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'ar' ? 'شركاء التوصيل الموثوقون' : 
               language === 'fr' ? 'Partenaires de Livraison Fiables' : 
               'Trusted Delivery Partners'}
            </h3>
            <p className="text-lg text-gray-600">
              {language === 'ar' ? 'توصيل سريع وآمن لجميع أنحاء الجزائر' : 
               language === 'fr' ? 'Livraison rapide et sécurisée dans toute l\'Algérie' : 
               'Fast and secure delivery across Algeria'}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryPartners.map((partner, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={cardHoverVariants.hover}>
                <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4">{partner.logo}</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {language === 'ar' ? partner.nameAr : 
                         language === 'fr' ? partner.nameFr : 
                         partner.name}
                      </h4>
                      <div className="flex items-center justify-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(partner.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-1 text-sm font-medium text-gray-600">{partner.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          {language === 'ar' ? 'التغطية:' : language === 'fr' ? 'Couverture:' : 'Coverage:'}
                        </span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {language === 'ar' ? partner.coverageAr : 
                           language === 'fr' ? partner.coverageFr : 
                           partner.coverage}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">
                          {language === 'ar' ? 'المدة:' : language === 'fr' ? 'Délai:' : 'Time:'}
                        </span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {language === 'ar' ? partner.deliveryTimeAr : 
                           language === 'fr' ? partner.deliveryTimeFr : 
                           partner.deliveryTime}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Free Shipping CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-8 text-white">
                <div className="text-5xl mb-4">🚚</div>
                <h3 className="text-2xl font-bold mb-4">
                  {language === 'ar' ? 'شحن مجاني!' : 
                   language === 'fr' ? 'Livraison Gratuite!' : 
                   'Free Shipping!'}
                </h3>
                <p className="text-lg mb-6 text-purple-100">
                  {language === 'ar' ? 'للطلبات أكثر من' : 
                   language === 'fr' ? 'Pour les commandes de plus de' : 
                   'For orders above'} {formatCurrency(5000, 'DZD')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-full shadow-lg"
                  >
                    <Link to="/products">
                      {language === 'ar' ? 'ابدأ التسوق الآن' :
                       language === 'fr' ? 'Commencer mes achats' :
                       'Start Shopping Now'}
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 text-purple-100 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>
                      {language === 'ar' ? 'دفع آمن 100%' : 
                       language === 'fr' ? 'Paiement 100% sécurisé' : 
                       '100% secure payment'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
