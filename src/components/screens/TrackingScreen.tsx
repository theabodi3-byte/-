import { useState, useEffect } from 'react';
import { ArrowLeft, Phone, MessageSquare, Check, Bike, Coffee, Home, Navigation, Clock, Star, RefreshCw } from 'lucide-react';
import { OrderStatus, Language } from '../../types';

interface TrackingScreenProps {
  order: OrderStatus;
  lang: Language;
  onBackToHome: () => void;
}

export function TrackingScreen({ order, lang, onBackToHome }: TrackingScreenProps) {
  const isAr = lang === 'ar';
  const [currentStep, setCurrentStep] = useState(order.currentStep || 2);
  const [etaMinutes, setEtaMinutes] = useState(14);

  // Periodic ETA countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      titleAr: 'تم تأكيد الطلب',
      titleEn: 'Order Confirmed',
      descAr: 'تم استلام طلبك وجار إرساله للمحمصة',
      descEn: 'Your order was received by the roastery',
      icon: Check,
    },
    {
      titleAr: 'جاري التحضير واستخلاص القهوة',
      titleEn: 'Brewing & Baking',
      descAr: 'الباريستا يحضر مشروباتك بعناية فائقة',
      descEn: 'Master barista is crafting your order',
      icon: Coffee,
    },
    {
      titleAr: 'المندوب في الطريق إليك',
      titleEn: 'Out for Delivery',
      descAr: 'الطلب بحوزة الكابتن وفي اتجاه موقعك',
      descEn: 'Driver has picked up and is en route',
      icon: Bike,
    },
    {
      titleAr: 'تم التسليم بالعافية',
      titleEn: 'Delivered',
      descAr: 'نتمنى لك تجربة ممتعة ولذيذة',
      descEn: 'Order delivered, enjoy your coffee!',
      icon: Home,
    },
  ];

  const handleSimulateNextStep = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0));
  };

  return (
    <div id="tracking-screen" className="pb-24 text-neutral-900 bg-neutral-50/70 min-h-full">
      {/* Top Header */}
      <div className="bg-white px-5 pt-4 pb-3 border-b border-neutral-200/80 sticky top-0 z-10 flex items-center justify-between">
        <button
          id="tracking-back-home"
          onClick={onBackToHome}
          className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 active:scale-95 transition-all"
          title={isAr ? 'الرئيسية' : 'Home'}
        >
          <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </button>
        <div className="text-center">
          <span className="text-[10px] uppercase font-bold text-amber-600 block">{isAr ? 'تتبع مباشر' : 'Live Tracking'}</span>
          <h1 className="text-xs font-bold text-neutral-900">{order.orderNumber}</h1>
        </div>
        <button
          onClick={handleSimulateNextStep}
          className="text-[10px] font-bold text-neutral-500 hover:text-amber-700 bg-neutral-100 px-2 py-1 rounded-lg flex items-center gap-1"
          title={isAr ? 'محاكاة تقدم المرحلة' : 'Simulate step progress'}
        >
          <RefreshCw className="w-3 h-3" />
          <span>{isAr ? 'تقدم' : 'Step'}</span>
        </button>
      </div>

      {/* Simulated Live Route Map with Realistic Streets and Marker */}
      <div className="relative h-56 bg-neutral-900 overflow-hidden">
        {/* Real city map imagery overlay */}
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
          alt="Live Delivery Map"
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity filter contrast-125"
        />
        {/* Map Grid and Route Line Simulation */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-amber-400 fill-none">
          <path
            d="M 60 180 Q 150 90 240 120 T 360 60"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
        </svg>

        {/* Courier Pin */}
        <div className="absolute top-[35%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
              <Bike className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-600 rotate-45"></span>
          </div>
          <span className="bg-neutral-900/90 text-amber-300 text-[9px] font-extrabold px-2 py-0.5 rounded-full mt-1.5 shadow-md">
            {order.driver.nameAr.split(' ')[0]}
          </span>
        </div>

        {/* Destination Pin */}
        <div className="absolute top-[20%] left-[85%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
            <Home className="w-4 h-4" />
          </div>
          <span className="bg-neutral-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 shadow-md">
            {isAr ? 'بيتك' : 'Home'}
          </span>
        </div>

        {/* Floating ETA Pill */}
        <div className="absolute bottom-3 left-4 right-4 bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-neutral-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 block">{isAr ? 'الوقت المتوقع للوصول' : 'Estimated Arrival'}</span>
              <span className="text-xs font-black text-neutral-900">{etaMinutes} {isAr ? 'دقيقة' : 'mins'} ({order.estimatedDeliveryTime})</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
            {isAr ? 'في الموعد' : 'On Time'}
          </span>
        </div>
      </div>

      <div className="px-5 pt-4 space-y-4">
        {/* Driver Card with direct avatar image */}
        <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/60 shadow-xs shrink-0">
              <img
                src={order.driver.avatarUrl}
                alt={isAr ? order.driver.nameAr : order.driver.nameEn}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-bold text-neutral-900">
                  {isAr ? order.driver.nameAr : order.driver.nameEn}
                </h3>
                <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{order.driver.rating}</span>
                </div>
              </div>
              <p className="text-[10px] text-neutral-500 mt-0.5">{order.driver.vehicle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${order.driver.phone}`}
              className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 active:scale-95 transition-all shadow-xs"
              title={isAr ? 'اتصال بالكابتن' : 'Call driver'}
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 active:scale-95 transition-all shadow-xs"
              title={isAr ? 'محادثة' : 'Chat'}
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Step Progress Timeline */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
          <h3 className="text-xs font-bold text-neutral-900 mb-3">{isAr ? 'مراحل الطلب' : 'Order Progress'}</h3>
          <div className="space-y-4 relative before:absolute before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200 before:right-4 rtl:before:right-4 ltr:before:left-4">
            {steps.map((step, idx) => {
              const isCompleted = idx <= currentStep;
              const isCurrent = idx === currentStep;
              const IconComp = step.icon;

              return (
                <div key={idx} className="relative flex items-start gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 shrink-0 transition-all ${
                      isCompleted
                        ? isCurrent
                          ? 'bg-amber-500 text-neutral-950 ring-4 ring-amber-100 font-bold scale-105'
                          : 'bg-emerald-600 text-white font-bold'
                        : 'bg-neutral-100 text-neutral-400 border border-neutral-300'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-xs font-bold ${
                          isCurrent ? 'text-amber-700' : isCompleted ? 'text-neutral-900' : 'text-neutral-400'
                        }`}
                      >
                        {isAr ? step.titleAr : step.titleEn}
                      </h4>
                      {isCurrent && (
                        <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                          {isAr ? 'الآن' : 'Active'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">{isAr ? step.descAr : step.descEn}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Receipt Summary */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <span className="text-xs font-bold text-neutral-900">{isAr ? 'أصناف الطلب' : 'Ordered Items'}</span>
            <span className="text-[11px] text-neutral-500">{order.placedAt}</span>
          </div>
          {order.items.map((it) => (
            <div key={it.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-neutral-100 font-bold text-[11px] flex items-center justify-center text-neutral-700">
                  {it.quantity}x
                </span>
                <span className="text-neutral-800 font-medium truncate max-w-[180px]">
                  {isAr ? it.product.nameAr : it.product.nameEn}
                </span>
              </div>
              <span className="font-semibold text-neutral-900">{it.totalPrice} {isAr ? 'ر.س' : 'SAR'}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline font-bold text-xs">
            <span className="text-neutral-800">{isAr ? 'المجموع المدفوع' : 'Total Paid'}</span>
            <span className="text-amber-700 font-black">{order.total} {isAr ? 'ر.س' : 'SAR'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
