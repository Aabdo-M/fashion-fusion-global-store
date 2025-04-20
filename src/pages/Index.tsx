
import { useLanguage } from "@/i18n/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { AIChat } from "@/components/AIChat";
import { ProductView3D } from "@/components/ProductView3D";
import { Button } from "@/components/ui/button";
import { 
  getFeaturedProducts, 
  getNewArrivals, 
  getBestSellers,
  products
} from "@/data/products";
import { ArrowRight, ShoppingBag } from "lucide-react";

const Index = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowRight : ArrowRight;
  
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  
  // For 3D display, let's get a product that has is3D flag
  const productWith3D = products.find(p => p.is3D);

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
          <div className="container py-20 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {t('welcome')}
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                {t('tagline')}
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button size="lg" className="gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  {t('startShopping')}
                </Button>
                <Button variant="outline" size="lg">
                  {t('categories')}
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80" 
                alt="Fashion Collection" 
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">{t('featuredProducts')}</h2>
              <Button variant="link" className="gap-2">
                {t('viewAll')}
                <ArrowIcon className="h-4 w-4" />
              </Button>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
        
        {/* 3D Product Display */}
        {productWith3D && (
          <section className="py-16 bg-muted/30">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">3D {t('viewDetails')}</h2>
                <p className="text-muted-foreground">
                  تصفح منتجاتنا بتقنية ثلاثية الأبعاد لتجربة تسوق فريدة | 
                  Browse our products in 3D for a unique shopping experience
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <ProductView3D product={productWith3D} />
              </div>
            </div>
          </section>
        )}
        
        {/* New Arrivals */}
        <section className="py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">{t('newArrivals')}</h2>
              <Button variant="link" className="gap-2">
                {t('viewAll')}
                <ArrowIcon className="h-4 w-4" />
              </Button>
            </div>
            <ProductGrid products={newArrivals} />
          </div>
        </section>
        
        {/* AI Chat Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">{t('chatWithUs')}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                استخدم المساعد الذكي لمساعدتك في العثور على المنتجات المناسبة أو الإجابة على أسئلتك | 
                Use our AI assistant to help you find suitable products or answer your questions
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <AIChat />
            </div>
          </div>
        </section>
        
        {/* Best Sellers */}
        <section className="py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">{t('bestSellers')}</h2>
              <Button variant="link" className="gap-2">
                {t('viewAll')}
                <ArrowIcon className="h-4 w-4" />
              </Button>
            </div>
            <ProductGrid products={bestSellers} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
