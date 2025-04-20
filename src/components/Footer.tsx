
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const { t, isRTL } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">{t('siteName')}</h3>
            <p className="text-muted-foreground text-sm">{t('tagline')}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">{t('categories')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/men" className="text-muted-foreground hover:text-primary">
                  {t('men')}
                </Link>
              </li>
              <li>
                <Link to="/category/women" className="text-muted-foreground hover:text-primary">
                  {t('women')}
                </Link>
              </li>
              <li>
                <Link to="/category/kids" className="text-muted-foreground hover:text-primary">
                  {t('kids')}
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-muted-foreground hover:text-primary">
                  {t('accessories')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">{t('aboutUs')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  {t('contactUs')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  {t('termsAndConditions')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">{t('subscribe')}</h4>
            <div className="flex gap-2">
              <Input type="email" placeholder={t('email')} />
              <Button variant="default" size="sm">
                {t('submit')}
              </Button>
            </div>
            <div className="mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full w-10 h-10 p-0"
                onClick={scrollToTop}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>{t('footer')}</p>
        </div>
      </div>
    </footer>
  );
}
