import { useState } from 'react';
import { Search, SlidersHorizontal, Star, Plus, Heart, Clock, Flame, ChevronRight, Check } from 'lucide-react';
import { CATEGORIES, STORIES, PRODUCTS } from '../../data/mockData';
import { Product, Language } from '../../types';

interface HomeScreenProps {
  lang: Language;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  favorites: string[];
  onToggleFavorite: (productId: string, e?: React.MouseEvent) => void;
  onOpenCart: () => void;
}

export function HomeScreen({
  lang,
  onSelectProduct,
  onAddToCart,
  favorites,
  onToggleFavorite,
}: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStory, setActiveStory] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isAr = lang === 'ar';

  return (
    <div id="home-screen" className="pb-24 text-neutral-900 bg-neutral-50/60 min-h-full">
      {/* Top App Header inside screen */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 block">
              {isAr ? 'مقهى ومحمصة أرتيزان' : 'Artisan Roasters & Cafe'}
            </span>
            <h1 className="text-lg font-bold text-neutral-900 flex items-center gap-1.5">
              <span>{isAr ? 'صباح الخير، عبدالله' : 'Good morning, Alex'}</span>
              <span className="inline-block animate-wave">☕</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-9 px-3 rounded-full bg-amber-100/70 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{isAr ? 'حي النرجس، الرياض' : 'Riyadh, Al Narjis'}</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 ${isAr ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن قهوتك، كرواسون، أو حلى...' : 'Search coffee, pastries, brunch...'}
              className={`w-full h-11 bg-white rounded-xl border border-neutral-200/90 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-xs ${
                isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'
              }`}
            />
          </div>
          <button
            id="filter-options-button"
            className="h-11 w-11 shrink-0 rounded-xl bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 active:scale-95 transition-all shadow-xs"
            title={isAr ? 'تصفية النتائج' : 'Filter options'}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>

      {/* Stories / Highlights Carousel */}
      <div className="pt-2 pb-3 overflow-x-auto no-scrollbar px-5 flex items-center gap-3">
        {STORIES.map((story) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(story.id === activeStory ? null : story.id)}
            className="flex flex-col items-center gap-1.5 shrink-0 focus:outline-none group text-center"
          >
            <div className={`p-0.5 rounded-full transition-all duration-300 ${
              activeStory === story.id ? 'ring-2 ring-amber-500 ring-offset-2' : 'ring-1.5 ring-neutral-200 group-hover:ring-amber-400'
            }`}>
              <div className="w-14 h-14 rounded-full overflow-hidden relative border-2 border-white shadow-xs">
                <img
                  src={story.imageUrl}
                  alt={isAr ? story.titleAr : story.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>
            <span className="text-[11px] font-medium text-neutral-700 max-w-[68px] truncate leading-tight">
              {isAr ? story.titleAr : story.titleEn}
            </span>
          </button>
        ))}
      </div>

      {/* Featured Banner with Direct Linked Visual Image */}
      <div className="px-5 mb-4">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-amber-950 text-white p-4 shadow-md">
          <div className="relative z-10 max-w-[62%]">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-extrabold uppercase tracking-wide mb-1.5">
              {isAr ? 'عرض اليوم الحصري' : 'Daily Exclusive'}
            </span>
            <h2 className="text-base font-bold leading-tight mb-1 text-white">
              {isAr ? 'محصول غيشا كولومبي مع حلى مجاني' : 'Colombian Geisha + Free Pastry'}
            </h2>
            <p className="text-xs text-neutral-300 mb-3 line-clamp-2">
              {isAr ? 'استمتع بإيحاءات زهرية فاخرة مع أي قطعة مخبوزات طازجة بكود' : 'Experience notes of floral jasmine with code'}{' '}
              <span className="font-mono font-bold text-amber-300 bg-black/40 px-1.5 py-0.5 rounded">GEISHA20</span>
            </p>
            <button
              id="banner-order-now"
              onClick={() => onSelectProduct(PRODUCTS[0])}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors shadow-xs"
            >
              <span>{isAr ? 'اطلب التجربة' : 'Explore Now'}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {/* Linked Hero Graphic */}
          <div className="absolute top-0 right-0 bottom-0 w-[45%] pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
              alt="Artisan Specialty Coffee"
              className="w-full h-full object-cover object-center opacity-85 mask-gradient"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/40 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-neutral-900">
            {isAr ? 'التصنيفات' : 'Categories'}
          </h2>
          <span className="text-xs text-amber-700 font-medium cursor-pointer hover:underline">
            {isAr ? 'عرض الكل' : 'View All'}
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-neutral-900 text-white shadow-xs scale-102'
                    : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100/80'
                }`}
              >
                <span>{isAr ? cat.nameAr : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product List Grid */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-1.5">
            <span>{isAr ? 'الأكثر طلباً وتفضيلاً' : 'Signature Picks'}</span>
            <span className="text-xs font-normal text-neutral-500">({filteredProducts.length})</span>
          </h2>
          <div className="text-xs text-neutral-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{isAr ? 'تحضير سريع 3-7 دقائق' : 'Fast prep 3-7m'}</span>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-neutral-200/70 my-2">
            <p className="text-sm text-neutral-500">{isAr ? 'لم يتم العثور على منتجات مطابقة' : 'No matching items found'}</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-semibold text-amber-600 underline"
            >
              {isAr ? 'إعادة ضبط البحث' : 'Reset search'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => {
              const isFav = favorites.includes(product.id);
              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-white rounded-2xl border border-neutral-200/70 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer relative"
                >
                  {/* Image container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                    <img
                      src={product.imageUrl}
                      alt={isAr ? product.nameAr : product.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Floating Badges */}
                    {product.isPopular && (
                      <div className="absolute top-2 right-2 z-10 bg-neutral-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>{isAr ? 'مميز' : 'Top'}</span>
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      id={`favorite-btn-${product.id}`}
                      onClick={(e) => onToggleFavorite(product.id, e)}
                      className={`absolute top-2 left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-80 ${
                        isFav
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 text-neutral-600 hover:text-rose-500 hover:bg-white'
                      } shadow-xs`}
                      title={isAr ? 'إضافة للمفضلة' : 'Favorite'}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Rating badge */}
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-medium text-amber-700 block mb-0.5 truncate">
                        {isAr ? product.categoryNameAr : product.categoryNameEn}
                      </span>
                      <h3 className="font-bold text-xs text-neutral-900 leading-snug line-clamp-1 group-hover:text-amber-700 transition-colors">
                        {isAr ? product.nameAr : product.nameEn}
                      </h3>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                        {isAr ? product.descriptionAr : product.descriptionEn}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs font-black text-neutral-900">{product.price}</span>
                          <span className="text-[10px] text-neutral-500 font-medium">{isAr ? 'ر.س' : 'SAR'}</span>
                        </div>
                        {product.originalPrice && (
                          <span className="text-[9px] text-neutral-400 line-through">
                            {product.originalPrice} {isAr ? 'ر.س' : 'SAR'}
                          </span>
                        )}
                      </div>

                      <button
                        id={`quick-add-${product.id}`}
                        onClick={(e) => onAddToCart(product, e)}
                        className="w-7 h-7 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-90 text-neutral-950 flex items-center justify-center transition-all shadow-xs"
                        title={isAr ? 'إضافة سريعة للسلة' : 'Add to cart'}
                      >
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
