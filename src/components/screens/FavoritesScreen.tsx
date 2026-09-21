import { useState } from 'react';
import { Heart, Star, Plus, ArrowLeft, Trash2, Coffee } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import { Product, Language } from '../../types';

interface FavoritesScreenProps {
  favorites: string[];
  lang: Language;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onToggleFavorite: (productId: string, e?: React.MouseEvent) => void;
  onClearFavorites: () => void;
}

export function FavoritesScreen({
  favorites,
  lang,
  onBack,
  onSelectProduct,
  onAddToCart,
  onToggleFavorite,
  onClearFavorites,
}: FavoritesScreenProps) {
  const isAr = lang === 'ar';
  const [activeTag, setActiveTag] = useState<'all' | 'drinks' | 'bakery'>('all');

  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  const filtered = favoriteProducts.filter((p) => {
    if (activeTag === 'drinks') return p.category.includes('coffee') || p.category.includes('drink');
    if (activeTag === 'bakery') return p.category.includes('bakery') || p.category.includes('dessert') || p.category.includes('breakfast');
    return true;
  });

  return (
    <div id="favorites-screen" className="pb-24 text-neutral-900 bg-neutral-50/70 min-h-full">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-3 border-b border-neutral-200/80 sticky top-0 z-10 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 active:scale-95 transition-all"
          title={isAr ? 'رجوع' : 'Back'}
        >
          <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold text-neutral-900">{isAr ? 'قائمة المفضلة' : 'Saved Favorites'}</h1>
          <span className="text-[11px] text-neutral-500">
            {favoriteProducts.length} {isAr ? 'أصناف محفوظة' : 'saved items'}
          </span>
        </div>
        {favoriteProducts.length > 0 ? (
          <button
            onClick={onClearFavorites}
            className="text-[11px] text-neutral-400 hover:text-rose-500 font-medium"
            title={isAr ? 'مسح الكل' : 'Clear all'}
          >
            {isAr ? 'مسح' : 'Clear'}
          </button>
        ) : (
          <div className="w-9"></div>
        )}
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="px-5 py-16 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-base font-bold text-neutral-800 mb-1">
            {isAr ? 'لم تقم بحفظ أي أصناف بعد' : 'No favorites saved yet'}
          </h2>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto mb-6">
            {isAr
              ? 'انقر على أيقونة القلب على أي قهوة أو حلى لإضافتها إلى قائمتك المفضلة والوصول السريع إليها'
              : 'Tap the heart icon on any beverage or dessert to save it here for fast reordering'}
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
          >
            {isAr ? 'تصفح الأصناف الآن' : 'Browse items'}
          </button>
        </div>
      ) : (
        <div className="px-5 pt-4 space-y-3">
          {/* Quick Sub-filters */}
          <div className="flex gap-2 pb-1">
            <button
              onClick={() => setActiveTag('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTag === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {isAr ? 'الكل' : 'All'} ({favoriteProducts.length})
            </button>
            <button
              onClick={() => setActiveTag('drinks')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTag === 'drinks'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {isAr ? 'المشروبات والقهوة' : 'Drinks'}
            </button>
            <button
              onClick={() => setActiveTag('bakery')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTag === 'bakery'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {isAr ? 'المخبوزات والحلى' : 'Bakery & Sweets'}
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-2.5">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="bg-white p-3 rounded-2xl border border-neutral-200/80 shadow-xs flex items-center gap-3 cursor-pointer hover:border-amber-400 transition-all group relative"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 shrink-0 relative">
                  <img
                    src={item.imageUrl}
                    alt={isAr ? item.nameAr : item.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1 py-0.5 rounded flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-amber-700 font-semibold block mb-0.5">
                    {isAr ? item.categoryNameAr : item.categoryNameEn}
                  </span>
                  <h3 className="text-xs font-bold text-neutral-900 truncate group-hover:text-amber-700 transition-colors">
                    {isAr ? item.nameAr : item.nameEn}
                  </h3>
                  <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                    {isAr ? item.descriptionAr : item.descriptionEn}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-neutral-900">
                      {item.price} {isAr ? 'ر.س' : 'SAR'}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => onToggleFavorite(item.id, e)}
                        className="w-7 h-7 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-colors"
                        title={isAr ? 'إزالة من المفضلة' : 'Remove'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => onAddToCart(item, e)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 active:scale-95 text-neutral-950 text-xs font-bold flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{isAr ? 'طلب' : 'Order'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
