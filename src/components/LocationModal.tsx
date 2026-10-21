import React from 'react';
import { X, MapPin, Check } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  const popularCities = [
    { name: 'Jakarta Selatan', province: 'DKI Jakarta', eta: '1 hari (Same-day/Instant)' },
    { name: 'Malang', province: 'Jawa Timur', eta: '1-2 hari (Next Day JNE)' },
    { name: 'Surabaya', province: 'Jawa Timur', eta: '1 hari (Next Day Hub)' },
    { name: 'Bandung', province: 'Jawa Barat', eta: '1-2 hari (SiCepat BEST)' },
    { name: 'Medan', province: 'Sumatera Utara', eta: '1 hari (Pusat Hub Sanubari)' },
    { name: 'Semarang', province: 'Jawa Tengah', eta: '1-2 hari (Reguler JNE)' },
    { name: 'Yogyakarta', province: 'DI Yogyakarta', eta: '1-2 hari (Reguler JNE)' },
    { name: 'Denpasar', province: 'Bali', eta: '1-2 hari (Sanubari Bali Hub)' },
    { name: 'Makassar', province: 'Sulawesi Selatan', eta: '2-3 hari (JNE Cargo/Reg)' },
    { name: 'Balikpapan', province: 'Kalimantan Timur', eta: '2-3 hari (SiCepat)' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#cbd5e1] bg-[#f0f6fc]">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#2563eb]" />
            <h2 className="text-base font-bold text-[#0f172a] font-serif-luxury">
              Pilih Kota Pengiriman
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

        <div className="p-6 space-y-4">
          <p className="text-xs text-[#475569]">
            Pilih lokasi tujuan Anda untuk melihat estimasi ongkos kirim dan ketersediaan layanan ekspedisi instant.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
            {popularCities.map((item) => {
              const isSelected = selectedCity.toLowerCase() === item.name.toLowerCase();
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onSelectCity(item.name);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2563eb] bg-[#dbeafe]/40 text-[#1e40af]'
                      : 'border-[#cbd5e1] bg-white text-[#334155] hover:bg-[#f8fafc]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs">{item.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#2563eb]" />}
                  </div>
                  <span className="text-[11px] text-[#64748b] mt-1">{item.province}</span>
                  <span className="text-[10px] text-emerald-700 font-medium mt-0.5">{item.eta}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
