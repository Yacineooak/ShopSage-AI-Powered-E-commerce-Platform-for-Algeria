export type Language = 'ar' | 'fr' | 'en';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    categories: string;
    products: string;
    about: string;
    contact: string;
    admin: string;
    help: string;
    login: string;
    logout: string;
    profile: string;
    cart: string;
    wishlist: string;
    compare: string;
  };
  
  // Common
  common: {
    search: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    add: string;
    remove: string;
    update: string;
    submit: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    select: string;
    required: string;
    optional: string;
    currency: string;
    language: string;
    theme: string;
    notifications: string;
    all: string;
    none: string;
    total: string;
    subtotal: string;
    tax: string;
    shipping: string;
    discount: string;
    quantity: string;
    price: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    wilaya: string;
    commune: string;
  };
  
  // Product
  product: {
    addToCart: string;
    addToWishlist: string;
    addToCompare: string;
    removeFromWishlist: string;
    removeFromCompare: string;
    inStock: string;
    outOfStock: string;
    rating: string;
    reviews: string;
    description: string;
    specifications: string;
    features: string;
    relatedProducts: string;
    similarProducts: string;
    viewDetails: string;
    selectOptions: string;
    size: string;
    color: string;
    brand: string;
    category: string;
    tags: string;
    sku: string;
    availability: string;
    condition: string;
    warranty: string;
    returnPolicy: string;
  };
  
  // Cart & Checkout
  cart: {
    title: string;
    empty: string;
    emptyMessage: string;
    continueShopping: string;
    checkout: string;
    removeItem: string;
    updateQuantity: string;
    totalItems: string;
    shippingCalculated: string;
    proceedToCheckout: string;
    applyCoupon: string;
    couponCode: string;
  };
  
  checkout: {
    title: string;
    billingAddress: string;
    shippingAddress: string;
    sameAsBilling: string;
    paymentMethod: string;
    orderSummary: string;
    placeOrder: string;
    orderTotal: string;
    estimatedDelivery: string;
    paymentMethods: {
      cib: string;
      eddahabia: string;
      flexy: string;
      goldCard: string;
      cashOnDelivery: string;
      bankTransfer: string;
    };
    shippingMethods: {
      standard: string;
      express: string;
      pickup: string;
      yalidinaHome: string;
      yalidinaPickup: string;
      aramexHome: string;
      aramexPickup: string;
    };
  };
  
  // Authentication
  auth: {
    login: string;
    register: string;
    loginTitle: string;
    registerTitle: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    forgotPassword: string;
    resetPassword: string;
    rememberMe: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    createAccount: string;
    signInWith: string;
    termsAndConditions: string;
    privacyPolicy: string;
    agreeToTerms: string;
    invalidCredentials: string;
    passwordTooShort: string;
    emailInvalid: string;
    accountCreated: string;
    welcomeBack: string;
    loggedOut: string;
  };
  
  // Profile
  profile: {
    title: string;
    personalInfo: string;
    addresses: string;
    orders: string;
    preferences: string;
    security: string;
    notifications: string;
    paymentMethods: string;
    orderHistory: string;
    wishlist: string;
    reviews: string;
    rewards: string;
    referrals: string;
    support: string;
  };
  
  // Categories (Algerian specific)
  categories: {
    electronics: string;
    clothing: string;
    home: string;
    books: string;
    sports: string;
    beauty: string;
    automotive: string;
    toys: string;
    groceries: string;
    pharmacy: string;
    jewelry: string;
    appliances: string;
    furniture: string;
    tools: string;
    baby: string;
    pets: string;
  };
  
  // Algerian specific
  algeria: {
    wilayas: {
      [key: string]: string;
    };
    paymentInfo: {
      cibInfo: string;
      eddahabiaInfo: string;
      flexyInfo: string;
      codInfo: string;
    };
    shipping: {
      homeDelivery: string;
      pickupPoint: string;
      freeShippingThreshold: string;
      estimatedDays: string;
    };
    support: {
      customerService: string;
      technicalSupport: string;
      orderTracking: string;
      returns: string;
    };
  };
  
  // Messages & Notifications
  messages: {
    itemAdded: string;
    itemRemoved: string;
    cartUpdated: string;
    orderPlaced: string;
    paymentSuccess: string;
    paymentFailed: string;
    shippingUpdated: string;
    deliveryConfirmed: string;
    returnsRequested: string;
    reviewSubmitted: string;
    profileUpdated: string;
    passwordChanged: string;
    emailVerified: string;
    accountDeleted: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    nav: {
      home: 'الرئيسية',
      categories: 'الفئات',
      products: 'المنتجات',
      about: 'حولنا',
      contact: 'اتصل بنا',
      admin: 'لوحة الإدارة',
      help: 'المساعدة',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      profile: 'الملف الشخصي',
      cart: 'السلة',
      wishlist: 'قائمة الأمنيات',
      compare: 'مقارنة',
    },
    common: {
      search: 'البحث',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',
      add: 'إضافة',
      remove: 'إزالة',
      update: 'تحديث',
      submit: 'إر��ال',
      back: 'العودة',
      next: 'التالي',
      previous: 'السابق',
      close: 'إغلاق',
      select: 'اختيار',
      required: 'مطلوب',
      optional: 'اختياري',
      currency: 'العملة',
      language: 'اللغة',
      theme: 'السمة',
      notifications: 'الإشعارات',
      all: 'الكل',
      none: 'لا شيء',
      total: 'المجموع',
      subtotal: 'المجموع الفرعي',
      tax: 'الضريبة',
      shipping: 'الشحن',
      discount: 'الخصم',
      quantity: 'الكمية',
      price: 'السعر',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      address: 'العنوان',
      city: 'المدينة',
      state: 'الولاية',
      zipCode: 'الرمز البريدي',
      country: 'البلد',
      wilaya: 'الولاية',
      commune: 'البلدية',
    },
    product: {
      addToCart: 'أضف للسلة',
      addToWishlist: 'أضف للمفضلة',
      addToCompare: 'أضف للمقارنة',
      removeFromWishlist: 'إزالة من المفضلة',
      removeFromCompare: 'إزالة من المقارنة',
      inStock: 'متوفر',
      outOfStock: 'غير متوفر',
      rating: 'التقييم',
      reviews: 'المراجعات',
      description: 'الوصف',
      specifications: 'المواصفات',
      features: 'الميزات',
      relatedProducts: 'منتجات ذات صلة',
      similarProducts: 'منتجات مشابهة',
      viewDetails: 'عرض التفاصيل',
      selectOptions: 'اختيار الخيارات',
      size: 'الحجم',
      color: 'اللون',
      brand: 'العلامة التجارية',
      category: 'الفئة',
      tags: 'العلامات',
      sku: 'رمز المنتج',
      availability: 'التوفر',
      condition: 'الحالة',
      warranty: 'الضمان',
      returnPolicy: 'سياسة الإرجاع',
    },
    cart: {
      title: 'سلة التسوق',
      empty: 'السلة فارغة',
      emptyMessage: 'لا توجد عناصر في السلة',
      continueShopping: 'متابعة التسوق',
      checkout: 'الدفع',
      removeItem: 'إزالة العنصر',
      updateQuantity: 'تحديث الكمية',
      totalItems: 'إجمالي العناصر',
      shippingCalculated: 'يتم حساب الشحن في الدفع',
      proceedToCheckout: 'المتابعة للدفع',
      applyCoupon: 'تطبيق الكوبون',
      couponCode: 'رمز الكوبون',
    },
    checkout: {
      title: 'إتمام الطلب',
      billingAddress: 'عنوان الفواتير',
      shippingAddress: 'عنوان الشحن',
      sameAsBilling: 'نفس عنوان الفواتير',
      paymentMethod: 'طريقة الدفع',
      orderSummary: 'ملخص الطلب',
      placeOrder: 'تأكيد الطلب',
      orderTotal: 'إجمالي الطلب',
      estimatedDelivery: 'تاريخ التسليم المقدر',
      paymentMethods: {
        cib: 'بطاقة CIB',
        eddahabia: 'الذهبية',
        flexy: 'فليكسي',
        goldCard: 'البطاقة الذهبية',
        cashOnDelivery: 'الدفع عند التسليم',
        bankTransfer: 'تحويل بنكي',
      },
      shippingMethods: {
        standard: 'شحن عادي',
        express: 'شحن سريع',
        pickup: 'استلام من المتجر',
        yalidinaHome: 'ياليدينا - توصيل منزلي',
        yalidinaPickup: 'ياليدينا - نقطة استلام',
        aramexHome: 'أراميكس - توصيل منزلي',
        aramexPickup: 'أراميكس - نقطة استلام',
      },
    },
    auth: {
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      loginTitle: 'مرحباً بعودتك',
      registerTitle: 'إنشاء حساب جديد',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      phoneNumber: 'رقم الهاتف',
      forgotPassword: 'نسيت كلمة المرور؟',
      resetPassword: 'إعادة تعيين كلمة المرور',
      rememberMe: 'تذكرني',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      createAccount: 'إنشاء حساب',
      signInWith: 'تسجيل الدخول بواسطة',
      termsAndConditions: 'الشروط والأحكام',
      privacyPolicy: 'سياسة الخصوصية',
      agreeToTerms: 'أوافق على الشروط والأحكام',
      invalidCredentials: 'بيانات دخول غير صحيحة',
      passwordTooShort: 'كلمة المرور قصيرة جداً',
      emailInvalid: 'البريد الإلكتروني غير صحيح',
      accountCreated: 'تم إنشاء الحساب بنجاح',
      welcomeBack: 'مرحباً بعودتك',
      loggedOut: 'تم تسجيل الخروج',
    },
    profile: {
      title: 'المل�� الشخصي',
      personalInfo: 'المعلومات الشخصية',
      addresses: 'العناوين',
      orders: 'الطلبات',
      preferences: 'التفضيلات',
      security: 'الأمان',
      notifications: 'الإشعارات',
      paymentMethods: 'طرق الدفع',
      orderHistory: 'تاريخ الطلبات',
      wishlist: 'قائمة الأمنيات',
      reviews: 'المراجعات',
      rewards: 'المكافآت',
      referrals: 'الإحالات',
      support: 'الدعم',
    },
    categories: {
      electronics: 'الإلكترونيات',
      clothing: 'الملابس والأزياء',
      home: 'المنزل والحديقة',
      books: 'الكتب والوسائط',
      sports: 'الرياضة والهواء الطلق',
      beauty: 'الجمال والعناية الشخصية',
      automotive: 'السيارات',
      toys: 'الألعاب',
      groceries: 'البقالة',
      pharmacy: 'الصيدلية',
      jewelry: 'المجوهرات',
      appliances: 'الأجهزة المنزلية',
      furniture: 'الأثاث',
      tools: 'الأدوات',
      baby: 'الطفل والأم',
      pets: 'الحيوانات الأليفة',
    },
    algeria: {
      wilayas: {
        '01': 'أدرار',
        '02': 'الشلف',
        '03': 'الأغواط',
        '04': 'أم البواقي',
        '05': 'باتنة',
        '06': 'بجاية',
        '07': 'بسكرة',
        '08': 'بشار',
        '09': 'البليدة',
        '10': 'البويرة',
        '11': 'تمنراست',
        '12': 'تبسة',
        '13': 'تلمسان',
        '14': 'تيارت',
        '15': 'تيزي وزو',
        '16': 'الجزائر',
        '17': 'الجلفة',
        '18': 'جيجل',
        '19': 'سطيف',
        '20': 'سعيدة',
        '21': 'سكيكدة',
        '22': 'سيدي بلعباس',
        '23': 'عنابة',
        '24': 'قالمة',
        '25': 'قسنطينة',
        '26': 'المدية',
        '27': 'مستغانم',
        '28': 'المسيلة',
        '29': 'معسكر',
        '30': 'ورقلة',
        '31': 'وهران',
        '32': 'البيض',
        '33': 'إليزي',
        '34': 'برج بوعريريج',
        '35': 'بومرداس',
        '36': 'الطارف',
        '37': 'تندوف',
        '38': 'تيسمسيلت',
        '39': 'الوادي',
        '40': 'خنشلة',
        '41': 'سوق أهراس',
        '42': 'تيبازة',
        '43': 'ميلة',
        '44': 'عين الدفل��',
        '45': 'النعامة',
        '46': 'عين تموشنت',
        '47': 'غرداية',
        '48': 'غليزان',
      },
      paymentInfo: {
        cibInfo: 'ادفع بأمان ��استخدام بطاقة CIB البنكية',
        eddahabiaInfo: 'ادفع باستخدام بطاقة الذهبية لبريد الجزائر',
        flexyInfo: 'ادفع بسهولة باستخدام فليكسي',
        codInfo: 'ادفع نقداً عند استلام طلبك',
      },
      shipping: {
        homeDelivery: 'التوصيل للمنزل',
        pickupPoint: 'الاستلام من نقطة',
        freeShippingThreshold: 'شحن مجاني للطلبات أكثر من 5000 دج',
        estimatedDays: 'التسليم خلال 2-5 أيام عمل',
      },
      support: {
        customerService: 'خدمة العملاء',
        technicalSupport: 'الدعم الفني',
        orderTracking: 'تتبع الطلب',
        returns: 'الإرجاع والاستبدال',
      },
    },
    messages: {
      itemAdded: 'تم إضافة المنتج للسلة',
      itemRemoved: 'تم إزالة المنتج من السلة',
      cartUpdated: 'تم تحديث السلة',
      orderPlaced: 'تم تأكيد طلبك بنجاح',
      paymentSuccess: 'تم الدفع بنجاح',
      paymentFailed: 'فشل في الدفع',
      shippingUpdated: 'تم تحديث معلومات الشحن',
      deliveryConfirmed: 'تم تأكيد التسليم',
      returnsRequested: 'تم طلب الإرجاع',
      reviewSubmitted: 'تم إرسال المراجعة',
      profileUpdated: 'تم تحديث الملف الشخصي',
      passwordChanged: 'تم تغيير كلمة المرور',
      emailVerified: 'تم التحقق من البريد الإلكتروني',
      accountDeleted: 'تم حذف الحساب',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      categories: 'Catégories',
      products: 'Produits',
      about: 'À propos',
      contact: 'Contact',
      admin: 'Administration',
      help: 'Aide',
      login: 'Connexion',
      logout: 'Déconnexion',
      profile: 'Profil',
      cart: 'Panier',
      wishlist: 'Liste de souhaits',
      compare: 'Comparer',
    },
    common: {
      search: 'Rechercher',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      save: 'Sauvegarder',
      edit: 'Modifier',
      delete: 'Supprimer',
      add: 'Ajouter',
      remove: 'Retirer',
      update: 'Mettre à jour',
      submit: 'Soumettre',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      close: 'Fermer',
      select: 'Sélectionner',
      required: 'Requis',
      optional: 'Optionnel',
      currency: 'Devise',
      language: 'Langue',
      theme: 'Thème',
      notifications: 'Notifications',
      all: 'Tous',
      none: 'Aucun',
      total: 'Total',
      subtotal: 'Sous-total',
      tax: 'Taxe',
      shipping: 'Expédition',
      discount: 'Remise',
      quantity: 'Quantité',
      price: 'Prix',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      address: 'Adresse',
      city: 'Ville',
      state: 'État',
      zipCode: 'Code postal',
      country: 'Pays',
      wilaya: 'Wilaya',
      commune: 'Commune',
    },
    product: {
      addToCart: 'Ajouter au panier',
      addToWishlist: 'Ajouter aux favoris',
      addToCompare: 'Ajouter à la comparaison',
      removeFromWishlist: 'Retirer des favoris',
      removeFromCompare: 'Retirer de la comparaison',
      inStock: 'En stock',
      outOfStock: 'Rupture de stock',
      rating: 'Évaluation',
      reviews: 'Avis',
      description: 'Description',
      specifications: 'Spécifications',
      features: 'Caractéristiques',
      relatedProducts: 'Produits connexes',
      similarProducts: 'Produits similaires',
      viewDetails: 'Voir les détails',
      selectOptions: 'Sélectionner les options',
      size: 'Taille',
      color: 'Couleur',
      brand: 'Marque',
      category: 'Catégorie',
      tags: 'Étiquettes',
      sku: 'SKU',
      availability: 'Disponibilité',
      condition: 'État',
      warranty: 'Garantie',
      returnPolicy: 'Politique de retour',
    },
    cart: {
      title: 'Panier',
      empty: 'Panier vide',
      emptyMessage: 'Aucun article dans le panier',
      continueShopping: 'Continuer les achats',
      checkout: 'Commander',
      removeItem: 'Retirer l\'article',
      updateQuantity: 'Mettre à jour la quantité',
      totalItems: 'Total des articles',
      shippingCalculated: 'Frais de port calculés à la commande',
      proceedToCheckout: 'Procéder à la commande',
      applyCoupon: 'Appliquer le coupon',
      couponCode: 'Code de coupon',
    },
    checkout: {
      title: 'Finaliser la commande',
      billingAddress: 'Adresse de facturation',
      shippingAddress: 'Adresse de livraison',
      sameAsBilling: 'Identique à l\'adresse de facturation',
      paymentMethod: 'Méthode de paiement',
      orderSummary: 'Résumé de la commande',
      placeOrder: 'Passer la commande',
      orderTotal: 'Total de la commande',
      estimatedDelivery: 'Livraison estimée',
      paymentMethods: {
        cib: 'Carte CIB',
        eddahabia: 'Eddahabia',
        flexy: 'Flexy',
        goldCard: 'Carte Gold',
        cashOnDelivery: 'Paiement à la livraison',
        bankTransfer: 'Virement bancaire',
      },
      shippingMethods: {
        standard: 'Livraison standard',
        express: 'Livraison express',
        pickup: 'Retrait en magasin',
        yalidinaHome: 'Yalidina - Livraison à domicile',
        yalidinaPickup: 'Yalidina - Point de retrait',
        aramexHome: 'Aramex - Livraison à domicile',
        aramexPickup: 'Aramex - Point de retrait',
      },
    },
    auth: {
      login: 'Connexion',
      register: 'S\'inscrire',
      loginTitle: 'Bon retour',
      registerTitle: 'Créer un nouveau compte',
      email: 'Email',
      password: 'Mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      firstName: 'Prénom',
      lastName: 'Nom de famille',
      phoneNumber: 'Numéro de téléphone',
      forgotPassword: 'Mot de passe oublié ?',
      resetPassword: 'Réinitialiser le mot de passe',
      rememberMe: 'Se souvenir de moi',
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      dontHaveAccount: 'Vous n\'avez pas de compte ?',
      createAccount: 'Créer un compte',
      signInWith: 'Se connecter avec',
      termsAndConditions: 'Conditions générales',
      privacyPolicy: 'Politique de confidentialité',
      agreeToTerms: 'J\'accepte les conditions générales',
      invalidCredentials: 'Identifiants invalides',
      passwordTooShort: 'Mot de passe trop court',
      emailInvalid: 'Email invalide',
      accountCreated: 'Compte créé avec succès',
      welcomeBack: 'Bon retour',
      loggedOut: 'Déconnecté',
    },
    profile: {
      title: 'Profil',
      personalInfo: 'Informations personnelles',
      addresses: 'Adresses',
      orders: 'Commandes',
      preferences: 'Préférences',
      security: 'Sécurité',
      notifications: 'Notifications',
      paymentMethods: 'Méthodes de paiement',
      orderHistory: 'Historique des commandes',
      wishlist: 'Liste de souhaits',
      reviews: 'Avis',
      rewards: 'Récompenses',
      referrals: 'Parrainages',
      support: 'Support',
    },
    categories: {
      electronics: 'Électronique',
      clothing: 'Mode et vêtements',
      home: 'Maison et jardin',
      books: 'Livres et médias',
      sports: 'Sports et plein air',
      beauty: 'Beauté et soins personnels',
      automotive: 'Automobile',
      toys: 'Jouets et jeux',
      groceries: 'Épicerie',
      pharmacy: 'Pharmacie',
      jewelry: 'Bijoux',
      appliances: 'Électroménager',
      furniture: 'Mobilier',
      tools: 'Outils',
      baby: 'Bébé et maman',
      pets: 'Animaux de compagnie',
    },
    algeria: {
      wilayas: {
        '01': 'Adrar',
        '02': 'Chlef',
        '03': 'Laghouat',
        '04': 'Oum El Bouaghi',
        '05': 'Batna',
        '06': 'Béjaïa',
        '07': 'Biskra',
        '08': 'Béchar',
        '09': 'Blida',
        '10': 'Bouira',
        '11': 'Tamanrasset',
        '12': 'Tébessa',
        '13': 'Tlemcen',
        '14': 'Tiaret',
        '15': 'Tizi Ouzou',
        '16': 'Alger',
        '17': 'Djelfa',
        '18': 'Jijel',
        '19': 'Sétif',
        '20': 'Saïda',
        '21': 'Skikda',
        '22': 'Sidi Bel Abbès',
        '23': 'Annaba',
        '24': 'Guelma',
        '25': 'Constantine',
        '26': 'Médéa',
        '27': 'Mostaganem',
        '28': 'M\'Sila',
        '29': 'Mascara',
        '30': 'Ouargla',
        '31': 'Oran',
        '32': 'El Bayadh',
        '33': 'Illizi',
        '34': 'Bordj Bou Arréridj',
        '35': 'Boumerdès',
        '36': 'El Tarf',
        '37': 'Tindouf',
        '38': 'Tissemsilt',
        '39': 'El Oued',
        '40': 'Khenchela',
        '41': 'Souk Ahras',
        '42': 'Tipaza',
        '43': 'Mila',
        '44': 'Aïn Defla',
        '45': 'Naâma',
        '46': 'Aïn Témouchent',
        '47': 'Ghardaïa',
        '48': 'Relizane',
      },
      paymentInfo: {
        cibInfo: 'Payez en sécurité avec votre carte CIB',
        eddahabiaInfo: 'Payez avec votre carte Eddahabia d\'Algérie Poste',
        flexyInfo: 'Payez facilement avec Flexy',
        codInfo: 'Payez en espèces à la réception de votre commande',
      },
      shipping: {
        homeDelivery: 'Livraison à domicile',
        pickupPoint: 'Point de retrait',
        freeShippingThreshold: 'Livraison gratuite pour les commandes de plus de 5000 DA',
        estimatedDays: 'Livraison sous 2-5 jours ouvrables',
      },
      support: {
        customerService: 'Service client',
        technicalSupport: 'Support technique',
        orderTracking: 'Suivi de commande',
        returns: 'Retours et échanges',
      },
    },
    messages: {
      itemAdded: 'Article ajouté au panier',
      itemRemoved: 'Article retiré du panier',
      cartUpdated: 'Panier mis à jour',
      orderPlaced: 'Commande passée avec succès',
      paymentSuccess: 'Paiement réussi',
      paymentFailed: 'Échec du paiement',
      shippingUpdated: 'Informations de livraison mises à jour',
      deliveryConfirmed: 'Livraison confirmée',
      returnsRequested: 'Retour demandé',
      reviewSubmitted: 'Avis soumis',
      profileUpdated: 'Profil mis à jour',
      passwordChanged: 'Mot de passe modifié',
      emailVerified: 'Email vérifié',
      accountDeleted: 'Compte supprimé',
    },
  },
  en: {
    nav: {
      home: 'Home',
      categories: 'Categories',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      admin: 'Admin',
      help: 'Help',
      login: 'Login',
      logout: 'Logout',
      profile: 'Profile',
      cart: 'Cart',
      wishlist: 'Wishlist',
      compare: 'Compare',
    },
    common: {
      search: 'Search',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      remove: 'Remove',
      update: 'Update',
      submit: 'Submit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      select: 'Select',
      required: 'Required',
      optional: 'Optional',
      currency: 'Currency',
      language: 'Language',
      theme: 'Theme',
      notifications: 'Notifications',
      all: 'All',
      none: 'None',
      total: 'Total',
      subtotal: 'Subtotal',
      tax: 'Tax',
      shipping: 'Shipping',
      discount: 'Discount',
      quantity: 'Quantity',
      price: 'Price',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      state: 'State',
      zipCode: 'ZIP Code',
      country: 'Country',
      wilaya: 'Wilaya',
      commune: 'Commune',
    },
    product: {
      addToCart: 'Add to Cart',
      addToWishlist: 'Add to Wishlist',
      addToCompare: 'Add to Compare',
      removeFromWishlist: 'Remove from Wishlist',
      removeFromCompare: 'Remove from Compare',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      rating: 'Rating',
      reviews: 'Reviews',
      description: 'Description',
      specifications: 'Specifications',
      features: 'Features',
      relatedProducts: 'Related Products',
      similarProducts: 'Similar Products',
      viewDetails: 'View Details',
      selectOptions: 'Select Options',
      size: 'Size',
      color: 'Color',
      brand: 'Brand',
      category: 'Category',
      tags: 'Tags',
      sku: 'SKU',
      availability: 'Availability',
      condition: 'Condition',
      warranty: 'Warranty',
      returnPolicy: 'Return Policy',
    },
    cart: {
      title: 'Shopping Cart',
      empty: 'Cart is empty',
      emptyMessage: 'No items in cart',
      continueShopping: 'Continue Shopping',
      checkout: 'Checkout',
      removeItem: 'Remove Item',
      updateQuantity: 'Update Quantity',
      totalItems: 'Total Items',
      shippingCalculated: 'Shipping calculated at checkout',
      proceedToCheckout: 'Proceed to Checkout',
      applyCoupon: 'Apply Coupon',
      couponCode: 'Coupon Code',
    },
    checkout: {
      title: 'Checkout',
      billingAddress: 'Billing Address',
      shippingAddress: 'Shipping Address',
      sameAsBilling: 'Same as billing address',
      paymentMethod: 'Payment Method',
      orderSummary: 'Order Summary',
      placeOrder: 'Place Order',
      orderTotal: 'Order Total',
      estimatedDelivery: 'Estimated Delivery',
      paymentMethods: {
        cib: 'CIB Card',
        eddahabia: 'Eddahabia',
        flexy: 'Flexy',
        goldCard: 'Gold Card',
        cashOnDelivery: 'Cash on Delivery',
        bankTransfer: 'Bank Transfer',
      },
      shippingMethods: {
        standard: 'Standard Shipping',
        express: 'Express Shipping',
        pickup: 'Store Pickup',
        yalidinaHome: 'Yalidina - Home Delivery',
        yalidinaPickup: 'Yalidina - Pickup Point',
        aramexHome: 'Aramex - Home Delivery',
        aramexPickup: 'Aramex - Pickup Point',
      },
    },
    auth: {
      login: 'Login',
      register: 'Register',
      loginTitle: 'Welcome Back',
      registerTitle: 'Create New Account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      phoneNumber: 'Phone Number',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
      rememberMe: 'Remember Me',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?',
      createAccount: 'Create Account',
      signInWith: 'Sign in with',
      termsAndConditions: 'Terms and Conditions',
      privacyPolicy: 'Privacy Policy',
      agreeToTerms: 'I agree to the terms and conditions',
      invalidCredentials: 'Invalid credentials',
      passwordTooShort: 'Password too short',
      emailInvalid: 'Invalid email',
      accountCreated: 'Account created successfully',
      welcomeBack: 'Welcome back',
      loggedOut: 'Logged out',
    },
    profile: {
      title: 'Profile',
      personalInfo: 'Personal Information',
      addresses: 'Addresses',
      orders: 'Orders',
      preferences: 'Preferences',
      security: 'Security',
      notifications: 'Notifications',
      paymentMethods: 'Payment Methods',
      orderHistory: 'Order History',
      wishlist: 'Wishlist',
      reviews: 'Reviews',
      rewards: 'Rewards',
      referrals: 'Referrals',
      support: 'Support',
    },
    categories: {
      electronics: 'Electronics',
      clothing: 'Fashion & Clothing',
      home: 'Home & Garden',
      books: 'Books & Media',
      sports: 'Sports & Outdoors',
      beauty: 'Beauty & Personal Care',
      automotive: 'Automotive',
      toys: 'Toys & Games',
      groceries: 'Groceries',
      pharmacy: 'Pharmacy',
      jewelry: 'Jewelry',
      appliances: 'Appliances',
      furniture: 'Furniture',
      tools: 'Tools',
      baby: 'Baby & Mother',
      pets: 'Pets',
    },
    algeria: {
      wilayas: {
        '01': 'Adrar',
        '02': 'Chlef',
        '03': 'Laghouat',
        '04': 'Oum El Bouaghi',
        '05': 'Batna',
        '06': 'Béjaïa',
        '07': 'Biskra',
        '08': 'Béchar',
        '09': 'Blida',
        '10': 'Bouira',
        '11': 'Tamanrasset',
        '12': 'Tébessa',
        '13': 'Tlemcen',
        '14': 'Tiaret',
        '15': 'Tizi Ouzou',
        '16': 'Algiers',
        '17': 'Djelfa',
        '18': 'Jijel',
        '19': 'Sétif',
        '20': 'Saïda',
        '21': 'Skikda',
        '22': 'Sidi Bel Abbès',
        '23': 'Annaba',
        '24': 'Guelma',
        '25': 'Constantine',
        '26': 'Médéa',
        '27': 'Mostaganem',
        '28': 'M\'Sila',
        '29': 'Mascara',
        '30': 'Ouargla',
        '31': 'Oran',
        '32': 'El Bayadh',
        '33': 'Illizi',
        '34': 'Bordj Bou Arréridj',
        '35': 'Boumerdès',
        '36': 'El Tarf',
        '37': 'Tindouf',
        '38': 'Tissemsilt',
        '39': 'El Oued',
        '40': 'Khenchela',
        '41': 'Souk Ahras',
        '42': 'Tipaza',
        '43': 'Mila',
        '44': 'Aïn Defla',
        '45': 'Naâma',
        '46': 'Aïn Témouchent',
        '47': 'Ghardaïa',
        '48': 'Relizane',
      },
      paymentInfo: {
        cibInfo: 'Pay securely with your CIB bank card',
        eddahabiaInfo: 'Pay with your Eddahabia card from Algeria Post',
        flexyInfo: 'Pay easily with Flexy',
        codInfo: 'Pay cash when you receive your order',
      },
      shipping: {
        homeDelivery: 'Home Delivery',
        pickupPoint: 'Pickup Point',
        freeShippingThreshold: 'Free shipping for orders over 5000 DA',
        estimatedDays: 'Delivery within 2-5 business days',
      },
      support: {
        customerService: 'Customer Service',
        technicalSupport: 'Technical Support',
        orderTracking: 'Order Tracking',
        returns: 'Returns & Exchanges',
      },
    },
    messages: {
      itemAdded: 'Item added to cart',
      itemRemoved: 'Item removed from cart',
      cartUpdated: 'Cart updated',
      orderPlaced: 'Order placed successfully',
      paymentSuccess: 'Payment successful',
      paymentFailed: 'Payment failed',
      shippingUpdated: 'Shipping information updated',
      deliveryConfirmed: 'Delivery confirmed',
      returnsRequested: 'Return requested',
      reviewSubmitted: 'Review submitted',
      profileUpdated: 'Profile updated',
      passwordChanged: 'Password changed',
      emailVerified: 'Email verified',
      accountDeleted: 'Account deleted',
    },
  },
};

// Hook for using translations
export function useTranslation(language: Language) {
  return translations[language] || translations.en;
}

// Currency formatting for DZD
export function formatCurrency(amount: number, currency: 'USD' | 'EUR' | 'DZD' = 'DZD'): string {
  switch (currency) {
    case 'DZD':
      return new Intl.NumberFormat('ar-DZ', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount);
    case 'USD':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
    case 'EUR':
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);
    default:
      return amount.toString();
  }
}

// RTL support for Arabic
export function getTextDirection(language: Language): 'ltr' | 'rtl' {
  return language === 'ar' ? 'rtl' : 'ltr';
}

// Date formatting for Algerian locale
export function formatDate(date: Date, language: Language): string {
  const locale = language === 'ar' ? 'ar-DZ' : language === 'fr' ? 'fr-DZ' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
