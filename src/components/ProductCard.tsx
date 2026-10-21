import React from 'react';
import { Heart, Star, Plus } from 'lucide-react';
import { Product } from '../types/coffee';
import { formatRupiah } from '../utils/formatCurrency';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const { t } = useLanguage();

  return (
    <div className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl border border-[#cbd5e1] overflow-hidden hover:border-[#93c5fd] hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300">
      
      {/* Product Image Area */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative w-full aspect-[4/3] bg-[#f0f6fc] overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Tag */}
        {product.isBestseller ? (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#0b192c]/90 backdrop-blur-sm text-[#93c5fd] text-[9px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-blue-900/30">
            {t.bestseller}
          </div>
        ) : product.isSpecialty ? (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#2563eb]/95 backdrop-blur-sm text-white text-[9px] sm:text-[11px] font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-xs">
            {t.specialty}
          </div>
        ) : null}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
            isWishlisted 
              ? 'bg-[#2563eb] text-white' 
              : 'bg-white/80 text-[#334155] hover:bg-white hover:text-[#2563eb]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-4 md:p-5">
        
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#64748b] mb-1">
          <span className="uppercase tracking-wider font-semibold text-[9px] sm:text-[11px] truncate max-w-[60%]">
            {product.categoryLabel}
          </span>
          <div className="flex items-center gap-1 text-amber-500 font-medium shrink-0">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            <span className="tabular-nums font-semibold text-[#0f172a] text-[10px] sm:text-xs">{product.rating.toFixed(1)}</span>
            <span className="text-[#94a3b8] text-[9px] sm:text-[10px] hidden xs:inline">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Name - Fitted cleanly for mobile lines */}
        <h3
          onClick={() => onSelectProduct(product)}
          className="text-xs sm:text-sm md:text-base font-bold text-[#0f172a] hover:text-[#2563eb] transition-colors cursor-pointer line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-snug break-words"
        >
          {product.name}
        </h3>

        {/* Coffee Bean Origin / Specs Preview */}
        {product.origin ? (
          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-[#475569] truncate">
            {product.origin} · {product.process}
          </p>
        ) : product.specs && Object.keys(product.specs).length > 0 ? (
          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-[#475569] truncate">
            {Object.values(product.specs)[0]}
          </p>
        ) : (
          <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-[#475569] truncate">{product.shortDesc}</p>
        )}

        {/* Flavor Notes preview for beans */}
        {product.flavorNotes && product.flavorNotes.length > 0 && (
          <div className="mt-1 text-[9px] sm:text-[11px] text-[#64748b] truncate">
            <span>{t.notes} </span>
            <span className="italic">{product.flavorNotes.slice(0, 2).join(', ')}</span>
          </div>
        )}

        {/* Price & Action Button */}
        <div className="mt-auto pt-2.5 sm:pt-3.5 flex items-center justify-between border-t border-[#e2e8f0] gap-1.5">
          <div className="min-w-0 flex-1">
            <div className="text-[12px] xs:text-[13px] sm:text-base md:text-lg font-extrabold text-[#0f172a] tabular-nums truncate">
              {formatRupiah(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[9px] sm:text-xs text-[#94a3b8] line-through tabular-nums block truncate">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => onSelectProduct(product)}
            className="inline-flex items-center justify-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-[#dbeafe] hover:bg-[#0b192c] text-[#1e40af] hover:text-white text-[10px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0"
            aria-label="Pilih varian atau lihat detail"
          >
            <span>{t.select}</span>
            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
