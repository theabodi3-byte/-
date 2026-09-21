import { useState, useEffect } from 'react';
import { ScreenId, ViewMode, Language, Product, CartItem, OrderStatus, ProductOption } from './types';
import { PRODUCTS, INITIAL_ORDER } from './data/mockData';
import { TopBarNavigation } from './components/TopBarNavigation';
import { PhoneFrame } from './components/PhoneFrame';
import { AllScreensGallery } from './components/AllScreensGallery';
import { HomeScreen } from './components/screens/HomeScreen';
import { DetailScreen } from './components/screens/DetailScreen';
import { CartScreen } from './components/screens/CartScreen';
import { TrackingScreen } from './components/screens/TrackingScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { CheckCircle2, ShoppingBag, Eye, Smartphone, LayoutGrid } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('phone');
  const [lang, setLang] = useState<Language>('ar');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_ORDER.items);
  const [order, setOrder] = useState<OrderStatus>(INITIAL_ORDER);
  const [favorites, setFavorites] = useState<string[]>(['p1', 'p3']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isAr = lang === 'ar';

  // Synchronize document direction and lang
  useEffect(() => {
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = isAr ? 'ar' : 'en';
  }, [isAr]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleToggleFavorite = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
      showToast(isAr ? 'تمت الإزالة من المفضلة' : 'Removed from favorites');
    } else {
      setFavorites([...favorites, productId]);
      showToast(isAr ? 'تم الحفظ في المفضلة ❤️' : 'Saved to favorites ❤️');
    }
  };

  const handleQuickAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const defaultSize = product.sizes[0];
    const existingIndex = cartItems.findIndex(
      (it) => it.productId === product.id && it.selectedSize === defaultSize.id && it.selectedOptions.length === 0
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].totalPrice = (product.price + defaultSize.priceOffset) * updated[existingIndex].quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        product,
        selectedSize: defaultSize.id,
        selectedOptions: [],
        temperature: product.category.includes('drink') || product.category.includes('coffee') ? 'hot' : undefined,
        quantity: 1,
        totalPrice: product.price + defaultSize.priceOffset,
      };
      setCartItems([...cartItems, newItem]);
    }

    showToast(
      isAr
        ? `تمت إضافة "${product.nameAr}" إلى السلة 🛍️`
        : `Added "${product.nameEn}" to cart 🛍️`
    );
  };

  const handleAddToCartWithOptions = (
    product: Product,
    sizeId: 'sm' | 'md' | 'lg',
    selectedOptions: ProductOption[],
    temperature: 'hot' | 'iced',
    quantity: number
  ) => {
    const sizeObj = product.sizes.find((s) => s.id === sizeId) || product.sizes[0];
    const optionsTotal = selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
    const unitPrice = product.price + sizeObj.priceOffset + optionsTotal;

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: product.id,
      product,
      selectedSize: sizeId,
      selectedOptions,
      temperature,
      quantity,
      totalPrice: unitPrice * quantity,
    };

    setCartItems([...cartItems, newItem]);
    showToast(
      isAr
        ? `تمت إضافة "${product.nameAr}" بتخصيصاتك إلى السلة!`
        : `Added "${product.nameEn}" with customizations to cart!`
    );
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems(
      cartItems.map((item) => {
        if (item.id === cartItemId) {
          const unitPrice = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            totalPrice: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(cartItems.filter((i) => i.id !== cartItemId));
    showToast(isAr ? 'تم حذف الصنف من السلة' : 'Item removed from cart');
  };

  const handleCheckout = () => {
    const subtotal = cartItems.reduce((acc, it) => acc + it.totalPrice, 0);
    const deliveryFee = 12;
    const discount = 10;
    const taxable = Math.max(0, subtotal - discount + deliveryFee);
    const vat = Math.round(taxable * 0.15 * 10) / 10;
    const total = taxable + vat;

    const newOrder: OrderStatus = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      orderNumber: `#CR-${Math.floor(10000 + Math.random() * 90000)}`,
      placedAt: isAr ? 'الآن (قبل لحظات)' : 'Just now',
      estimatedDeliveryTime: '15 - 20 دقيقة',
      currentStep: 1, // Brewing & Preparing
      items: [...cartItems],
      subtotal,
      deliveryFee,
      discount,
      tax: vat,
      total,
      paymentMethod: 'apple_pay',
      driver: {
        nameAr: 'عبدالرحمن الشهري',
        nameEn: 'Abdulrahman Al-Shehri',
        phone: '+966 55 123 4567',
        rating: 4.95,
        vehicle: 'تويوتا كورولا فضية (أ ب ج 4920)',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
    };

    setOrder(newOrder);
    setActiveScreen('tracking');
    showToast(isAr ? 'تم استلام طلبك بنجاح وجارٍ التحضير! 🎉' : 'Order placed successfully! 🎉');
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Screen renderer helper for single view
  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'home':
        return (
          <HomeScreen
            lang={lang}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setActiveScreen('detail');
            }}
            onAddToCart={handleQuickAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenCart={() => setActiveScreen('cart')}
          />
        );
      case 'detail':
        return (
          <DetailScreen
            product={selectedProduct}
            lang={lang}
            onBack={() => setActiveScreen('home')}
            onAddToCartWithOptions={handleAddToCartWithOptions}
            isFavorite={favorites.includes(selectedProduct.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        );
      case 'cart':
        return (
          <CartScreen
            items={cartItems}
            lang={lang}
            onBack={() => setActiveScreen('home')}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onBrowseMenu={() => setActiveScreen('home')}
          />
        );
      case 'tracking':
        return (
          <TrackingScreen
            order={order}
            lang={lang}
            onBackToHome={() => setActiveScreen('home')}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            favorites={favorites}
            lang={lang}
            onBack={() => setActiveScreen('home')}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setActiveScreen('detail');
            }}
            onAddToCart={handleQuickAddToCart}
            onToggleFavorite={handleToggleFavorite}
            onClearFavorites={() => {
              setFavorites([]);
              showToast(isAr ? 'تم مسح قائمة المفضلة' : 'Favorites cleared');
            }}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            lang={lang}
            onToggleLanguage={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            onOpenOrders={() => setActiveScreen('tracking')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Studio Navigation Bar */}
      <TopBarNavigation
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        lang={lang}
        onToggleLanguage={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        cartCount={totalCartCount}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col justify-center py-6 px-4">
        {viewMode === 'all-screens' ? (
          <AllScreensGallery
            lang={lang}
            onSelectScreen={(screenId) => {
              setActiveScreen(screenId);
              setViewMode('phone');
            }}
            selectedProduct={selectedProduct}
            cartItems={cartItems}
            order={order}
            favorites={favorites}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleQuickAddToCart}
            onToggleFavorite={handleToggleFavorite}
            onAddToCartWithOptions={handleAddToCartWithOptions}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            onToggleLanguage={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          />
        ) : viewMode === 'fullscreen' ? (
          <div className="max-w-xl mx-auto w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-800 text-neutral-900 min-h-[750px] relative flex flex-col">
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {renderScreenContent()}
            </div>
          </div>
        ) : (
          /* Default Phone Frame View */
          <div className="flex flex-col items-center justify-center">
            {/* Quick Screen Switcher Chips right above the phone */}
            <div className="mb-4 flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 p-1.5 rounded-2xl max-w-md w-full justify-around text-xs shadow-md">
              <button
                onClick={() => setActiveScreen('home')}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                  activeScreen === 'home' ? 'bg-amber-500 text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isAr ? 'الرئيسية' : 'Home'}
              </button>
              <button
                onClick={() => setActiveScreen('detail')}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                  activeScreen === 'detail' ? 'bg-amber-500 text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isAr ? 'التفاصيل' : 'Details'}
              </button>
              <button
                onClick={() => setActiveScreen('cart')}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all relative ${
                  activeScreen === 'cart' ? 'bg-amber-500 text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span>{isAr ? 'السلة' : 'Cart'}</span>
                {totalCartCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 bg-amber-600 text-white rounded-full text-[9px]">
                    {totalCartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveScreen('tracking')}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                  activeScreen === 'tracking' ? 'bg-amber-500 text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isAr ? 'التتبع' : 'Tracking'}
              </button>
              <button
                onClick={() => setActiveScreen('favorites')}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                  activeScreen === 'favorites' ? 'bg-amber-500 text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isAr ? 'المفضلة' : 'Favorites'}
              </button>
              <button
                onClick={() => setActiveScreen('profile')}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all ${
                  activeScreen === 'profile' ? 'bg-amber-500 text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isAr ? 'الحساب' : 'Profile'}
              </button>
            </div>

            {/* Realistic Smartphone Enclosure */}
            <PhoneFrame
              activeScreen={activeScreen}
              onNavigate={setActiveScreen}
              cartCount={totalCartCount}
              lang={lang}
            >
              {renderScreenContent()}
            </PhoneFrame>
          </div>
        )}
      </main>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/95 text-white border border-neutral-700/80 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
