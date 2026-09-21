export type ScreenId = 'home' | 'detail' | 'cart' | 'tracking' | 'favorites' | 'profile';

export type ViewMode = 'phone' | 'fullscreen' | 'all-screens';

export type Language = 'ar' | 'en';

export interface ProductOption {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
}

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  categoryNameAr: string;
  categoryNameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  calories: number;
  prepTimeMinutes: number;
  isPopular?: boolean;
  isNew?: boolean;
  tagsAr: string[];
  tagsEn: string[];
  sizes: {
    id: 'sm' | 'md' | 'lg';
    nameAr: string;
    nameEn: string;
    priceOffset: number;
    volume: string;
  }[];
  customizations: {
    titleAr: string;
    titleEn: string;
    options: ProductOption[];
  }[];
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedSize: 'sm' | 'md' | 'lg';
  selectedOptions: ProductOption[];
  temperature?: 'hot' | 'iced';
  quantity: number;
  totalPrice: number;
  specialInstructions?: string;
}

export interface OrderStatus {
  id: string;
  orderNumber: string;
  placedAt: string;
  estimatedDeliveryTime: string;
  currentStep: number; // 0: Placed, 1: Brewing/Preparing, 2: Out for delivery, 3: Delivered
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: 'apple_pay' | 'card' | 'cash';
  driver: {
    nameAr: string;
    nameEn: string;
    phone: string;
    rating: number;
    vehicle: string;
    avatarUrl: string;
  };
}
