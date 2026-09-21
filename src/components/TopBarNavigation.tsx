import { Smartphone, LayoutGrid, Maximize2, Globe, ShoppingBag, Sparkles } from 'lucide-react';
import { ScreenId, ViewMode, Language } from '../types';

interface TopBarNavigationProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  lang: Language;
  onToggleLanguage: () => void;
  cartCount: number;
}

export function TopBarNavigation({
  activeScreen,
  onSelectScreen,
  viewMode,
  onChangeViewMode,
  lang,
  onToggleLanguage,
  cartCount,
}: TopBarNavigationProps) {
  const isAr = lang === 'ar';

  const screens: { id: ScreenId; labelAr: string; labelEn: string }[] = [
    { id: 'home', labelAr: '1. الرئيسية', labelEn: '1. Home' },
    { id: 'detail', labelAr: '2. تفاصيل الصنف', labelEn: '2. Item Details' },
    { id: 'cart', labelAr: '3. السلة والدفع', labelEn: '3. Cart & Pay' },
    { id: 'tracking', labelAr: '4. تتبع الطلب', labelEn: '4. Live Tracking' },
    { id: 'favorites', labelAr: '5. المفضلة', labelEn: '5. Favorites' },
    { id: 'profile', labelAr: '6. الملف الشخصي', labelEn: '6. Profile' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & App Branding */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 font-black shadow-md shadow-amber-500/20 text-lg">
              ☕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-white">
                  {isAr ? 'تطبيق الشاشات الذكي' : 'App Screens Studio'}
                </span>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  v2.0
                </span>
              </div>
              <span className="text-[11px] text-neutral-400 block -mt-0.5">
                {isAr ? 'شاشات متعددة • ربط مباشر للصور' : 'Multi-Screen Prototype • Direct HTML Images'}
              </span>
            </div>
          </div>

          {/* Screen Quick Tabs (Hidden on very small screens, scrollable on medium) */}
          <div className="hidden lg:flex items-center gap-1 bg-neutral-900/90 p-1 rounded-xl border border-neutral-800">
            {screens.map((sc) => {
              const isActive = activeScreen === sc.id && viewMode !== 'all-screens';
              return (
                <button
                  key={sc.id}
                  id={`top-tab-${sc.id}`}
                  onClick={() => {
                    onSelectScreen(sc.id);
                    if (viewMode === 'all-screens') {
                      onChangeViewMode('phone');
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 shadow-xs'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                  }`}
                >
                  {isAr ? sc.labelAr : sc.labelEn}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls: View Modes & Language */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              <button
                id="view-mode-phone"
                onClick={() => onChangeViewMode('phone')}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'phone'
                    ? 'bg-amber-500 text-neutral-950 shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title={isAr ? 'عرض إطار الهاتف' : 'Phone Frame View'}
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">{isAr ? 'هاتف' : 'Phone'}</span>
              </button>

              <button
                id="view-mode-all-screens"
                onClick={() => onChangeViewMode('all-screens')}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'all-screens'
                    ? 'bg-amber-500 text-neutral-950 shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title={isAr ? 'عرض كل الشاشات جنباً إلى جنب' : 'All Screens Showcase'}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">{isAr ? 'كل الشاشات' : 'All Screens'}</span>
              </button>

              <button
                id="view-mode-fullscreen"
                onClick={() => onChangeViewMode('fullscreen')}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'fullscreen'
                    ? 'bg-amber-500 text-neutral-950 shadow-xs'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title={isAr ? 'عرض الشاشة كاملة' : 'Expanded View'}
              >
                <Maximize2 className="w-4 h-4" />
                <span className="hidden sm:inline">{isAr ? 'موسع' : 'Expanded'}</span>
              </button>
            </div>

            {/* Language Toggle */}
            <button
              id="language-toggle-btn"
              onClick={onToggleLanguage}
              className="h-9 px-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-all active:scale-95"
              title={isAr ? 'تغيير اللغة إلى الإنجليزية' : 'Switch to Arabic'}
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? 'EN' : 'عربي'}</span>
            </button>

            {/* Quick Cart Button */}
            <button
              id="top-cart-quick-btn"
              onClick={() => {
                onSelectScreen('cart');
                if (viewMode === 'all-screens') onChangeViewMode('phone');
              }}
              className="h-9 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-extrabold flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Mobile Screen Tabs (Visible on small screens) */}
        <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 border-t border-neutral-900">
          {screens.map((sc) => {
            const isActive = activeScreen === sc.id && viewMode !== 'all-screens';
            return (
              <button
                key={sc.id}
                onClick={() => {
                  onSelectScreen(sc.id);
                  if (viewMode === 'all-screens') onChangeViewMode('phone');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-neutral-950'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                {isAr ? sc.labelAr : sc.labelEn}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
