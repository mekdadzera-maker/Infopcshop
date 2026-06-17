import React, { createContext, useContext, useState, useEffect } from 'react';

const LangContext = createContext();

const translations = {
  fr: {
    nav: {
      home: 'Accueil',
      products: 'Produits',
      contact: 'Contact',
      login: 'Connexion',
      myOrders: 'Mes commandes',
      dashboard: 'Admin',
      hello: 'Bonjour',
    },
    hero: {
      badge: 'Nouveau catalogue disponible',
      title1: 'Votre expert',
      title2: 'informatique',
      title3: 'à Sidi Bel Abbès',
      subtitle: 'PC, composants, accessoires et services. Livraison partout en Algérie — paiement à la livraison.',
      cta: 'Découvrir',
      contact: 'Nous contacter',
    },
    features: {
      shipping: 'Livraison nationale',
      shippingDesc: '58 wilayas couvertes',
      cod: 'Paiement à la livraison',
      codDesc: 'الدفع عند الاستلام',
      warranty: 'Garantie',
      warrantyDesc: 'Produits garantis',
      support: 'Support technique',
      supportDesc: 'Assistance pro',
    },
    categories: 'Catégories',
    browseCategories: 'Parcourir par catégorie',
    featured: 'Produits vedettes',
    selection: 'Sélection',
    viewAll: 'Voir tout',
    explore: 'Explorer',
    pcBuilder: {
      title: 'PC Builder',
      subtitle: 'Choisissez vos composants et construisez votre configuration idéale',
      cpu: 'Processeur',
      gpu: 'Carte Graphique',
      ram: 'Mémoire RAM',
      storage: 'Stockage',
      total: 'Total estimé',
      build: 'Construire',
      choose: 'Choisir...',
    },
    faq: {
      title: 'Questions Fréquentes',
    },
    product: {
      outOfStock: 'Rupture',
      featured: 'Vedette',
      addedToCart: 'Ajouté au panier',
    },
    footer: {
      tagline: 'Votre partenaire informatique à Sidi Bel Abbès. Vente, maintenance et services informatiques professionnels.',
      quickLinks: 'Liens rapides',
      contact: 'Contact',
      satThu: 'Sam–Jeu: 9h–20h',
      rights: 'Tous droits réservés.',
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Notre équipe est à votre disposition pour toute question ou demande de devis.',
      phone: 'Téléphone',
      address: 'Adresse',
      hours: 'Horaires',
      call: 'Appeler',
      visitSite: 'Visiter notre site web',
    },
    home: {
      hardwareTitle: 'PC Hardware',
      hardwareSub: 'Components',
      ctaTitle: "Besoin d'un conseil technique ?",
      ctaSub: "Notre équipe d'experts est disponible pour vous guider dans vos choix informatiques.",
      ctaButton: 'Contactez-nous',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      products: 'المنتجات',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      myOrders: 'طلباتي',
      dashboard: 'لوحة التحكم',
      hello: 'مرحباً',
    },
    hero: {
      badge: 'كتالوج جديد متاح',
      title1: 'خبير',
      title2: 'الكمبيوتر',
      title3: 'في سيدي بلعباس',
      subtitle: 'أجهزة الكمبيوتر، المكونات، الملحقات والخدمات. توصيل لجميع ولايات الجزائر — الدفع عند الاستلام.',
      cta: 'اكتشف',
      contact: 'اتصل بنا',
    },
    features: {
      shipping: 'توصيل وطني',
      shippingDesc: '58 ولاية مغطاة',
      cod: 'الدفع عند الاستلام',
      codDesc: 'الدفع عند الاستلام',
      warranty: 'ضمان',
      warrantyDesc: 'منتجات مضمونة',
      support: 'دعم تقني',
      supportDesc: 'مساعدة احترافية',
    },
    categories: 'الفئات',
    browseCategories: 'تصفح حسب الفئة',
    featured: 'منتجات مميزة',
    selection: 'مختارات',
    viewAll: 'عرض الكل',
    explore: 'استكشف',
    pcBuilder: {
      title: 'تجميع الحاسوب',
      subtitle: 'اختر مكوناتك وقم ببناء الإعداد المثالي',
      cpu: 'المعالج',
      gpu: 'بطاقة الرسوميات',
      ram: 'ذاكرة RAM',
      storage: 'التخزين',
      total: 'الإجمالي التقديري',
      build: 'بناء',
      choose: 'اختيار...',
    },
    faq: {
      title: 'الأسئلة الشائعة',
    },
    product: {
      outOfStock: 'غير متوفر',
      featured: 'مميز',
      addedToCart: 'أضيف إلى السلة',
    },
    footer: {
      tagline: 'شريكك في تكنولوجيا المعلومات بسيدي بلعباس. بيع، صيانة وخدمات كمبيوتر احترافية.',
      quickLinks: 'روابط سريعة',
      contact: 'اتصل بنا',
      satThu: 'السبت–الخميس: 9ص–8م',
      rights: 'جميع الحقوق محفوظة.',
    },
    contact: {
      title: 'اتصل بنا',
      subtitle: 'فريقنا في خدمتك لأي سؤال أو طلب عرض سعر.',
      phone: 'الهاتف',
      address: 'العنوان',
      hours: 'ساعات العمل',
      call: 'اتصال',
      visitSite: 'زيارة موقعنا',
    },
    home: {
      hardwareTitle: 'مكونات الحاسوب',
      hardwareSub: 'Components',
      ctaTitle: 'هل تحتاج إلى استشارة تقنية؟',
      ctaSub: 'فريق الخبراء لدينا متاح لإرشادك في اختياراتك المعلوماتية.',
      ctaButton: 'اتصل بنا',
    },
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      contact: 'Contact',
      login: 'Login',
      myOrders: 'My Orders',
      dashboard: 'Dashboard',
      hello: 'Hello',
    },
    hero: {
      badge: 'New catalog available',
      title1: 'Your IT',
      title2: 'expert',
      title3: 'in Sidi Bel Abbès',
      subtitle: 'PCs, components, accessories & services. Delivery across Algeria — cash on delivery.',
      cta: 'Discover',
      contact: 'Contact us',
    },
    features: {
      shipping: 'Nationwide delivery',
      shippingDesc: '58 wilayas covered',
      cod: 'Cash on delivery',
      codDesc: 'الدفع عند الاستلام',
      warranty: 'Warranty',
      warrantyDesc: 'Guaranteed products',
      support: 'Technical support',
      supportDesc: 'Pro assistance',
    },
    categories: 'Categories',
    browseCategories: 'Browse by category',
    featured: 'Featured Products',
    selection: 'Selection',
    viewAll: 'View All',
    explore: 'Explore',
    pcBuilder: {
      title: 'PC Builder',
      subtitle: 'Pick your components and build your ideal setup',
      cpu: 'Processor',
      gpu: 'Graphics Card',
      ram: 'RAM',
      storage: 'Storage',
      total: 'Estimated Total',
      build: 'Build',
      choose: 'Choose...',
    },
    faq: {
      title: 'Frequently Asked Questions',
    },
    product: {
      outOfStock: 'Out of stock',
      featured: 'Featured',
      addedToCart: 'Added to cart',
    },
    footer: {
      tagline: 'Your IT partner in Sidi Bel Abbès. Professional computer sales, maintenance & IT services.',
      quickLinks: 'Quick links',
      contact: 'Contact',
      satThu: 'Sat–Thu: 9am–8pm',
      rights: 'All rights reserved.',
    },
    contact: {
      title: 'Contact us',
      subtitle: 'Our team is at your disposal for any questions or quote requests.',
      phone: 'Phone',
      address: 'Address',
      hours: 'Hours',
      call: 'Call',
      visitSite: 'Visit our website',
    },
    home: {
      hardwareTitle: 'PC Hardware',
      hardwareSub: 'Components',
      ctaTitle: 'Need technical advice?',
      ctaSub: 'Our expert team is available to guide you in your IT choices.',
      ctaButton: 'Contact us',
    },
  },
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('infopc_lang') || 'fr');

  useEffect(() => {
    localStorage.setItem('infopc_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = translations[lang] || translations.fr;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
}