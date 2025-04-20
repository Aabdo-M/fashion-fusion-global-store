
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  is3D: boolean;
  category: 'men' | 'women' | 'kids' | 'accessories';
  sizes?: string[];
  colors?: string[];
  stock: number;
  featured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}
