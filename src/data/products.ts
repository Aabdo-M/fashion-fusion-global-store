
import { Product } from '@/types';

// Sample product data - in a real app this would come from a database
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    description: 'High-quality cotton t-shirt with a comfortable fit. Perfect for everyday wear.',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    is3D: false,
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy'],
    stock: 100,
    featured: true,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    id: '2',
    name: 'Designer Denim Jacket',
    description: 'Stylish denim jacket with modern detailing. A perfect layering piece for any season.',
    price: 79.99,
    salePrice: 59.99,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=800&q=80'
    ],
    is3D: true,
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blue', 'Black'],
    stock: 50,
    featured: true,
    isNewArrival: false,
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Classic Leather Sneakers',
    description: 'Timeless leather sneakers that combine comfort and style. Perfect for casual outings.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    ],
    is3D: true,
    category: 'men',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['White', 'Black', 'Brown'],
    stock: 75,
    featured: false,
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Floral Summer Dress',
    description: 'Light and airy summer dress with a beautiful floral pattern. Perfect for warm days.',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    is3D: false,
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blue', 'Pink'],
    stock: 60,
    featured: true,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    id: '5',
    name: 'Kids Colorful Hoodie',
    description: 'Vibrant and comfortable hoodie for kids. Made with soft, durable fabric.',
    price: 34.99,
    salePrice: 29.99,
    images: [
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560506840-ec192b25ff32?auto=format&fit=crop&w=800&q=80'
    ],
    is3D: false,
    category: 'kids',
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
    colors: ['Red', 'Blue', 'Green'],
    stock: 40,
    featured: false,
    isNewArrival: true,
    isBestSeller: false
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    description: 'Stylish sunglasses with UV protection. Add a touch of elegance to any outfit.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ],
    is3D: true,
    category: 'accessories',
    colors: ['Black', 'Tortoise', 'Gold'],
    stock: 30,
    featured: true,
    isNewArrival: false,
    isBestSeller: true
  }
];

// Helper functions to get different types of products
export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getNewArrivals = () => products.filter(p => p.isNewArrival);
export const getBestSellers = () => products.filter(p => p.isBestSeller);
export const getProductsByCategory = (category: 'men' | 'women' | 'kids' | 'accessories') => 
  products.filter(p => p.category === category);
export const getProductById = (id: string) => products.find(p => p.id === id);
