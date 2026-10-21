import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types/coffee';
import { formatRupiah } from '../utils/formatCurrency';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#cbd5e1] bg-[#f0f6fc]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#2563eb] fill-current" />
            <h2 className="text-base font-bold text-[#0f172a] font-serif-luxury">
              Koleksi Favorit Saya ({wishlistProducts.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#dbeafe] text-[#334155] transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Heart className="w-12 h-12 text-[#93c5fd] mx-auto stroke-1" />
              <p className="font-bold text-sm text-[#0f172a]">Belum ada produk favorit</p>
              <p className="text-xs text-[#64748b]">
                Klik ikon hati pada produk kopi atau alat seduh yang ingin Anda simpan.
              </p>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-3 rounded-xl border border-[#cbd5e1] bg-white hover:border-[#93c5fd] transition-colors"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#f0f6fc] shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase font-bold text-[#2563eb]">{p.categoryLabel}</div>
                  <h4 className="text-xs font-bold text-[#0f172a] truncate">{p.name}</h4>
                  <div className="text-xs font-extrabold text-[#0f172a] mt-1 tabular-nums">
                    {formatRupiah(p.price)}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#0b192c] hover:bg-[#1e293b] text-white text-xs font-semibold cursor-pointer"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(p)}
                    className="p-2 text-[#94a3b8] hover:text-rose-600 transition-colors cursor-pointer"
                    title="Hapus dari favorit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
