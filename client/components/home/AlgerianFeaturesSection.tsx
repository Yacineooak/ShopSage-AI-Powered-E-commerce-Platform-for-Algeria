import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, Shield, MapPin, Phone, CheckCircle, ArrowRight } from 'lucide-react';
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
      description: 'Paiements sécurisés',
      descriptionAr: 'دفعات آمنة',
      descriptionFr: 'Paiements sécurisés',
    },
    {
      icon: Phone,
      name: 'Eddahabia',
      nameAr: 'الذهبية',
      nameFr: 'Eddahabia',
      description: 'Carte Algérie Poste',
      descriptionAr: 'بطاقة بريد الجزائر',
      descriptionFr: 'Carte Algérie Poste',
    },
    {
      icon: Truck,
      name: 'Flexy',
      nameAr: 'فليكسي',
      nameFr: 'Flexy',
      description: 'Transfert mobile',
      descriptionAr: 'تحويل عبر الهاتف',
      descriptionFr: 'Transfert mobile',
    },
    {
      icon: MapPin,
      name: 'À la livraison',
      nameAr: 'عند التسليم',
      nameFr: 'À la livraison',
      description: 'Payez à réception',
      descriptionAr: 'ادفع عند الاستلام',
      descriptionFr: 'Payez à réception',
    },
  ];

  const features = [
    {
      title: 'Livraison nationale',
      titleAr: 'توصيل وطني',
      titleFr: 'Livraison nationale',
      description: '48 wilayas couvertes',
      descriptionAr: '48 ولاية مخدومة',
      descriptionFr: '48 wilayas couvertes',
      icon: Truck,
    },
    {
      title: 'Paiement sécurisé',
      titleAr: 'دفع آمن',
      titleFr: 'Paiement sécurisé',
      description: 'SSL & 2FA',
      descriptionAr: 'SSL ومصادقة ثنائية',
      descriptionFr: 'SSL & 2FA',
      icon: Shield,
    },
    {
      title: 'Support local',
      titleAr: 'دعم محلي',
      titleFr: 'Support local',
      description: '7j/7 en Algérie',
      descriptionAr: '7 أيام في الأسبوع',
      descriptionFr: '7j/7 en Algérie',
      icon: Phone,
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
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className={`py-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 via-white to-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-muted-foreground">
              {language === 'ar' ? 'مصمم للجزائر' : 
               language === 'fr' ? 'Conçu pour l\'Algérie' : 
               'Made for Algeria'}
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'ar' ? (
              <>تسوق محلي، <span className="text-primary">جودة عالمية</span></>
            ) : language === 'fr' ? (
              <>Shopping local, <span className="text-primary">qualité mondiale</span></>
            ) : (
              <>Local shopping, <span className="text-primary">global quality</span></>
            )}
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'طرق دفع محلية، توصيل لجميع الولايات، وأسعار بالدينار الجزائري'
              : language === 'fr'
              ? 'Moyens de paiement locaux, livraison dans toutes les wilayas, et prix en dinars algériens'
              : 'Local payment methods, delivery to all wilayas, and prices in Algerian dinars'
            }
          </motion.p>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20"
        >
          <motion.h3 variants={itemVariants} className="text-xl font-semibold text-center mb-8">
            {language === 'ar' ? 'طرق الدفع المتاحة' : 
             language === 'fr' ? 'Moyens de paiement acceptés' : 
             'Accepted payment methods'}
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-border/50 hover:border-border transition-colors duration-200">
                    <CardContent className="p-6 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                      <h4 className="font-medium text-sm mb-1">
                        {language === 'ar' ? method.nameAr : 
                         language === 'fr' ? method.nameFr : 
                         method.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
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

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'ar' ? feature.titleAr : 
                     language === 'fr' ? feature.titleFr : 
                     feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === 'ar' ? feature.descriptionAr : 
                     language === 'fr' ? feature.descriptionFr : 
                     feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
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
            <Card className="max-w-lg mx-auto border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {language === 'ar' ? 'عرض خاص' : 
                     language === 'fr' ? 'Offre spéciale' : 
                     'Special offer'}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'ar' ? 'شحن مجاني' : 
                   language === 'fr' ? 'Livraison gratuite' : 
                   'Free shipping'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === 'ar' ? 'للطلبات أكثر من' : 
                   language === 'fr' ? 'Pour les commandes de plus de' : 
                   'For orders above'} {formatCurrency(5000, 'DZD')}
                </p>
                <Button asChild className="group">
                  <Link to="/products">
                    {language === 'ar' ? 'تسوق الآن' : 
                     language === 'fr' ? 'Commencer mes achats' : 
                     'Start shopping'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
