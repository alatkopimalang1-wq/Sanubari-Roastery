import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck } from 'lucide-react';
import { CartItem } from '../types/coffee';
import { formatRupiah } from '../utils/formatCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedCheckout: () => void;
  appliedPromo: string | null;
  discountAmount: number;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
  appliedPromo,
  discountAmount,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 250000;
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const diffToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = onApplyPromo(promoInput.trim().toUpperCase());
    if (result.success) {
      setPromoMessage({ text: result.message, error: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: result.message, error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#cbd5e1] transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cart Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#cbd5e1] bg-[#f0f6fc]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0f172a]" />
            <h2 className="text-base font-bold text-[#0f172a] font-serif-luxury">
              Keranjang Belanja
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#dbeafe] text-[#1e40af] tabular-nums">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#dbeafe] text-[#334155] transition-colors cursor-pointer"
            aria-label="Tutup keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Strip */}
        <div className="bg-[#f8fafc] px-6 py-3 border-b border-[#cbd5e1] text-xs">
          {diffToFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[#334155]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#2563eb]" />
                  <span>Tambah <b className="text-[#2563eb] tabular-nums">{formatRupiah(diffToFreeShipping)}</b> lagi</span>
                </span>
                <span className="text-[11px] font-semibold text-[#64748b]">Gratis Ongkir</span>
              </div>
              <div className="w-full bg-[#cbd5e1] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#2563eb] h-full rounded-full transition-all duration-300" 
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <Truck className="w-4 h-4" />
              <span>Selamat! Pesanan Anda berhak atas GRATIS ONGKIR ke seluruh Indonesia.</span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#dbeafe] flex items-center justify-center mx-auto text-[#2563eb]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#0f172a] text-base">Keranjang Anda Kosong</h3>
              <p className="text-xs text-[#64748b] max-w-xs mx-auto">
                Eksplorasi koleksi biji kopi specialty atau alat seduh manual terbaik pilihan kami.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#0b192c] text-white text-xs font-semibold hover:bg-[#1e293b] transition-colors cursor-pointer"
              >
                Mulai Belanja Kopi
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 rounded-xl border border-[#cbd5e1] bg-white hover:border-[#93c5fd] transition-colors"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f0f6fc] shrink-0 border border-[#cbd5e1]">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {item.customBlendDetails && (
                          <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-blue-100 text-[#1d4ed8] border border-blue-200 mb-1">
                            BYOB Custom Blend
                          </span>
                        )}
                        <h4 className="text-xs font-bold text-[#0f172a] line-clamp-1">
                          {item.product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#94a3b8] hover:text-rose-600 transition-colors p-1 cursor-pointer shrink-0"
                        title="Hapus produk"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#64748b] mt-0.5 space-y-0.5">
                      <p>Varian: <span className="font-medium text-[#0f172a]">{item.selectedVariant}</span></p>
                      {item.selectedGrind && (
                        <p className="line-clamp-1">Giling: <span className="font-medium text-[#0f172a]">{item.selectedGrind.split('(')[0]}</span></p>
                      )}

                      {/* BYOB Composition Details */}
                      {item.customBlendDetails && (
                        <div className="mt-1.5 p-2 bg-[#f0f6fc] rounded-lg border border-[#cbd5e1] text-[10px] space-y-1">
                          <div className="font-semibold text-[#0f172a] truncate">
                            Racikan: {item.customBlendDetails.components.map((c) => `${c.percentage}% ${c.coffeeName.split(' ')[0]}`).join(' + ')}
                          </div>
                          <div className="text-[#2563eb] font-medium flex items-center justify-between">
                            <span>{item.customBlendDetails.roastLevel} Roast · {item.customBlendDetails.intendedBrew.split(' ')[0]}</span>
                            <span className="font-mono text-[9px] text-[#64748b]">{item.customBlendDetails.roasterBatchCode}</span>
                          </div>
                          {item.customBlendDetails.customMessage && (
                            <div className="text-[#64748b] italic truncate">
                              &ldquo;{item.customBlendDetails.customMessage}&rdquo;
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-extrabold text-[#0f172a] tabular-nums">
                      {formatRupiah(item.unitPrice * item.quantity)}
                    </span>

                    <div className="flex items-center border border-[#cbd5e1] rounded-md overflow-hidden bg-[#f0f6fc]">
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-[#334155] hover:bg-[#dbeafe] font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold tabular-nums text-[#0f172a]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-[#334155] hover:bg-[#dbeafe] font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher and Checkout Summary Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#cbd5e1] bg-[#f0f6fc] space-y-4">
            
            {/* Promo Code Input */}
            <div className="space-y-1.5">
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Kode Voucher (cth: SANUBARI15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full bg-white border border-[#cbd5e1] rounded-lg pl-9 pr-3 py-2 text-xs uppercase font-medium placeholder:normal-case placeholder:text-[#64748b] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0b192c] hover:bg-[#1e293b] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Gunakan
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span className="font-semibold">Voucher &ldquo;{appliedPromo}&rdquo; aktif!</span>
                  <button
                    onClick={onRemovePromo}
                    className="text-xs text-rose-600 hover:underline cursor-pointer font-bold"
                  >
                    Hapus
                  </button>
                </div>
              )}

              {promoMessage && !appliedPromo && (
                <p className={`text-[11px] ${promoMessage.error ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {promoMessage.text}
                </p>
              )}

              <div className="flex gap-1.5 text-[10px] text-[#64748b]">
                <span>Coba kode:</span>
                <button
                  onClick={() => {
                    onApplyPromo('SANUBARI15');
                    setPromoMessage({ text: 'Voucher Sanubari 15% diterapkan!', error: false });
                  }}
                  className="font-bold underline text-[#2563eb] cursor-pointer"
                >
                  SANUBARI15
                </button>
                <span>·</span>
                <button
                  onClick={() => {
                    onApplyPromo('KOPISANTUY');
                    setPromoMessage({ text: 'Potongan Rp 25.000 diterapkan!', error: false });
                  }}
                  className="font-bold underline text-[#2563eb] cursor-pointer"
                >
                  KOPISANTUY
                </button>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#334155] border-t border-[#cbd5e1] pt-3">
              <div className="flex justify-between">
                <span>Subtotal Produk</span>
                <span className="font-bold tabular-nums text-[#0f172a]">{formatRupiah(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Diskon Voucher</span>
                  <span className="tabular-nums">- {formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#64748b]">
                <span>Estimasi Ongkos Kirim</span>
                <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? 'GRATIS' : 'Dihitung di checkout'}</span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-[#0f172a] pt-2 border-t border-[#cbd5e1]">
                <span>Total Belanja</span>
                <span className="text-base font-extrabold text-[#2563eb] tabular-nums">
                  {formatRupiah(finalTotal)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#0b192c] hover:bg-[#1e293b] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-blue-900/40"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748b]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transaksi Aman & Bergaransi Pengiriman Sanubari Roastery</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
