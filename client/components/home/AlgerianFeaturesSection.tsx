import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, Shield, Globe, MapPin, Phone, Banknote, Clock } from 'lucide-react';
import { useAuthStore } from '../../lib/stores/auth-store';
import { useTranslation, Language, formatCurrency } from '../../lib/i18n';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

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
      description: 'Secure payments with CIB bank cards',
      descriptionAr: 'دفعات آمنة ببطاقات بنك CIB',
      descriptionFr: 'Paiements sécurisés avec les cartes CIB',
      color: 'bg-blue-500',
    },
    {
      icon: Banknote,
      name: 'Eddahabia',
      nameAr: 'الذهبية',
      nameFr: 'Eddahabia',
      description: 'Algeria Post electronic payment card',
      descriptionAr: 'بطاقة الدفع الإلكترونية لبريد الجزائر',
      descriptionFr: 'Carte de paiement électronique d\'Algérie Poste',
      color: 'bg-green-500',
    },
    {
      icon: Phone,
      name: 'Flexy',
      nameAr: 'فليكسي',
      nameFr: 'Flexy',
      description: 'Mobile money transfer service',
      descriptionAr: 'خدمة تحويل الأموال عبر الهاتف المحمول',
      descriptionFr: 'Service de transfert d\'argent mobile',
      color: 'bg-orange-500',
    },
    {
      icon: Truck,
      name: 'Cash on Delivery',
      nameAr: 'الدفع عند التسليم',
      nameFr: 'Paiement à la livraison',
      description: 'Pay when you receive your order',
      descriptionAr: 'ادفع عند استلام طلبك',
      descriptionFr: 'Payez à la réception de votre commande',
      color: 'bg-purple-500',
    },
  ];

  const shippingOptions = [
    {
      icon: Truck,
      name: 'Yalidina Delivery',
      nameAr: 'توصيل ياليدينا',
      nameFr: 'Livraison Yalidina',
      coverage: '48 Wilayas',
      coverageAr: '48 ولاية',
      coverageFr: '48 Wilayas',
      time: '2-4 days',
      timeAr: '2-4 أيام',
      timeFr: '2-4 jours',
    },
    {
      icon: MapPin,
      name: 'Aramex Express',
      nameAr: 'أراميكس السريع',
      nameFr: 'Aramex Express',
      coverage: 'Major cities',
      coverageAr: 'المدن الكبرى',
      coverageFr: 'Grandes villes',
      time: '1-3 days',
      timeAr: '1-3 أيام',
      timeFr: '1-3 jours',
    },
    {
      icon: Clock,
      name: 'Express Delivery',
      nameAr: 'التوصيل السريع',
      nameFr: 'Livraison Express',
      coverage: 'Algiers, Oran, Constantine',
      coverageAr: 'الجزائر، وهران، قسنطينة',
      coverageFr: 'Alger, Oran, Constantine',
      time: 'Same day',
      timeAr: 'نفس اليوم',
      timeFr: 'Même jour',
    },
  ];

  const securityFeatures = [
    {
      icon: Shield,
      title: 'SSL Encryption',
      titleAr: 'تشفير SSL',
      titleFr: 'Cryptage SSL',
      description: '256-bit security for all transactions',
      descriptionAr: 'أمان 256-bit لجميع المعاملات',
      descriptionFr: 'Sécurité 256-bit pour toutes les transactions',
    },
    {
      icon: Phone,
      title: 'SMS Verification',
      titleAr: 'التحقق بالرسائل النصية',
      titleFr: 'Vérification SMS',
      description: 'Two-factor authentication via SMS',
      descriptionAr: 'المصادقة الثنائية عبر الرسائل النصية',
      descriptionFr: 'Authentification à deux facteurs par SMS',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      titleAr: 'مدفوعات آمنة',
      titleFr: 'Paiements Sécurisés',
      description: 'PCI DSS compliant payment processing',
      descriptionAr: 'معالجة الدفع متوافقة مع PCI DSS',
      descriptionFr: 'Traitement des paiements conforme PCI DSS',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className={`py-16 bg-gradient-to-br from-purple-50 to-blue-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🇩🇿</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {language === 'ar' ? 'مصمم خصيصاً للجزائر' : 
               language === 'fr' ? 'Conçu pour l\'Algérie' : 
               'Made for Algeria'}
            </h2>
          </motion.div>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'تسوق بثقة مع طرق الدفع المحلية، التوصيل لجميع الولايات، والأسعار بالدينار الجزائري'
              : language === 'fr'
              ? 'Achetez en confiance avec les moyens de paiement locaux, la livraison dans toutes les wilayas, et les prix en dinars algériens'
              : 'Shop with confidence using local payment methods, delivery to all wilayas, and prices in Algerian Dinars'
            }
          </motion.p>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-bold text-center mb-8">
            {language === 'ar' ? 'طرق الدفع المحلية' : 
             language === 'fr' ? 'Moyens de Paiement Locaux' : 
             'Local Payment Methods'}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`${method.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        {language === 'ar' ? method.nameAr : 
                         language === 'fr' ? method.nameFr : 
                         method.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? method.descriptionAr : 
                         language === 'fr' ? method.descriptionFr : 
                         method.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Shipping Options */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-bold text-center mb-8">
            {language === 'ar' ? 'خيارات التوصيل' : 
             language === 'fr' ? 'Options de Livraison' : 
             'Delivery Options'}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-purple-600" />
                        </div>
                        <h4 className="font-semibold">
                          {language === 'ar' ? option.nameAr : 
                           language === 'fr' ? option.nameFr : 
                           option.name}
                        </h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            {language === 'ar' ? 'التغطية:' : 
                             language === 'fr' ? 'Couverture:' : 
                             'Coverage:'}
                          </span>
                          <Badge variant="secondary">
                            {language === 'ar' ? option.coverageAr : 
                             language === 'fr' ? option.coverageFr : 
                             option.coverage}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            {language === 'ar' ? 'المدة:' : 
                             language === 'fr' ? 'Délai:' : 
                             'Time:'}
                          </span>
                          <Badge variant="outline">
                            {language === 'ar' ? option.timeAr : 
                             language === 'fr' ? option.timeFr : 
                             option.time}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-bold text-center mb-8">
            {language === 'ar' ? 'الأمان والحماية' : 
             language === 'fr' ? 'Sécurité et Protection' : 
             'Security & Protection'}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        {language === 'ar' ? feature.titleAr : 
                         language === 'fr' ? feature.titleFr : 
                         feature.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {language === 'ar' ? feature.descriptionAr : 
                         language === 'fr' ? feature.descriptionFr : 
                         feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Price Display */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {formatCurrency(5000, 'DZD')}
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'ar' ? 'شحن مجاني للطلبات أكثر من' : 
               language === 'fr' ? 'Livraison gratuite pour les commandes de plus de' : 
               'Free shipping for orders above'}
            </p>
            <Badge className="bg-green-100 text-green-800">
              {language === 'ar' ? 'عرض محدود' : 
               language === 'fr' ? 'Offre limitée' : 
               'Limited offer'}
            </Badge>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
