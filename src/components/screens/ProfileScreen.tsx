import { useState } from 'react';
import { Award, Gift, ChevronRight, Clock, MapPin, Bell, Globe, Moon, Sun, HelpCircle, LogOut, Coffee } from 'lucide-react';
import { Language } from '../../types';

interface ProfileScreenProps {
  lang: Language;
  onToggleLanguage: () => void;
  onOpenOrders: () => void;
}

export function ProfileScreen({ lang, onToggleLanguage, onOpenOrders }: ProfileScreenProps) {
  const isAr = lang === 'ar';
  const [stampsCount] = useState(5); // 5 out of 8 collected cups
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div id="profile-screen" className="pb-24 text-neutral-900 bg-neutral-50/70 min-h-full">
      {/* Top Header Card */}
      <div className="bg-white px-5 pt-5 pb-6 border-b border-neutral-200/80">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-neutral-900">
                {isAr ? 'عبدالله محمد السالم' : 'Abdullah M. Al-Salem'}
              </h1>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {isAr ? 'عضو ذهبي' : 'Gold Tier'}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5 font-mono dir-ltr text-right rtl:text-right ltr:text-left">
              theabodi3@gmail.com
            </p>
            <span className="text-[11px] text-amber-700 font-semibold block mt-1">
              {isAr ? 'عضو منذ أكتوبر 2023' : 'Member since Oct 2023'}
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* Digital Loyalty Stamp Card */}
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-amber-950 rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {isAr ? 'بطاقة الولاء والمكافآت' : 'Loyalty Coffee Card'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-300">
                {stampsCount}/8 {isAr ? 'أكواب' : 'cups'}
              </span>
            </div>

            <p className="text-xs text-neutral-300 mb-3">
              {isAr
                ? 'اجمع 8 أختام قهوة واحصل على كوبك التاسع مجاناً بأي حجم وإضافات'
                : 'Collect 8 stamps to unlock your 9th specialty drink on us!'}
            </p>

            {/* 8 Cups visual stamps */}
            <div className="grid grid-cols-8 gap-1.5 bg-black/30 p-2 rounded-xl border border-white/10">
              {Array.from({ length: 8 }).map((_, idx) => {
                const isStamped = idx < stampsCount;
                const isFreeCup = idx === 7;
                return (
                  <div
                    key={idx}
                    className={`aspect-square rounded-lg flex items-center justify-center transition-all ${
                      isStamped
                        ? 'bg-amber-400 text-neutral-950 font-black shadow-xs'
                        : isFreeCup
                        ? 'border border-dashed border-amber-400/80 text-amber-300 bg-amber-400/10'
                        : 'bg-white/10 text-white/30'
                    }`}
                  >
                    {isStamped ? (
                      <Coffee className="w-3.5 h-3.5" />
                    ) : isFreeCup ? (
                      <Gift className="w-3.5 h-3.5 animate-bounce" />
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Menu Options */}
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs divide-y divide-neutral-100 overflow-hidden text-xs">
          <button
            onClick={onOpenOrders}
            className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-right rtl:text-right ltr:text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-neutral-900 block">{isAr ? 'سجل الطلبات السابقة' : 'Order History'}</span>
                <span className="text-[10px] text-neutral-400">{isAr ? 'عرض الطلبات وإعادة الطلب بضغطة زر' : 'Review & 1-click reorder'}</span>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-neutral-400 ${isAr ? 'rotate-180' : ''}`} />
          </button>

          <div className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-neutral-900 block">{isAr ? 'العناوين المحفوظة' : 'Saved Addresses'}</span>
                <span className="text-[10px] text-neutral-400">{isAr ? 'المنزل، العمل، الاستراحة' : 'Home, Office, Studio'}</span>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 text-neutral-400 ${isAr ? 'rotate-180' : ''}`} />
          </div>

          <div className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-700 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-neutral-900 block">{isAr ? 'إشعارات الطلب والعروض' : 'Notifications'}</span>
                <span className="text-[10px] text-neutral-400">{isAr ? 'تنبيهات وصول المندوب' : 'Courier updates & promos'}</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>

          <button
            onClick={onToggleLanguage}
            className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-right rtl:text-right ltr:text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-neutral-900 block">{isAr ? 'لغة التطبيق' : 'App Language'}</span>
                <span className="text-[10px] text-neutral-400">{isAr ? 'العربية (الحالية)' : 'English (Current)'}</span>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200/60">
              {isAr ? 'English' : 'العربية'}
            </span>
          </button>
        </div>

        {/* Support Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-900 block">{isAr ? 'مركز المساعدة وخدمة العملاء' : 'Help & Customer Care'}</span>
              <span className="text-[10px] text-neutral-400">{isAr ? 'متاحون على مدار الساعة لخدمتك' : '24/7 dedicated assistance'}</span>
            </div>
          </div>
          <button className="text-xs font-bold text-amber-600 hover:underline">
            {isAr ? 'تواصل' : 'Chat'}
          </button>
        </div>

        {/* Sign out */}
        <button className="w-full py-3 rounded-2xl border border-rose-200 text-rose-600 bg-rose-50/50 hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-2 transition-colors">
          <LogOut className="w-3.5 h-3.5" />
          <span>{isAr ? 'تسجيل الخروج' : 'Sign Out'}</span>
        </button>
      </div>
    </div>
  );
}
