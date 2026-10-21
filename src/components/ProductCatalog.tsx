import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { Product, CoffeeCategory, RoastLevel } from '../types/coffee';
import { ProductCard } from './ProductCard';
import { useLanguage } from '../context/LanguageContext';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: CoffeeCategory;
  onSelectCategory: (cat: CoffeeCategory) => void;
  searchQuery: string;
  onClearSearch: () => void;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
  onOpenByob: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
  onOpenByob,
}) => {
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [specialtyOnly, setSpecialtyOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const { t, language } = useLanguage();

  const categories: { id: CoffeeCategory; label: string }[] = [
    { id: 'all', label: t.catAll },
    { id: 'beans', label: t.catBeans },
    { id: 'manual_brew', label: t.catManualBrew },
    { id: 'espresso_machine', label: t.catEspressoMachine },
    { id: 'grinder', label: t.catGrinder },
    { id: 'accessories', label: t.catAccessories },
  ];

  const roastOptions: { id: string; label: string }[] = [
    { id: 'all', label: t.roastAll },
    { id: 'Light', label: 'Light Roast' },
    { id: 'Medium', label: 'Medium Roast' },
    { id: 'Medium-Dark', label: 'Medium-Dark' },
  ];

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.shortDesc.toLowerCase().includes(q);
          const matchOrigin = item.origin?.toLowerCase().includes(q) || false;
          const matchNotes = item.flavorNotes?.some((n) => n.toLowerCase().includes(q)) || false;
          if (!matchName && !matchDesc && !matchOrigin && !matchNotes) {
            return false;
          }
        }
        // Roast filter
        if (selectedRoast !== 'all' && item.roastLevel !== selectedRoast) {
          return false;
        }
        // Specialty only
        if (specialtyOnly && !item.isSpecialty) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // popular
        return b.reviewCount - a.reviewCount;
      });
  }, [products, selectedCategory, searchQuery, selectedRoast, specialtyOnly, sortBy]);

  return (
    <section id="catalog-section" className="py-8 sm:py-12 bg-[#f0f6fc]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-[#cbd5e1]">
          <div>
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#2563eb]">
              {t.catalogPreTitle}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0f172a] font-serif-luxury mt-1 break-words">
              {t.catalogHeading}
            </h2>
          </div>

          {/* Interactive Category Segmented Tabs - Mobile Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0b192c] text-white shadow-xs border border-blue-900/40'
                      : 'bg-[#e2e8f0] text-[#334155] hover:bg-[#cbd5e1]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters Toolbar - Refined for clean mobile lines */}
        <div className="py-3 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          {/* Left filters: Roast Level & Specialty toggle */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Roast Level filter visible if all or beans */}
            {(selectedCategory === 'all' || selectedCategory === 'beans') && (
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-[#cbd5e1] shadow-xs">
                <span className="text-[#64748b]">Roast:</span>
                <select
                  value={selectedRoast}
                  onChange={(e) => setSelectedRoast(e.target.value)}
                  className="bg-transparent font-semibold text-[#0f172a] focus:outline-none cursor-pointer text-xs"
                >
                  {roastOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Specialty filter toggle */}
            <button
              onClick={() => setSpecialtyOnly(!specialtyOnly)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer shadow-xs text-xs ${
                specialtyOnly
                  ? 'bg-[#2563eb] text-white border-[#2563eb]'
                  : 'bg-white text-[#334155] border-[#cbd5e1] hover:bg-[#dbeafe]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-semibold whitespace-nowrap">{t.specialtyOnlyBtn}</span>
            </button>

            {/* Active search filter badge */}
            {searchQuery && (
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe]">
                <span className="truncate max-w-[150px] sm:max-w-none">{t.searchResultFor} &ldquo;{searchQuery}&rdquo;</span>
                <button
                  onClick={onClearSearch}
                  className="text-[#64748b] hover:text-[#0f172a] cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right filters: Sort By & Total Count */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span className="text-[#64748b] text-[11px] sm:text-xs">
              {t.showingLabel} <span className="font-bold text-[#0f172a] tabular-nums">{filteredProducts.length}</span> {t.productsWord}
            </span>

            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-[#cbd5e1] shadow-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748b] shrink-0" />
              <span className="text-[#64748b] hidden xs:inline">{t.sortByLabel}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-semibold text-[#0f172a] focus:outline-none cursor-pointer text-xs"
              >
                <option value="popular">{t.sortPopular}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
                <option value="rating">{t.sortRating}</option>
              </select>
            </div>
          </div>

        </div>

        {/* BYOB Interactive Studio Banner (Highlighted feature ala NiR Coffee) */}
        {(selectedCategory === 'all' || selectedCategory === 'beans') && !searchQuery && (
          <div className="mb-5 sm:mb-6 p-4 sm:p-6 rounded-2xl bg-[#0b192c] text-white border border-blue-900/60 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl z-10">
              <div className="flex items-center gap-2">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-[#2563eb] text-white">
                  {t.byobBannerBadge}
                </span>
                <span className="text-xs text-[#38bdf8] font-bold">
                  {t.byobBannerSub}
                </span>
              </div>
              <h3 className="text-sm sm:text-lg font-bold font-serif-luxury text-white break-words">
                {t.byobBannerTitle}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#cbd5e1] leading-relaxed">
                {t.byobBannerDesc}
              </p>
            </div>

            <button
              onClick={onOpenByob}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all shadow-md cursor-pointer shrink-0 border border-blue-400/30 z-10 w-full md:w-auto"
            >
              <Sparkles className="w-4 h-4 text-[#38bdf8] shrink-0" />
              <span>{t.byobBannerCta}</span>
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6 lg:gap-8 mt-2">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-[#cbd5e1] p-6 sm:p-8 max-w-md mx-auto my-6 sm:my-8 shadow-xs">
            <p className="text-sm font-semibold text-[#0f172a]">{t.noProductsFound}</p>
            <p className="text-xs text-[#64748b] mt-1 mb-4 leading-relaxed">
              {t.noProductsSub}
            </p>
            <button
              onClick={() => {
                onSelectCategory('all');
                setSelectedRoast('all');
                setSpecialtyOnly(false);
                onClearSearch();
              }}
              className="px-4 py-2 rounded-full bg-[#0b192c] text-white text-xs font-semibold hover:bg-[#1e293b] transition-colors cursor-pointer"
            >
              {t.resetFiltersBtn}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
