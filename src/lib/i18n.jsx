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
    },
    hero: {
      title: 'Votre Expert Informatique',
      subtitle: 'PC, composants, périphériques et services à Sidi Bel Abbès',
      cta: 'Voir les produits',
    },
    categories: 'Catégories',
    featured: 'Produits vedettes',
    viewAll: 'Voir tout',
    pcBuilder: {
      title: 'PC Builder',
      subtitle: 'Choisissez vos composants et construisez votre configuration idéale',
      cpu: 'Processeur',
      gpu: 'Carte Graphique',
      ram: 'Mémoire RAM',
      storage: 'Stockage',
      total: 'Total estimé',
      build: 'Construire',
    },
    faq: {
      title: 'Questions Fréquentes',
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
    },
    hero: {
      title: 'خبير الكمبيوتر الخاص بك',
      subtitle: 'أجهزة الكمبيوتر، المكونات، الملحقات والخدمات في سيدي بلعباس',
      cta: 'تصفح المنتجات',
    },
    categories: 'الفئات',
    featured: 'منتجات مميزة',
    viewAll: 'عرض الكل',
    pcBuilder: {
      title: 'تجميع الحاسوب',
      subtitle: 'اختر مكوناتك وقم ببناء الإعداد المثالي',
      cpu: 'المعالج',
      gpu: 'بطاقة الرسوميات',
      ram: 'ذاكرة RAM',
      storage: 'التخزين',
      total: 'الإجمالي التقديري',
      build: 'بناء',
    },
    faq: {
      title: 'الأسئلة الشائعة',
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
    },
    hero: {
      title: 'Your IT Expert',
      subtitle: 'PCs, components, peripherals & services in Sidi Bel Abbès',
      cta: 'Browse Products',
    },
    categories: 'Categories',
    featured: 'Featured Products',
    viewAll: 'View All',
    pcBuilder: {
      title: 'PC Builder',
      subtitle: 'Pick your components and build your ideal setup',
      cpu: 'Processor',
      gpu: 'Graphics Card',
      ram: 'RAM',
      storage: 'Storage',
      total: 'Estimated Total',
      build: 'Build',
    },
    faq: {
      title: 'Frequently Asked Questions',
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