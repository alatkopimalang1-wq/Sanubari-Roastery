import React from 'react';
import { Coffee, ShieldCheck, Mail, Phone, Award } from 'lucide-react';
import { SanubariLogo } from './SanubariLogo';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onSelectCategory: (cat: any) => void;
  onOpenBrewCalculator: () => void;
  onOpenJournal: () => void;
  onOpenStoreLocator: () => void;
  onOpenByob?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenBrewCalculator,
  onOpenJournal,
  onOpenStoreLocator,
  onOpenByob,
}) => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-[#0b192c] text-[#cbd5e1] border-t border-blue-950">
      {/* Top Value Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-b border-blue-900/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#13233c] flex items-center justify-center shrink-0 text-[#38bdf8] border border-blue-800/40">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">Q-Grader Certified Roaster</h4>
              <p className="text-[11px] sm:text-xs text-[#94a3b8] mt-0.5 leading-relaxed">
                {language === 'id' 
                  ? 'Profil sangrai dirancang dan dikalibrasi oleh Q-Grader profesional tersertifikasi internasional.'
                  : 'Roast profiles calibrated by certified Q-Graders for balanced sweetness and clarity.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#13233c] flex items-center justify-center shrink-0 text-[#38bdf8] border border-blue-800/40">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                {language === 'id' ? '100% Kemurnian Terjamin' : '100% Pure Coffee Guarantee'}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#94a3b8] mt-0.5 leading-relaxed">
                {language === 'id'
                  ? 'Biji kopi murni tanpa campuran jagung, perisa sintesis, maupun bahan kimia pengawet.'
                  : 'Pure origin beans without fillers, synthetic flavoring, or chemical preservatives.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#13233c] flex items-center justify-center shrink-0 text-[#38bdf8] border border-blue-800/40">
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                {language === 'id' ? 'Kemitraan Petani Lokal' : 'Direct Farmer Partnerships'}
              </h4>
              <p className="text-[11px] sm:text-xs text-[#94a3b8] mt-0.5 leading-relaxed">
                {language === 'id'
                  ? 'Mendukung kesejahteraan petani kopi di Dampit Malang, Gayo, Toraja, hingga Bali Kintamani.'
                  : 'Supporting farmer livelihoods in Dampit Malang, Sumatra Gayo, Toraja, and Bali.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <SanubariLogo size="md" variant="horizontal" theme="dark" />

            <p className="text-xs text-[#94a3b8] leading-relaxed max-w-sm">
              {t.footerAboutText}
            </p>

            <div className="space-y-1.5 text-xs text-[#94a3b8]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                <span className="truncate">Customer Care: 0812-3456-7890 (08.00 - 21.00 WIB)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
                <span>support@sanubari.id</span>
              </div>
            </div>
          </div>

          {/* Belanja Kopi */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              {language === 'id' ? 'Produk & Belanja' : 'Shop & Products'}
            </h5>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              {onOpenByob && (
                <li>
                  <button onClick={onOpenByob} className="text-[#38bdf8] font-bold hover:underline transition-colors cursor-pointer flex items-center gap-1.5">
                    <span>BYOB: Custom Blend</span>
                    <span className="text-[9px] bg-blue-800 text-white px-1.5 py-0.5 rounded">Studio</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => onSelectCategory('beans')} className="hover:text-[#38bdf8] transition-colors cursor-pointer text-left">
                  {language === 'id' ? 'Biji Kopi Single Origin' : 'Single Origin Beans'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('beans')} className="hover:text-[#38bdf8] transition-colors cursor-pointer text-left">
                  {language === 'id' ? 'Espresso House Blend' : 'Espresso House Blend'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('manual_brew')} className="hover:text-[#38bdf8] transition-colors cursor-pointer text-left">
                  {language === 'id' ? 'Dripper & Server V60' : 'V60 Dripper & Server Kits'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('espresso_machine')} className="hover:text-[#38bdf8] transition-colors cursor-pointer text-left">
                  {language === 'id' ? 'Mesin Espresso Rumahan' : 'Home Espresso Machines'}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('grinder')} className="hover:text-[#38bdf8] transition-colors cursor-pointer text-left">
                  {language === 'id' ? 'Manual & Electric Grinder' : 'Manual & Electric Grinders'}
                </button>
              </li>
            </ul>
          </div>

          {/* Edukasi & Layanan */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              {language === 'id' ? 'Edukasi & Panduan' : 'Education & Guides'}
            </h5>
            <ul className="space-y-2 text-xs text-[#94a3b8]">
              <li>
                <button onClick={onOpenBrewCalculator} className="hover:text-[#38bdf8] transition-colors cursor-pointer text-left">
                  {t.navCalculator}
                </button>
              </li>
              <li>
                <button onClick={onOpenJournal} className="hover:text-[#38bdf8] transition-colors cursor-pointer text-left">
                  {t.navJournal}
                </button>
              </li>
              <li>
                <button onClick={onOpenStoreLocator} className="hover:text-[#38bdf8] transition-colors cursor-pointer text-left">
                  {t.sanubariStores}
                </button>
              </li>
              <li>
                <span className="text-[#64748b]">Sanubari Barista Lab & Academy</span>
              </li>
            </ul>
          </div>

          {/* Metode Pembayaran & Pengiriman */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              {language === 'id' ? 'Pembayaran & Ekspedisi' : 'Payment & Delivery'}
            </h5>
            <div className="text-xs text-[#94a3b8] space-y-2">
              <p className="text-[11px]">{language === 'id' ? 'Metode Pembayaran Resmi:' : 'Official Payments:'}</p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                <span className="bg-[#13233c] px-2 py-0.5 rounded text-white border border-blue-800/30">BCA VA</span>
                <span className="bg-[#13233c] px-2 py-0.5 rounded text-white border border-blue-800/30">Mandiri VA</span>
                <span className="bg-[#13233c] px-2 py-0.5 rounded text-white border border-blue-800/30">QRIS</span>
                <span className="bg-[#13233c] px-2 py-0.5 rounded text-white border border-blue-800/30">Visa / Master</span>
              </div>

              <p className="text-[11px] pt-1">{language === 'id' ? 'Ekspedisi Terpercaya:' : 'Reliable Couriers:'}</p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                <span className="bg-[#13233c] px-2 py-0.5 rounded text-[#cbd5e1] border border-blue-800/30">JNE Reguler</span>
                <span className="bg-[#13233c] px-2 py-0.5 rounded text-[#cbd5e1] border border-blue-800/30">SiCepat BEST</span>
                <span className="bg-[#13233c] px-2 py-0.5 rounded text-[#cbd5e1] border border-blue-800/30">GoSend Instant</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748b] text-center sm:text-left">
          <p>© 2026 PT Sanubari Roastery Indonesia. {language === 'id' ? 'Hak Cipta Dilindungi.' : 'All Rights Reserved.'}</p>
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 text-[11px]">
            <span>{language === 'id' ? 'Syarat & Ketentuan' : 'Terms & Conditions'}</span>
            <span>·</span>
            <span>{language === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}</span>
            <span>·</span>
            <span>{language === 'id' ? 'Garansi & Retur' : 'Warranty & Returns'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
