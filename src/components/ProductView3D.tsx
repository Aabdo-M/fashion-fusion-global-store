
/**
 * Este componente simula la visualización 3D de productos
 * 
 * En un entorno real, esto se implementaría con Three.js o una biblioteca similar
 * para mostrar modelos 3D interactivos.
 */
import { useState } from "react";
import { Product } from "@/types";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "./ui/button";
import { RotateCw } from "lucide-react";

interface ProductView3DProps {
  product: Product;
}

export function ProductView3D({ product }: ProductView3DProps) {
  const { t } = useLanguage();
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  
  // Simulamos cambiar el ángulo de visualización del producto
  const rotateProduct = () => {
    setIsRotating(true);
    
    // Simular una rotación automática
    let angle = currentAngle;
    const interval = setInterval(() => {
      angle = (angle + 15) % 360;
      setCurrentAngle(angle);
      
      if (angle === 0) {
        clearInterval(interval);
        setIsRotating(false);
      }
    }, 100);
  };
  
  // Aplicamos una transformación CSS para simular la rotación
  const rotateStyle = {
    transform: `rotateY(${currentAngle}deg)`,
    transition: isRotating ? 'transform 0.1s ease-in-out' : 'none'
  };

  return (
    <div className="relative border rounded-lg overflow-hidden bg-gray-50 aspect-square">
      <div 
        className="w-full h-full flex items-center justify-center perspective-1000" 
        style={{ perspective: '1000px' }}
      >
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="object-contain max-h-full max-w-full"
          style={rotateStyle}
        />
      </div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Button 
          onClick={rotateProduct} 
          variant="secondary" 
          className="rounded-full" 
          disabled={isRotating}
        >
          <RotateCw className="h-5 w-5 mr-2" />
          {t('viewDetails')}
        </Button>
      </div>
      
      <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 rounded-md text-xs font-medium">
        3D View
      </div>
    </div>
  );
}
