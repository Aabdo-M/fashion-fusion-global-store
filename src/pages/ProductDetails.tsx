
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductView3D } from "@/components/ProductView3D";
import { getProductById, getProductsByCategory } from "@/data/products";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGrid } from "@/components/ProductGrid";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share2 } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  const product = id ? getProductById(id) : null;
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود | Product not found</h1>
          <Link to="/">
            <Button>{t('home')}</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // Get related products
  const relatedProducts = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
  
  const formattedPrice = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: 'SAR',
  }).format(product.price);
  
  const formattedSalePrice = product.salePrice
    ? new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
        style: 'currency',
        currency: 'SAR',
      }).format(product.salePrice)
    : null;
    
  const incrementQuantity = () => setQuantity(q => Math.min(q + 1, product.stock));
  const decrementQuantity = () => setQuantity(q => Math.max(q - 1, 1));

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container">
          {/* Breadcrumbs */}
          <div className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">{t('home')}</Link>
            {' / '}
            <Link to="/products" className="hover:text-primary">{t('products')}</Link>
            {' / '}
            <Link to={`/category/${product.category}`} className="hover:text-primary">{t(product.category)}</Link>
            {' / '}
            <span>{product.name}</span>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <div>
              {product.is3D ? (
                <ProductView3D product={product} />
              ) : (
                <div className="aspect-square border rounded-lg overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="aspect-square border rounded-lg overflow-hidden">
                      <img 
                        src={image} 
                        alt={`${product.name} ${index + 1}`} 
                        className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="mt-2 flex items-center gap-4">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl font-bold">{formattedSalePrice}</span>
                      <span className="text-lg text-muted-foreground line-through">{formattedPrice}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">{formattedPrice}</span>
                  )}
                </div>
              </div>
              
              <Separator />
              
              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">{t('size')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className="w-12 h-12"
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">{t('color')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Button
                        key={color}
                        variant={selectedColor === color ? "default" : "outline"}
                        className="px-4"
                        onClick={() => setSelectedColor(color)}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div>
                <h3 className="font-medium mb-3">{t('quantity')}</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground ml-4">
                    {product.stock} {t('inStock')}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button className="flex-1 gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  {t('addToCart')}
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              <Separator />
              
              {/* Description */}
              <div>
                <h3 className="font-medium mb-3">{t('description')}</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">{t('description')}</TabsTrigger>
                <TabsTrigger value="reviews">{t('reviews')}</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4">
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                  <p>
                    تفاصيل إضافية عن المنتج وميزاته الفريدة. هذا النص هو مثال للنص الذي يمكن أن يستبدل في نفس المساحة.<br />
                    Additional details about the product and its unique features. This text is an example of text that can be replaced in the same space.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-4">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      لا توجد تقييمات بعد. كن أول من يقيم هذا المنتج.<br />
                      No reviews yet. Be the first to review this product.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">{t('relatedProducts')}</h2>
              <ProductGrid products={relatedProducts} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
