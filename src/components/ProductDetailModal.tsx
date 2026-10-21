import React, { useState } from 'react';
import { X, Star, Heart, Check, ShieldCheck, Flame, Truck, Coffee, Sliders, Sparkles } from 'lucide-react';
import { Product, GrindOption } from '../types/coffee';
import { formatRupiah } from '../utils/formatCurrency';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, grind?: GrindOption, variant?: string, qty?: number) => void;
  onBuyNow: (product: Product, grind?: GrindOption, variant?: string, qty?: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const defaultGrind = product.grindOptions && product.grindOptions.length > 0 
    ? product.grindOptions[0] 
    : undefined;
  
  const [selectedGrind, setSelectedGrind] = useState<GrindOption | undefined>(defaultGrind);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  const currentVariant = product.variants ? product.variants[selectedVariantIndex] : null;
  const unitPrice = currentVariant 
    ? Math.round(product.price * currentVariant.priceMultiplier) 
    : product.price;

  const handleAddToCart = () => {
    onAddToCart(
      product,
      selectedGrind,
      currentVariant ? currentVariant.weightOrSpec : 'Standar',
      quantity
    );
  };

  const handleBuyNow = () => {
    onBuyNow(
      product,
      selectedGrind,
      currentVariant ? currentVariant.weightOrSpec : 'Standar',
      quantity
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#cbd5e1] bg-[#f0f6fc]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#64748b]">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#2563eb]">{product.categoryLabel}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-[#2563eb] border-[#2563eb] text-white'
                  : 'bg-white border-[#cbd5e1] text-[#334155] hover:text-[#2563eb]'
              }`}
              title="Favorit"
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white border border-[#cbd5e1] text-[#334155] hover:bg-[#dbeafe] transition-colors cursor-pointer"
              aria-label="Tutup modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two Column Responsive PDP */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Gallery & Origin Card */}
            <div className="md:col-span-6 space-y-5">
              <div className="rounded-xl overflow-hidden bg-[#f0f6fc] border border-[#cbd5e1] aspect-[4/3] relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.isSpecialty && (
                  <div className="absolute top-3 left-3 bg-[#2563eb] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow-sm">
                    Specialty 100% Arabica
                  </div>
                )}
              </div>

              {/* Bean Tasting Profile Bars (if coffee beans) */}
              {product.flavorProfile && (
                <div className="bg-[#f0f6fc] p-4 rounded-xl border border-[#cbd5e1] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0f172a]">
                    <span className="flex items-center gap-1.5">
                      <Coffee className="w-4 h-4 text-[#2563eb]" />
                      Profil Karakter Rasa
                    </span>
                    <span className="text-[#2563eb] font-normal text-[11px]">Skala 1 - 5</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-[#475569] mb-1">
                        <span>Acidity (Keasaman)</span>
                        <span className="font-semibold text-[#0f172a]">{product.flavorProfile.acidity}/5</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#cbd5e1] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#2563eb] rounded-full" 
                          style={{ width: `${(product.flavorProfile.acidity / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-[#475569] mb-1">
                        <span>Body (Kekentalan)</span>
                        <span className="font-semibold text-[#0f172a]">{product.flavorProfile.body}/5</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#cbd5e1] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#1d4ed8] rounded-full" 
                          style={{ width: `${(product.flavorProfile.body / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-[#475569] mb-1">
                        <span>Sweetness (Kemanisan)</span>
                        <span className="font-semibold text-[#0f172a]">{product.flavorProfile.sweetness}/5</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#cbd5e1] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#0284c7] rounded-full" 
                          style={{ width: `${(product.flavorProfile.sweetness / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-[#475569] mb-1">
                        <span>Aroma</span>
                        <span className="font-semibold text-[#0f172a]">{product.flavorProfile.aroma}/5</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#cbd5e1] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#0b192c] rounded-full" 
                          style={{ width: `${(product.flavorProfile.aroma / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Flavor Notes Tags */}
              {product.flavorNotes && product.flavorNotes.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#475569]">Tasting Notes Alami:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.flavorNotes.map((note, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#dbeafe] text-[#1e40af] px-2.5 py-1 rounded-md font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-serif-luxury leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Review Count */}
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#0f172a] tabular-nums">{product.rating.toFixed(1)}</span>
                  <span className="text-[#64748b]">· {product.reviewCount} Ulasan Pembeli</span>
                  <span className="text-[#64748b]">·</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Stok Tersedia
                  </span>
                </div>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tabular-nums">
                    {formatRupiah(unitPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#94a3b8] line-through tabular-nums">
                      {formatRupiah(
                        currentVariant
                          ? Math.round(product.originalPrice * currentVariant.priceMultiplier)
                          : product.originalPrice
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* Weight or Spec Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">
                    Pilih Kemasan / Varian:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.variants.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border text-left transition-all cursor-pointer ${
                          selectedVariantIndex === idx
                            ? 'border-[#0b192c] bg-[#0b192c] text-white shadow-sm'
                            : 'border-[#cbd5e1] bg-white text-[#334155] hover:border-[#93c5fd]'
                        }`}
                      >
                        <div className="truncate">{v.weightOrSpec}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Grind Size Selector (For Beans) */}
              {product.grindOptions && product.grindOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">
                      Tingkat Gilingan (Grind Size):
                    </label>
                    <span className="text-[11px] text-[#2563eb]">Gratis giling fresh</span>
                  </div>

                  <div className="space-y-1.5">
                    {product.grindOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedGrind(opt)}
                        className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors cursor-pointer ${
                          selectedGrind === opt
                            ? 'border-[#2563eb] bg-[#dbeafe]/40 text-[#1e40af]'
                            : 'border-[#cbd5e1] bg-white text-[#334155] hover:bg-[#f8fafc]'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedGrind === opt && <Check className="w-3.5 h-3.5 text-[#2563eb]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2 border-t border-[#cbd5e1]">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#0f172a]">Jumlah:</span>
                  <div className="flex items-center border border-[#cbd5e1] rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-xs text-[#334155] hover:bg-[#dbeafe] font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-xs font-bold tabular-nums text-[#0f172a]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-xs text-[#334155] hover:bg-[#dbeafe] font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-xs text-[#475569]">
                    Subtotal: <span className="font-bold text-[#0f172a] tabular-nums">{formatRupiah(unitPrice * quantity)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 rounded-xl border-2 border-[#0b192c] text-[#0b192c] hover:bg-[#0b192c] hover:text-white text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-sm text-center"
                  >
                    + Tambah Keranjang
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-md shadow-blue-900/30 text-center"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>

              {/* Assurance Trust Strip */}
              <div className="bg-[#f0f6fc] p-3 rounded-lg border border-[#cbd5e1] grid grid-cols-2 gap-2 text-[11px] text-[#475569]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>Gratis Ongkir Min. 250rb</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>Garansi Resmi & Original</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Tabs: Description, Origin/Specs & Reviews */}
          <div className="pt-6 border-t border-[#cbd5e1]">
            <div className="flex items-center gap-6 border-b border-[#cbd5e1] text-xs font-bold text-[#64748b]">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'details'
                    ? 'border-[#0b192c] text-[#0b192c]'
                    : 'border-transparent hover:text-[#0f172a]'
                }`}
              >
                Deskripsi Lengkap
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'specs'
                    ? 'border-[#0b192c] text-[#0b192c]'
                    : 'border-transparent hover:text-[#0f172a]'
                }`}
              >
                {product.origin ? 'Asal Usul & Spesifikasi Kopi' : 'Spesifikasi Teknis'}
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-[#0b192c] text-[#0b192c]'
                    : 'border-transparent hover:text-[#0f172a]'
                }`}
              >
                Ulasan Pembeli ({product.reviews.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-4 text-xs leading-relaxed text-[#334155]">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p>{product.fullDesc}</p>
                  {product.roastLevel && (
                    <p className="font-semibold text-[#0f172a]">
                      Tingkat Sangrai: <span className="text-[#2563eb]">{product.roastLevel} Roast</span>
                    </p>
                  )}
                  {product.warranty && (
                    <p className="text-emerald-700 font-medium">
                      🛡️ {product.warranty}
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-3">
                  {product.origin ? (
                    <div className="grid grid-cols-2 gap-3 bg-[#f0f6fc] p-4 rounded-xl border border-[#cbd5e1]">
                      <div>
                        <span className="text-[#64748b]">Wilayah / Origin:</span>
                        <p className="font-bold text-[#0f172a]">{product.origin}</p>
                      </div>
                      <div>
                        <span className="text-[#64748b]">Ketinggian Tanam:</span>
                        <p className="font-bold text-[#0f172a]">{product.elevation}</p>
                      </div>
                      <div>
                        <span className="text-[#64748b]">Varietas Kopi:</span>
                        <p className="font-bold text-[#0f172a]">{product.variety}</p>
                      </div>
                      <div>
                        <span className="text-[#64748b]">Metode Proses:</span>
                        <p className="font-bold text-[#0f172a]">{product.process}</p>
                      </div>
                    </div>
                  ) : product.specs ? (
                    <div className="space-y-2">
                      {Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="flex justify-between py-1.5 border-b border-[#e2e8f0]">
                          <span className="text-[#64748b]">{key}</span>
                          <span className="font-bold text-[#0f172a] text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Informasi spesifikasi lengkap tertera pada kemasan produk.</p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="p-3.5 rounded-xl bg-[#f0f6fc] border border-[#cbd5e1] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-[#0f172a] flex items-center gap-2">
                          <span>{rev.author}</span>
                          <span className="text-[10px] font-normal text-[#64748b]">({rev.location})</span>
                        </div>
                        <div className="flex items-center text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#334155] italic">&ldquo;{rev.comment}&rdquo;</p>
                      {rev.brewMethod && (
                        <p className="text-[10px] text-[#64748b]">
                          Metode Seduh: <span className="font-semibold text-[#0f172a]">{rev.brewMethod}</span> · {rev.date}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
