import React, { useState } from 'react';
import { X, CheckCircle, Truck, CreditCard, QrCode, Building, ShieldCheck, ArrowRight, Copy, Check } from 'lucide-react';
import { CartItem } from '../types/coffee';
import { formatRupiah } from '../utils/formatCurrency';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  initialCity: string;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  initialCity,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 250000;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  // Form states
  const [name, setName] = useState('Alat Kopi Malang');
  const [phone, setPhone] = useState('081234567890');
  const [address, setAddress] = useState('Jl. Cengger Ayam No. 42, Lowokwaru');
  const [city, setCity] = useState(initialCity || 'Malang');
  const [postalCode, setPostalCode] = useState('65141');
  const [orderNotes, setOrderNotes] = useState('Mohon giling untuk V60 agak kasar');

  // Courier state
  const couriers = [
    { id: 'jne', name: 'JNE Reguler (1-2 Hari)', price: isFreeShipping ? 0 : 18000 },
    { id: 'sicepat', name: 'SiCepat BEST (Next Day)', price: isFreeShipping ? 0 : 22000 },
    { id: 'jnt', name: 'J&T Express (1-3 Hari)', price: isFreeShipping ? 0 : 16000 },
    { id: 'gosend', name: 'GoSend Sameday', price: 30000 },
  ];
  const [selectedCourierId, setSelectedCourierId] = useState('jne');
  const selectedCourier = couriers.find((c) => c.id === selectedCourierId) || couriers[0];

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'bca' | 'mandiri' | 'qris' | 'cc'>('bca');

  // Confirmation state
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copiedVA, setCopiedVA] = useState(false);

  const grandTotal = Math.max(0, subtotal - discountAmount) + selectedCourier.price;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `OTN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newId);
    setOrderSubmitted(true);
    onOrderComplete();
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText('8012398471928374');
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e8dfd5] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#cbd5e1] bg-[#f0f6fc]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2563eb]" />
            <h2 className="text-base font-bold text-[#0f172a] font-serif-luxury">
              {orderSubmitted ? 'Pesanan Berhasil Dibuat' : 'Checkout & Pengiriman'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#dbeafe] text-[#334155] transition-colors cursor-pointer"
            aria-label="Tutup checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          {orderSubmitted ? (
            /* Order Success View */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-bold font-serif-luxury text-[#0f172a]">
                  Terima Kasih Atas Pesanan Anda!
                </h3>
                <p className="text-xs text-[#475569] mt-1">
                  Nomor Pesanan: <span className="font-mono font-bold text-[#2563eb] text-sm">{orderId}</span>
                </p>
                <p className="text-xs text-[#64748b] mt-0.5">
                  Konfirmasi invoice dan nomor resi pengiriman telah dikirim ke WhatsApp Anda.
                </p>
              </div>

              {/* Payment Details Box */}
              <div className="bg-[#f0f6fc] p-5 rounded-2xl border border-[#cbd5e1] max-w-md mx-auto text-left space-y-3">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-[#cbd5e1]">
                  <span className="text-[#64748b]">Metode Pembayaran:</span>
                  <span className="font-bold uppercase text-[#0f172a]">
                    {paymentMethod === 'bca' && 'BCA Virtual Account'}
                    {paymentMethod === 'mandiri' && 'Mandiri Virtual Account'}
                    {paymentMethod === 'qris' && 'QRIS Instan'}
                    {paymentMethod === 'cc' && 'Kartu Kredit'}
                  </span>
                </div>

                {paymentMethod === 'bca' || paymentMethod === 'mandiri' ? (
                  <div className="space-y-1">
                    <span className="text-[11px] text-[#64748b]">Nomor Virtual Account:</span>
                    <div className="flex items-center justify-between p-2.5 bg-white border border-[#cbd5e1] rounded-lg">
                      <span className="font-mono text-base font-bold text-[#0f172a]">8012 3984 7192 8374</span>
                      <button
                        onClick={handleCopyVA}
                        className="flex items-center gap-1 text-xs text-[#2563eb] font-semibold hover:underline cursor-pointer"
                      >
                        {copiedVA ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedVA ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>
                ) : paymentMethod === 'qris' ? (
                  <div className="text-center p-3 bg-white border border-[#cbd5e1] rounded-xl">
                    <QrCode className="w-24 h-24 mx-auto text-[#0f172a]" />
                    <p className="text-[11px] text-[#64748b] mt-2">Scan kode QRIS melalui GoPay, BCA Mobile, OVO, atau ShopeePay</p>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-700 font-semibold">
                    ✓ Transaksi Kartu Kredit berhasil diotorisasi.
                  </p>
                )}

                <div className="flex justify-between text-xs pt-2 border-t border-[#cbd5e1]">
                  <span className="text-[#64748b]">Total Tagihan:</span>
                  <span className="font-extrabold text-base text-[#2563eb] tabular-nums">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Order Items Snapshot */}
              <div className="text-left max-w-md mx-auto text-xs space-y-2 border-t border-[#cbd5e1] pt-4">
                <span className="font-bold text-[#0f172a]">Rincian Pengiriman:</span>
                <p className="text-[#475569]">Penerima: {name} ({phone})</p>
                <p className="text-[#475569]">{address}, Kota {city}, {postalCode}</p>
                <p className="text-[#475569]">Kurir: {selectedCourier.name}</p>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#0b192c] hover:bg-[#1e293b] text-white text-xs font-bold transition-colors cursor-pointer border border-blue-900/40"
              >
                Kembali ke Beranda
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Section 1: Customer Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">
                  1. Alamat Pengiriman
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#334155] font-medium mb-1">Nama Penerima</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#f0f6fc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#334155] font-medium mb-1">No. WhatsApp / HP</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#f0f6fc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[#334155] font-medium mb-1">Alamat Lengkap</label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nama jalan, nomor rumah, RT/RW, patokan lokasi..."
                    className="w-full bg-[#f0f6fc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[#334155] font-medium mb-1">Kota / Kabupaten</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#f0f6fc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#334155] font-medium mb-1">Kode Pos</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-[#f0f6fc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-[#334155] font-medium mb-1">Catatan Pesanan / Grinding (Opsional)</label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="cth: Giling agak halus untuk moka pot, tolong packing bubble tebal"
                    className="w-full bg-[#f0f6fc] border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#0f172a] focus:outline-none focus:border-[#2563eb]"
                  />
                </div>
              </div>

              {/* Section 2: Courier Choice */}
              <div className="space-y-3 pt-3 border-t border-[#cbd5e1]">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">
                    2. Pilihan Ekspedisi Pengiriman
                  </h3>
                  {isFreeShipping && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Gratis Ongkir Aktif
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {couriers.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setSelectedCourierId(c.id)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCourierId === c.id
                          ? 'border-[#2563eb] bg-[#dbeafe]/40 text-[#1e40af]'
                          : 'border-[#cbd5e1] bg-white text-[#334155] hover:bg-[#f8fafc]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#64748b]" />
                        <span className="font-semibold">{c.name}</span>
                      </div>
                      <span className="font-bold tabular-nums">
                        {c.price === 0 ? 'GRATIS' : formatRupiah(c.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 3: Payment Method Choice */}
              <div className="space-y-3 pt-3 border-t border-[#cbd5e1]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">
                  3. Metode Pembayaran
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bca')}
                    className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'bca'
                        ? 'border-[#0b192c] bg-[#0b192c] text-white'
                        : 'border-[#cbd5e1] bg-white text-[#334155] hover:border-[#93c5fd]'
                    }`}
                  >
                    <Building className="w-4 h-4 mx-auto mb-1" />
                    <span className="font-bold block">BCA VA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mandiri')}
                    className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'mandiri'
                        ? 'border-[#0b192c] bg-[#0b192c] text-white'
                        : 'border-[#cbd5e1] bg-white text-[#334155] hover:border-[#93c5fd]'
                    }`}
                  >
                    <Building className="w-4 h-4 mx-auto mb-1" />
                    <span className="font-bold block">Mandiri VA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qris')}
                    className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'qris'
                        ? 'border-[#0b192c] bg-[#0b192c] text-white'
                        : 'border-[#cbd5e1] bg-white text-[#334155] hover:border-[#93c5fd]'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mx-auto mb-1" />
                    <span className="font-bold block">QRIS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cc')}
                    className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                      paymentMethod === 'cc'
                        ? 'border-[#0b192c] bg-[#0b192c] text-white'
                        : 'border-[#cbd5e1] bg-white text-[#334155] hover:border-[#93c5fd]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1" />
                    <span className="font-bold block">Kartu Kredit</span>
                  </button>
                </div>
              </div>

              {/* Ordered Items Preview */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider block">
                  Ringkasan Pesanan ({items.length} item):
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="p-2.5 rounded-lg bg-[#f8fafc] border border-[#cbd5e1] flex items-start justify-between text-xs">
                      <div>
                        {it.customBlendDetails && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-blue-100 text-[#1d4ed8] inline-block mb-0.5">
                            BYOB Custom
                          </span>
                        )}
                        <div className="font-bold text-[#0f172a] line-clamp-1">{it.product.name}</div>
                        <div className="text-[11px] text-[#64748b]">
                          {it.quantity}x · {it.selectedVariant} {it.selectedGrind ? `· ${it.selectedGrind.split('(')[0]}` : ''}
                        </div>
                        {it.customBlendDetails && (
                          <div className="text-[10px] text-[#2563eb] font-semibold mt-0.5">
                            {it.customBlendDetails.components.map((c) => `${c.percentage}% ${c.coffeeName.split(' ')[0]}`).join(' + ')}
                          </div>
                        )}
                      </div>
                      <span className="font-extrabold text-[#0f172a] tabular-nums shrink-0 ml-2">
                        {formatRupiah(it.unitPrice * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Cost Summary */}
              <div className="bg-[#f0f6fc] p-4 rounded-xl border border-[#cbd5e1] space-y-2 text-xs">
                <div className="flex justify-between text-[#334155]">
                  <span>Subtotal Produk</span>
                  <span className="font-bold tabular-nums text-[#0f172a]">{formatRupiah(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Diskon Voucher</span>
                    <span className="tabular-nums">- {formatRupiah(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#334155]">
                  <span>Ongkos Kirim ({selectedCourier.name.split('(')[0]})</span>
                  <span className="font-bold tabular-nums text-[#0f172a]">
                    {selectedCourier.price === 0 ? 'GRATIS' : formatRupiah(selectedCourier.price)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-[#0f172a] pt-2 border-t border-[#cbd5e1]">
                  <span>Total Tagihan Pembayaran</span>
                  <span className="text-base font-extrabold text-[#2563eb] tabular-nums">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#0b192c] hover:bg-[#1e293b] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer border border-blue-900/40"
              >
                <span>Konfirmasi & Bayar Sekarang</span>
                <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
