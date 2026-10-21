import React from 'react';
import { ArrowRight, ShieldCheck, Flame, Truck, Award, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockCoffeeData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreBeans: () => void;
  onOpenBrewCalculator: () => void;
  onOpenByob: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreBeans, onOpenBrewCalculator, onOpenByob }) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#f0f6fc] pt-4 pb-8 sm:pt-6 sm:pb-12 lg:pt-10 lg:pb-16 border-b border-[#cbd5e1]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Value Propositions */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-[#2563eb] truncate">
              <span>{t.heroPreTitle}</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] font-serif-luxury leading-tight sm:leading-[1.15] text-balance break-words">
              {t.heroHeadline}
            </h1>

            <p className="text-xs xs:text-sm sm:text-base text-[#334155] leading-relaxed max-w-xl">
              {t.heroSubtitle}
            </p>

            {/* Action buttons - Mobile friendly line fit */}
            <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={onOpenByob}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full bg-[#0b192c] hover:bg-[#1e293b] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-blue-900/40"
              >
                <Sparkles className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <span className="whitespace-nowrap">{t.heroCtaByob}</span>
              </button>

              <button
                onClick={onExploreBeans}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-white hover:bg-[#dbeafe] text-[#0f172a] text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-[#cbd5e1]"
              >
                <span className="whitespace-nowrap">{t.heroCtaBeans}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb] shrink-0" />
              </button>

              <button
                onClick={onOpenBrewCalculator}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:py-3.5 rounded-full bg-[#dbeafe] hover:bg-[#bfdbfe] text-[#1e40af] text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-[#bfdbfe]"
              >
                <span className="whitespace-nowrap">{t.heroCtaCalc}</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-3 sm:pt-4 border-t border-[#cbd5e1] flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-[#475569]">
              <div className="flex items-center gap-1.5 shrink-0">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb] shrink-0" />
                <span>{t.heroFreshRoastDate}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563eb] shrink-0" />
                <span>{t.heroPureCoffee}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-[#0b192c] border border-[#cbd5e1] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]">
              <img
                src={HERO_IMAGE}
                alt="Proses seduh kopi manual pour over Sanubari Roastery"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c]/90 via-[#0b192c]/30 to-transparent pointer-events-none" />
              
              {/* Bottom Scrim Badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#38bdf8] block truncate">
                    {t.heroCardTag}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold font-serif-luxury mt-0.5 truncate">
                    {t.heroCardTitle}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/80 mt-0.5 sm:mt-1 max-w-sm line-clamp-2 leading-relaxed">
                    {t.heroCardDesc}
                  </p>
                </div>
                <button
                  onClick={onExploreBeans}
                  className="hidden sm:inline-flex shrink-0 px-3.5 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-semibold text-white border border-white/30 transition-colors cursor-pointer"
                >
                  {t.heroCardBtn}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Value Strip Below Hero */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6 pt-6 sm:pt-8 border-t border-[#cbd5e1]">
          <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/80 border border-[#cbd5e1] shadow-xs">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#dbeafe] text-[#1d4ed8] shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#0f172a] truncate">{t.valueFreshTitle}</p>
              <p className="text-[10px] sm:text-[11px] text-[#64748b] mt-0.5 leading-snug line-clamp-2">{t.valueFreshDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/80 border border-[#cbd5e1] shadow-xs">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#dbeafe] text-[#1d4ed8] shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#0f172a] truncate">{t.valueShippingTitle}</p>
              <p className="text-[10px] sm:text-[11px] text-[#64748b] mt-0.5 leading-snug line-clamp-2">{t.valueShippingDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/80 border border-[#cbd5e1] shadow-xs">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#dbeafe] text-[#1d4ed8] shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#0f172a] truncate">{t.valueWarrantyTitle}</p>
              <p className="text-[10px] sm:text-[11px] text-[#64748b] mt-0.5 leading-snug line-clamp-2">{t.valueWarrantyDesc}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/80 border border-[#cbd5e1] shadow-xs">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#dbeafe] text-[#1d4ed8] shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#0f172a] truncate">{t.valueBaristaTitle}</p>
              <p className="text-[10px] sm:text-[11px] text-[#64748b] mt-0.5 leading-snug line-clamp-2">{t.valueBaristaDesc}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
