import React from 'react';
import { X, MapPin, Phone, Clock, Store } from 'lucide-react';
import { OTTEN_STORES } from '../data/mockCoffeeData';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#cbd5e1] bg-[#f0f6fc]">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#2563eb]" />
            <div>
              <h2 className="text-base font-bold text-[#0f172a] font-serif-luxury">
                Sanubari Roastery Experience Stores
              </h2>
              <p className="text-[11px] text-[#64748b]">Kunjungi langsung showroom mesin, slow bar tasting, dan pusat layanan resmi kami</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#dbeafe] text-[#334155] transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OTTEN_STORES.map((store) => (
              <div
                key={store.name}
                className="p-4 rounded-xl border border-[#cbd5e1] bg-[#f0f6fc] hover:border-[#93c5fd] transition-colors space-y-3"
              >
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#2563eb] tracking-wider">
                    {store.city}
                  </div>
                  <h3 className="font-bold text-sm text-[#0f172a] mt-0.5">
                    {store.name}
                  </h3>
                </div>

                <div className="space-y-1 text-xs text-[#334155]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#64748b] shrink-0 mt-0.5" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#64748b] shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#64748b] shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#cbd5e1]">
                  {store.features.map((feat, idx) => (
                    <span key={idx} className="bg-white text-[#475569] border border-[#cbd5e1] text-[10px] px-2 py-0.5 rounded font-medium">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
