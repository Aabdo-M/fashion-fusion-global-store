
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Tag, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  
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

  return (
    <Card className="overflow-hidden group">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-black/5 z-10"></div>
          {product.is3D && (
            <div className="absolute top-2 right-2 z-20">
              <Badge variant="secondary" className="font-medium">
                3D
              </Badge>
            </div>
          )}
          {product.salePrice && (
            <div className="absolute top-2 left-2 z-20">
              <Badge variant="destructive" className="font-medium">
                {t('sale')}
              </Badge>
            </div>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-medium truncate">{product.name}</h3>
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="font-bold">{formattedSalePrice}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {formattedPrice}
                </span>
              </>
            ) : (
              <span className="font-bold">{formattedPrice}</span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="w-full" size="sm">
          {isRTL ? (
            <>
              {t('addToCart')} <ShoppingCart className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" /> {t('addToCart')}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
