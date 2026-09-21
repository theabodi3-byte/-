import { Smartphone, Check, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { ScreenId, Language, Product, CartItem, OrderStatus } from '../types';
import { HomeScreen } from './screens/HomeScreen';
import { DetailScreen } from './screens/DetailScreen';
import { CartScreen } from './screens/CartScreen';
import { TrackingScreen } from './screens/TrackingScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ProfileScreen } from './screens/ProfileScreen';

interface AllScreensGalleryProps {
  lang: Language;
  onSelectScreen: (screen: ScreenId) => void;
  selectedProduct: Product;
  cartItems: CartItem[];
  order: OrderStatus;
  favorites: string[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, e?: React.MouseEvent) => void;
  onToggleFavorite: (id: string, e?: React.MouseEvent) => void;
  onAddToCartWithOptions: (p: Product, s: 'sm' | 'md' | 'lg', o: any[], t: 'hot' | 'iced', q: number) => void;
  onUpdateQuantity: (id: string, q: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  onToggleLanguage: () => void;
}

export function AllScreensGallery({
  lang,
  onSelectScreen,
  selectedProduct,
  cartItems,
  order,
  favorites,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  onAddToCartWithOptions,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onToggleLanguage,
}: AllScreensGalleryProps) {
  const isAr = lang === 'ar';

  const screens = [
    {
      id: 'home' as ScreenId,
      number: '01',
      titleAr: 'الشاشة 1: الرئيسية والاستكشاف',
      titleEn: 'Screen 1: Home & Discovery',
      descAr: 'عرض المنتجات الأكثر طلباً، القصص السريعة، التصنيفات والبحث والترشيح مع ربط الصور المباشر.',
      descEn: 'Featured signature picks, story highlights, category filters, and live search with direct image links.',
      render: (
        <HomeScreen
          lang={lang}
          onSelectProduct={(p) => {
            onSelectProduct(p);
            onSelectScreen('detail');
          }}
          onAddToCart={onAddToCart}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onOpenCart={() => onSelectScreen('cart')}
        />
      ),
    },
    {
      id: 'detail' as ScreenId,
      number: '02',
      titleAr: 'الشاشة 2: تفاصيل الصنف والتخصيص',
      titleEn: 'Screen 2: Product Customization',
      descAr: 'صورة الصنف عالية الدقة، خيارات الأحجام، نوع الحليب والإضافات وحساب السعر الديناميكي.',
      descEn: 'Hero product photography, cup sizing, milk preference, custom add-ons, and dynamic pricing.',
      render: (
        <DetailScreen
          product={selectedProduct}
          lang={lang}
          onBack={() => onSelectScreen('home')}
          onAddToCartWithOptions={onAddToCartWithOptions}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ),
    },
    {
      id: 'cart' as ScreenId,
      number: '03',
      titleAr: 'الشاشة 3: سلة المشتريات وتأكيد الطلب',
      titleEn: 'Screen 3: Cart & Checkout',
      descAr: 'قائمة الأصناف المختارة، كود الخصم، طرق الدفع المتعددة (Apple Pay، مدى) وملخص الفاتورة.',
      descEn: 'Selected item summaries, discount coupon codes, payment gateways, and comprehensive totals.',
      render: (
        <CartScreen
          items={cartItems}
          lang={lang}
          onBack={() => onSelectScreen('home')}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onCheckout={() => {
            onCheckout();
            onSelectScreen('tracking');
          }}
          onBrowseMenu={() => onSelectScreen('home')}
        />
      ),
    },
    {
      id: 'tracking' as ScreenId,
      number: '04',
      titleAr: 'الشاشة 4: التتبع المباشر للطلب',
      titleEn: 'Screen 4: Live Order Tracking',
      descAr: 'خريطة المحاكاة التفاعلية، مسار المندوب، بطاقة الكابتن مع صورته، والخط الزمني للمراحل.',
      descEn: 'Interactive delivery route simulation, driver card with portrait, and live phase progress.',
      render: (
        <TrackingScreen
          order={order}
          lang={lang}
          onBackToHome={() => onSelectScreen('home')}
        />
      ),
    },
    {
      id: 'favorites' as ScreenId,
      number: '05',
      titleAr: 'الشاشة 5: المفضلة والتصنيف السريع',
      titleEn: 'Screen 5: Saved Favorites',
      descAr: 'قائمة الأصناف المحفوظة مع إمكانية التصفية بضغطة زر وإعادة الطلب الفوري.',
      descEn: 'Wishlist items with category tags, instant reorder button, and rating tags.',
      render: (
        <FavoritesScreen
          favorites={favorites}
          lang={lang}
          onBack={() => onSelectScreen('home')}
          onSelectProduct={(p) => {
            onSelectProduct(p);
            onSelectScreen('detail');
          }}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onClearFavorites={() => {}}
        />
      ),
    },
    {
      id: 'profile' as ScreenId,
      number: '06',
      titleAr: 'الشاشة 6: الملف الشخصي والمكافآت',
      titleEn: 'Screen 6: Profile & Loyalty Card',
      descAr: 'بطاقة الولاء الرقمية مع طوابع الأكواب، سجل الطلبات، إعدادات اللغة والإشعارات.',
      descEn: 'Digital loyalty coffee stamp tracker, order archives, multilingual and account settings.',
      render: (
        <ProfileScreen
          lang={lang}
          onToggleLanguage={onToggleLanguage}
          onOpenOrders={() => onSelectScreen('tracking')}
        />
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Gallery Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'معرض شاشات التطبيق المتكامل' : 'Complete App Screens Showcase'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
          {isAr ? 'استعراض جميع شاشات التطبيق جنبًا إلى جنب' : 'All Application Screens Side-by-Side'}
        </h2>
        <p className="text-sm text-neutral-400">
          {isAr
            ? 'تصميم متقن يشمل شاشات الاستكشاف، التفاصيل، السلة، التتبع المباشر، المفضلة، وبطاقة الولاء مع ربط الصور عالي الدقة.'
            : 'Explore each screen component independently. Click "Open Screen" to inspect or interact directly in the phone frame.'}
        </p>
      </div>

      {/* Grid of All Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {screens.map((screen) => (
          <div
            key={screen.id}
            className="flex flex-col bg-neutral-900/90 rounded-3xl border border-neutral-800 p-5 shadow-xl hover:border-amber-500/50 transition-all duration-300"
          >
            {/* Screen Header Info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-500 text-neutral-950 font-black text-xs flex items-center justify-center">
                  {screen.number}
                </span>
                <h3 className="text-sm font-bold text-white">
                  {isAr ? screen.titleAr : screen.titleEn}
                </h3>
              </div>
              <button
                onClick={() => onSelectScreen(screen.id)}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-400/10 hover:bg-amber-400/20 px-2.5 py-1 rounded-lg transition-colors"
              >
                <span>{isAr ? 'فتح الشاشة' : 'Open Screen'}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-neutral-400 mb-4 line-clamp-2 min-h-[32px]">
              {isAr ? screen.descAr : screen.descEn}
            </p>

            {/* Mini Phone Frame Window */}
            <div className="w-full bg-neutral-950 rounded-2xl p-2 border border-neutral-800 shadow-inner flex-1 flex flex-col">
              {/* Mini Status Bar */}
              <div className="h-6 px-3 flex items-center justify-between text-neutral-400 text-[9px] font-mono border-b border-neutral-800/80">
                <span>09:41</span>
                <div className="w-12 h-2.5 bg-neutral-900 rounded-full"></div>
                <span>5G 100%</span>
              </div>

              {/* Contained Screen Canvas */}
              <div className="h-[460px] overflow-y-auto rounded-xl bg-white text-neutral-900 mt-2 relative no-scrollbar">
                {screen.render}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
