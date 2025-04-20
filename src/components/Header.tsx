
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  User 
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";

export function Header() {
  const { t, isRTL } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={isRTL ? "right" : "left"} className="sm:max-w-xs">
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link to="/" className="hover:text-primary transition-colors">
                {t('home')}
              </Link>
              <Link to="/products" className="hover:text-primary transition-colors">
                {t('products')}
              </Link>
              <Link to="/categories" className="hover:text-primary transition-colors">
                {t('categories')}
              </Link>
              <div className="flex flex-col gap-4 mt-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase">
                  {t('categories')}
                </h3>
                <Link to="/category/men" className="hover:text-primary transition-colors">
                  {t('men')}
                </Link>
                <Link to="/category/women" className="hover:text-primary transition-colors">
                  {t('women')}
                </Link>
                <Link to="/category/kids" className="hover:text-primary transition-colors">
                  {t('kids')}
                </Link>
                <Link to="/category/accessories" className="hover:text-primary transition-colors">
                  {t('accessories')}
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center gap-2 ml-4 md:ml-0">
          <Link to="/" className="font-bold text-xl hidden md:block">
            {t('siteName')}
          </Link>
          <Link to="/" className="font-bold text-xl block md:hidden">
            FF
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 mx-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            {t('home')}
          </Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
            {t('products')}
          </Link>
          <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            {t('categories')}
          </Link>
        </nav>

        <div className={`flex items-center gap-4 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
          <LanguageSwitcher />
          
          {isSearchOpen ? (
            <div className="flex items-center">
              <Input 
                type="search" 
                placeholder={t('search')} 
                className="h-9 w-[200px] md:w-[300px]" 
              />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">{t('search')}</span>
            </Button>
          )}

          <Link to="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">{t('cart')}</span>
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">{t('login')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
