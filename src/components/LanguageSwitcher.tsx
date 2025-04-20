
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

export function LanguageSwitcher() {
  const { language, changeLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en');
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="rounded-full px-4"
    >
      {t('changeLanguage')}
    </Button>
  );
}
