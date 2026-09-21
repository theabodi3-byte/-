import { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, Tag, CreditCard, ShieldCheck, MapPin, ChevronRight, ShoppingBag } from 'lucide-react';
import { CartItem, Language } from '../../types';

interface CartScreenProps {
  items: CartItem[];
  lang: Language;
  onBack: () => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
  onBrowseMenu: () => void;
}

export function CartScreen({
  items,
  lang,
  onBack,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onBrowseMenu,
}: CartScreenProps) {
  const isAr = lang === 'ar';
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(10);
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponError, setCouponError] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<'apple_pay' | 'card' | 'cash'>('apple_pay');

  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = items.length > 0 ? 12 : 0;
  const currentDiscount = items.length > 0 && couponApplied ? Math.min(discountAmount, subtotal) : 0;
  const taxableAmount = Math.max(0, subtotal - currentDiscount + deliveryFee);
  const vat = Math.round(taxableAmount * 0.15 * 10) / 10;
  const total = Math.max(0, taxableAmount + vat);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'WELCOME20' || couponCode.trim().toUpperCase() === 'COFFEE10') {
      setDiscountAmount(15);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError(isAr ? 'كود الخصم غير صالح أو منتهي الصلاحية' : 'Invalid or expired discount code');
    }
  };

  return (
    <div id="cart-screen" className="pb-32 text-neutral-900 bg-neutral-50/70 min-h-full">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-3 border-b border-neutral-200/80 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button
            id="cart-back-btn"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 active:scale-95 transition-all"
            title={isAr ? 'رجوع' : 'Back'}
          >
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </button>
          <div className="text-center">
            <h1 className="text-sm font-bold text-neutral-900">{isAr ? 'سلة الطلبات' : 'My Cart'}</h1>
            <span className="text-[11px] text-neutral-500">
              {items.length} {isAr ? 'أصناف مختارة' : 'items'}
            </span>
          </div>
          <div className="w-9"></div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-16 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-100/60 border border-amber-200 flex items-center justify-center text-amber-700">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-base font-bold text-neutral-800 mb-1">
            {isAr ? 'سلة التسوق فارغة حالياً' : 'Your cart is empty'}
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto mb-6">
            {isAr
              ? 'تصفح قائمة القهوة والمخبوزات الطازجة وأضف أصنافك المفضلة لتصلك ساخنة'
              : 'Browse through our artisanal coffee and fresh bakery items to place your order'}
          </p>
          <button
            id="browse-menu-empty-btn"
            onClick={onBrowseMenu}
            className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
          >
            {isAr ? 'استكشف القائمة الآن' : 'Explore Menu'}
          </button>
        </div>
      ) : (
        <div className="px-5 pt-4 space-y-4">
          {/* Delivery Location Capsule */}
          <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                  {isAr ? 'عنوان التوصيل' : 'Delivery Address'}
                </span>
                <span className="text-xs font-bold text-neutral-800">
                  {isAr ? 'الرياض - حي النرجس، شارع عثمان' : 'Riyadh, Al Narjis, Othman St.'}
                </span>
              </div>
            </div>
            <button className="text-[11px] font-semibold text-amber-600 hover:underline">
              {isAr ? 'تغيير' : 'Change'}
            </button>
          </div>

          {/* Cart Items List */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs divide-y divide-neutral-100 overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="p-3.5 flex gap-3 items-center">
                {/* Thumbnail directly linked image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0 relative border border-neutral-200/50">
                  <img
                    src={item.product.imageUrl}
                    alt={isAr ? item.product.nameAr : item.product.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-neutral-900 truncate">
                      {isAr ? item.product.nameAr : item.product.nameEn}
                    </h3>
                    <button
                      id={`remove-item-${item.id}`}
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-400 hover:text-rose-500 p-1 transition-colors"
                      title={isAr ? 'حذف' : 'Remove'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1 text-[10px] text-neutral-500 mt-0.5">
                    <span className="bg-neutral-100 px-1.5 py-0.5 rounded">
                      {item.selectedSize === 'sm'
                        ? isAr ? 'صغير' : 'Small'
                        : item.selectedSize === 'md'
                        ? isAr ? 'وسط' : 'Regular'
                        : isAr ? 'كبير' : 'Large'}
                    </span>
                    {item.temperature && (
                      <span className="bg-neutral-100 px-1.5 py-0.5 rounded">
                        {item.temperature === 'hot' ? (isAr ? '🔥 ساخن' : '🔥 Hot') : (isAr ? '❄️ مثلج' : '❄️ Iced')}
                      </span>
                    )}
                    {item.selectedOptions.map((opt) => (
                      <span key={opt.id} className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded">
                        {isAr ? opt.nameAr : opt.nameEn}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-amber-700">
                      {item.totalPrice} {isAr ? 'ر.س' : 'SAR'}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded bg-white text-neutral-800 flex items-center justify-center hover:bg-neutral-50 shadow-2xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded bg-white text-neutral-800 flex items-center justify-center hover:bg-neutral-50 shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Code Box */}
          <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs">
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className={`w-3.5 h-3.5 absolute top-1/2 -translate-y-1/2 text-neutral-400 ${isAr ? 'right-3' : 'left-3'}`} />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder={couponApplied ? 'WELCOME20 (مفعل)' : isAr ? 'أدخل كود الخصم (جرب WELCOME20)' : 'Promo code (try WELCOME20)'}
                  className={`w-full h-9 rounded-xl border border-neutral-200 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none ${
                    isAr ? 'pr-8 pl-2' : 'pl-8 pr-2'
                  }`}
                />
              </div>
              <button
                type="submit"
                className="h-9 px-3.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 active:scale-95 transition-all"
              >
                {isAr ? 'تطبيق' : 'Apply'}
              </button>
            </form>
            {couponApplied && (
              <p className="text-[10px] text-emerald-600 font-semibold mt-1.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAr ? 'تم تطبيق خصم بقيمة 10 ر.س بنجاح!' : 'Promo code applied: 10 SAR discount!'}</span>
              </p>
            )}
            {couponError && <p className="text-[10px] text-rose-500 mt-1">{couponError}</p>}
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-neutral-900 mb-2.5">{isAr ? 'طريقة الدفع' : 'Payment Method'}</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedPayment('apple_pay')}
                className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                  selectedPayment === 'apple_pay'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                }`}
              >
                <span className="text-xs font-bold"> Pay</span>
                <span className="text-[9px] opacity-80">{isAr ? 'سريع وفوري' : 'Instant'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPayment('card')}
                className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                  selectedPayment === 'card'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[10px] font-bold">{isAr ? 'بطاقة مدى / ائتمان' : 'Card / Mada'}</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPayment('cash')}
                className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                  selectedPayment === 'cash'
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                    : 'border-neutral-200 bg-neutral-50 text-neutral-700'
                }`}
              >
                <span className="text-xs">💵</span>
                <span className="text-[10px] font-bold">{isAr ? 'عند الاستلام' : 'Cash'}</span>
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>{isAr ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span className="font-semibold">{subtotal} {isAr ? 'ر.س' : 'SAR'}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>{isAr ? 'رسوم التوصيل' : 'Delivery Fee'}</span>
              <span className="font-semibold">{deliveryFee} {isAr ? 'ر.س' : 'SAR'}</span>
            </div>
            {currentDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>{isAr ? 'خصم قسيمة الشراء' : 'Voucher Discount'}</span>
                <span>-{currentDiscount} {isAr ? 'ر.س' : 'SAR'}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-500 text-[11px]">
              <span>{isAr ? 'ضريبة القيمة المضافة (15%)' : 'VAT (15%)'}</span>
              <span>{vat} {isAr ? 'ر.س' : 'SAR'}</span>
            </div>
            <div className="pt-2 border-t border-neutral-100 flex justify-between items-baseline font-bold text-sm text-neutral-900">
              <span>{isAr ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
              <span className="text-base text-amber-700">{total} {isAr ? 'ر.س' : 'SAR'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Checkout Button */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 p-4 px-5 z-30 shadow-lg">
          <div className="max-w-md mx-auto">
            <button
              id="submit-checkout-btn"
              onClick={onCheckout}
              className="w-full h-12 bg-amber-500 hover:bg-amber-400 active:scale-98 text-neutral-950 rounded-xl font-extrabold text-xs flex items-center justify-between px-5 transition-all shadow-md"
            >
              <span>{isAr ? 'تأكيد وإتمام الطلب' : 'Confirm & Place Order'}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{total} {isAr ? 'ر.س' : 'SAR'}</span>
                <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
