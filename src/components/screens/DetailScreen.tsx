import { useState } from 'react';
import { ArrowLeft, Heart, Star, Flame, Clock, Minus, Plus, ShoppingBag, CheckCircle, Share2 } from 'lucide-react';
import { Product, ProductOption, Language } from '../../types';

interface DetailScreenProps {
  product: Product;
  lang: Language;
  onBack: () => void;
  onAddToCartWithOptions: (
    product: Product,
    sizeId: 'sm' | 'md' | 'lg',
    selectedOptions: ProductOption[],
    temperature: 'hot' | 'iced',
    quantity: number
  ) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
}

export function DetailScreen({
  product,
  lang,
  onBack,
  onAddToCartWithOptions,
  isFavorite,
  onToggleFavorite,
}: DetailScreenProps) {
  const isAr = lang === 'ar';
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedOptions, setSelectedOptions] = useState<ProductOption[]>([]);
  const [temperature, setTemperature] = useState<'hot' | 'iced'>('hot');
  const [quantity, setQuantity] = useState(1);
  const [isAddedToast, setIsAddedToast] = useState(false);

  const currentSizeObj = product.sizes.find((s) => s.id === selectedSize) || product.sizes[0];
  const sizePriceOffset = currentSizeObj?.priceOffset || 0;
  const optionsPrice = selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
  const unitPrice = product.price + sizePriceOffset + optionsPrice;
  const totalPrice = unitPrice * quantity;

  const handleToggleOption = (opt: ProductOption) => {
    if (selectedOptions.some((o) => o.id === opt.id)) {
      setSelectedOptions(selectedOptions.filter((o) => o.id !== opt.id));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  const handleAdd = () => {
    onAddToCartWithOptions(product, selectedSize, selectedOptions, temperature, quantity);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2000);
  };

  return (
    <div id="detail-screen" className="pb-28 text-neutral-900 bg-white min-h-full relative">
      {/* Top Floating Action Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <button
          id="detail-back-button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-800 hover:bg-white active:scale-95 transition-all"
          title={isAr ? 'رجوع' : 'Back'}
        >
          <ArrowLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex items-center gap-2">
          <button
            id="detail-share-button"
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-neutral-700 hover:bg-white active:scale-95 transition-all"
            title={isAr ? 'مشاركة' : 'Share'}
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            id="detail-fav-button"
            onClick={() => onToggleFavorite(product.id)}
            className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center transition-all active:scale-90 ${
              isFavorite ? 'text-rose-500' : 'text-neutral-700 hover:text-rose-500'
            }`}
            title={isAr ? 'المفضلة' : 'Favorite'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Visual Direct Image Header */}
      <div className="relative aspect-4/3 sm:aspect-16/10 w-full bg-neutral-900 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={isAr ? product.nameAr : product.nameEn}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>

        {/* Bottom tags on image */}
        <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-neutral-950 font-bold px-2.5 py-1 rounded-lg text-xs shadow-xs">
              {isAr ? product.categoryNameAr : product.categoryNameEn}
            </span>
            <span className="bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-neutral-300 text-[10px]">({product.reviewsCount})</span>
            </span>
          </div>

          <div className="flex items-center gap-3 bg-black/50 backdrop-blur-xs px-3 py-1 rounded-lg text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{product.prepTimeMinutes} {isAr ? 'دقائق' : 'min'}</span>
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{product.calories} {isAr ? 'سعرة' : 'kcal'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5 pt-4">
        {/* Title & Price Header */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h1 className="text-xl font-bold text-neutral-900 leading-tight">
              {isAr ? product.nameAr : product.nameEn}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              {isAr ? 'تحضير يدوي طازج عند كل طلب بواسطة باريستا محترف' : 'Hand-crafted fresh per order by master baristas'}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xl font-black text-amber-700 block">{unitPrice}</span>
            <span className="text-xs text-neutral-500 font-medium">{isAr ? 'ريال سعودي' : 'SAR'}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 my-3">
          {(isAr ? product.tagsAr : product.tagsEn).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/60 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="mb-5 pb-4 border-b border-neutral-100">
          <h2 className="text-xs font-bold text-neutral-800 mb-1.5">{isAr ? 'عن الصنف' : 'Description'}</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            {isAr ? product.descriptionAr : product.descriptionEn}
          </p>
        </div>

        {/* Temperature Preference (if applicable to drinks) */}
        {product.category.includes('coffee') || product.category.includes('drink') ? (
          <div className="mb-5">
            <h2 className="text-xs font-bold text-neutral-800 mb-2">{isAr ? 'درجة الحرارة' : 'Temperature'}</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTemperature('hot')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  temperature === 'hot'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-900 shadow-xs'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <span>🔥</span>
                <span>{isAr ? 'ساخن ومتبخر' : 'Hot & Steamed'}</span>
              </button>
              <button
                type="button"
                onClick={() => setTemperature('iced')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                  temperature === 'iced'
                    ? 'bg-sky-500/15 border-sky-500 text-sky-900 shadow-xs'
                    : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <span>❄️</span>
                <span>{isAr ? 'مثلج منعش' : 'Iced & Refreshing'}</span>
              </button>
            </div>
          </div>
        ) : null}

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-neutral-800">{isAr ? 'اختر الحجم' : 'Select Size'}</h2>
              <span className="text-[11px] text-neutral-500">{currentSizeObj.volume}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSize(s.id)}
                    className={`py-2.5 px-2 rounded-xl text-center border transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-200 bg-neutral-50/70 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="text-xs font-bold">{isAr ? s.nameAr : s.nameEn}</span>
                    <span className={`text-[10px] font-medium ${isSelected ? 'text-amber-300' : 'text-neutral-500'}`}>
                      {s.priceOffset > 0 ? `+${s.priceOffset} ${isAr ? 'ر.س' : 'SAR'}` : isAr ? 'السعر الأساسي' : 'Standard'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Customization Options */}
        {product.customizations && product.customizations.length > 0 && (
          <div className="space-y-4 mb-4">
            {product.customizations.map((group, gIdx) => (
              <div key={gIdx} className="bg-neutral-50/80 p-3.5 rounded-2xl border border-neutral-200/80">
                <h3 className="text-xs font-bold text-neutral-800 mb-2.5">
                  {isAr ? group.titleAr : group.titleEn}
                </h3>
                <div className="space-y-2">
                  {group.options.map((opt) => {
                    const isChecked = selectedOptions.some((o) => o.id === opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleToggleOption(opt)}
                        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-amber-500/10 border-amber-500/60 text-neutral-900'
                            : 'bg-white border-neutral-200/80 text-neutral-700 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                            isChecked ? 'bg-amber-500 border-amber-500 text-white' : 'border-neutral-300 bg-white'
                          }`}>
                            {isChecked && <CheckCircle className="w-3.5 h-3.5" />}
                          </div>
                          <span>{isAr ? opt.nameAr : opt.nameEn}</span>
                        </div>
                        <span className="text-xs font-bold text-amber-700">
                          +{opt.price} {isAr ? 'ر.س' : 'SAR'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Bottom Add-to-Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 p-4 px-5 z-30 shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* Quantity Counter */}
          <div className="flex items-center bg-neutral-100 rounded-xl p-1 border border-neutral-200/80">
            <button
              id="decrease-quantity-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-white text-neutral-800 flex items-center justify-center hover:bg-neutral-50 active:scale-95 shadow-2xs"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-bold text-xs text-neutral-900">{quantity}</span>
            <button
              id="increase-quantity-btn"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-white text-neutral-800 flex items-center justify-center hover:bg-neutral-50 active:scale-95 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Button */}
          <button
            id="detail-add-to-cart-submit"
            onClick={handleAdd}
            className="flex-1 h-12 bg-neutral-900 hover:bg-neutral-800 active:scale-98 text-white rounded-xl font-bold text-xs flex items-center justify-between px-4 transition-all shadow-md"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'إضافة إلى السلة' : 'Add to Cart'}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-black text-amber-400">{totalPrice}</span>
              <span className="text-[10px] text-neutral-300 font-medium">{isAr ? 'ر.س' : 'SAR'}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Confirmation Toast */}
      {isAddedToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-950 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-300 border border-neutral-800">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{isAr ? 'تمت الإضافة إلى السلة بنجاح!' : 'Added to cart successfully!'}</span>
        </div>
      )}
    </div>
  );
}
