import { useState, useEffect } from 'react';
import { Home, Heart, ShoppingBag, Bike, User, Wifi, BatteryMedium, Signal } from 'lucide-react';
import { ScreenId, Language } from '../types';

interface PhoneFrameProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  cartCount: number;
  lang: Language;
  children: React.ReactNode;
}

export function PhoneFrame({
  activeScreen,
  onNavigate,
  cartCount,
  lang,
  children,
}: PhoneFrameProps) {
  const isAr = lang === 'ar';
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: ScreenId; labelAr: string; labelEn: string; icon: typeof Home }[] = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home', icon: Home },
    { id: 'favorites', labelAr: 'المفضلة', labelEn: 'Favorites', icon: Heart },
    { id: 'cart', labelAr: 'السلة', labelEn: 'Cart', icon: ShoppingBag },
    { id: 'tracking', labelAr: 'تتبع الطلب', labelEn: 'Track', icon: Bike },
    { id: 'profile', labelAr: 'حسابي', labelEn: 'Profile', icon: User },
  ];

  return (
    <div className="relative mx-auto flex justify-center py-4 px-2 select-none">
      {/* Phone Outer Shell */}
      <div className="w-full max-w-[412px] h-[844px] bg-neutral-900 rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-4 border-neutral-800 ring-1 ring-white/20 relative flex flex-col overflow-hidden">
        {/* Phone Speaker / Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 h-6 w-28 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700/50 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-blue-950"></span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse"></div>
        </div>

        {/* Screen Inner Viewport */}
        <div className="w-full h-full bg-neutral-50 rounded-[38px] overflow-hidden flex flex-col relative">
          {/* Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-neutral-900 text-xs font-semibold z-30 shrink-0 select-none">
            <span className="text-[11px] font-mono tracking-tight font-bold">{currentTime}</span>
            <div className="flex items-center gap-1.5 text-neutral-800">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4 text-neutral-900" />
            </div>
          </div>

          {/* Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative">
            {children}
          </div>

          {/* Bottom Navigation Bar */}
          <div className="h-16 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-2 flex items-center justify-around z-30 shrink-0 shadow-lg">
            {navItems.map((tab) => {
              const isActive = activeScreen === tab.id;
              const IconComp = tab.icon;

              return (
                <button
                  key={tab.id}
                  id={`phone-nav-${tab.id}`}
                  onClick={() => onNavigate(tab.id)}
                  className={`flex flex-col items-center justify-center flex-1 py-1 transition-all relative ${
                    isActive ? 'text-amber-600 font-bold scale-105' : 'text-neutral-500 hover:text-neutral-800 font-medium'
                  }`}
                >
                  <div className="relative">
                    <IconComp className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                    {tab.id === 'cart' && cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-amber-500 text-neutral-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs border-1.5 border-white">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] mt-1 leading-none truncate max-w-[62px]">
                    {isAr ? tab.labelAr : tab.labelEn}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Home Indicator Bar */}
          <div className="h-4 bg-white flex items-center justify-center pb-1">
            <div className="w-32 h-1 bg-neutral-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
