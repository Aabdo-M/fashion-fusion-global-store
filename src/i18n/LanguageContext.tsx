
import { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from './translations';

type LanguageContextType = {
  language: 'en' | 'ar';
  t: (key: string) => string;
  changeLanguage: (lang: 'en' | 'ar') => void;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('ar'); // Default to Arabic
  
  const changeLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };
  
  // Initialize direction
  if (typeof document !== 'undefined') {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  const isRTL = language === 'ar';
  
  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
