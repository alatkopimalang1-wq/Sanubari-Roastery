import React, { useState } from 'react';
import { ShoppingBag, Search, MapPin, Heart, Menu, X, Sparkles, Globe } from 'lucide-react';
import { formatRupiah } from '../utils/formatCurrency';
import { SanubariLogo } from './SanubariLogo';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  selectedCity: string;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenLocation: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenBrewCalculator: () => void;
  onOpenJournal: () => void;
  onOpenStoreLocator: () => void;
  onOpenByob: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  selectedCity,
  onOpenCart,
  onOpenWishlist,
  onOpenLocation,
  onSelectCategory,
  onOpenBrewCalculator,
  onOpenJournal,
  onOpenStoreLocator,
  onOpenByob,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-[#f0f6fc]/95 backdrop-blur-md border-b border-[#cbd5e1] shadow-xs transition-all">

      {/* Main Navigation Bar - Balanced height (56px mobile, 60px tablet, 64px desktop) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-4 xl:gap-6 h-14 sm:h-15 lg:h-16">
          
          {/* Zone 1: Mobile Hamburger & Brand Logo */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#0f172a] hover:bg-[#dbeafe] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center text-[#0f172a] group cursor-pointer"
              aria-label="Sanubari Roastery Home"
            >
              <SanubariLogo size="md" variant="horizontal" theme="light" />
            </a>
          </div>

          {/* Zone 2: Search Input on Desktop (Centered, spacious & elegant) */}
          <div className="relative hidden md:block flex-1 max-w-md lg:max-w-lg mx-3 sm:mx-6">
            <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#e2e8f0]/80 border border-[#cbd5e1] rounded-full pl-9 pr-8 py-1.5 sm:py-2 text-xs text-[#0f172a] placeholder:text-[#64748b] focus:outline-none focus:border-[#2563eb] focus:bg-white transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a] text-xs cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          {/* Zone 3: Actions - Language, Location, Wishlist & Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#e2e8f0] rounded-full p-0.5 border border-[#cbd5e1] text-[10px]">
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-1.5 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                  language === 'id'
                    ? 'bg-[#2563eb] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0f172a]'
                }`}
                title="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded-full font-bold transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#2563eb] text-white shadow-xs'
                    : 'text-[#475569] hover:text-[#0f172a]'
                }`}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Destination Location */}
            <button
              onClick={onOpenLocation}
              className="hidden lg:flex items-center gap-1 text-[#334155] hover:text-[#2563eb] transition-colors cursor-pointer text-xs"
              title="Pilih kota tujuan"
            >
              <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="font-semibold underline decoration-dotted">{selectedCity}</span>
            </button>

            {/* Mobile search toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="md:hidden p-1.5 text-[#334155] hover:bg-[#dbeafe] rounded-full transition-colors cursor-pointer"
              aria-label="Cari produk"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 text-[#334155] hover:bg-[#dbeafe] rounded-full transition-colors cursor-pointer"
              aria-label={t.wishlistTitle}
              title={t.wishlistTitle}
            >
              <Heart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#2563eb] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 bg-[#0b192c] hover:bg-[#1e293b] text-white px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all duration-200 shadow-xs cursor-pointer border border-blue-900/40"
              aria-label={t.cartTitle}
            >
              <div className="relative">
                <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#38bdf8]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#2563eb] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold tabular-nums text-[#93c5fd]">
                {cartTotal > 0 ? formatRupiah(cartTotal) : t.cartTitle}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search expand */}
        {showSearchInput && (
          <div className="md:hidden py-2 border-t border-[#cbd5e1] animate-fadeIn">
            <div className="relative">
              <Search className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder={t.searchPlaceholderMobile}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#e2e8f0]/90 border border-[#cbd5e1] rounded-full pl-9 pr-8 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#2563eb] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a] text-sm"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f0f6fc] border-t border-[#cbd5e1] px-4 sm:px-6 py-3.5 space-y-3.5 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#cbd5e1]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0f172a]">
              <Globe className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>{language === 'id' ? 'Pilihan Bahasa:' : 'Language:'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'id'
                    ? 'bg-[#2563eb] text-white shadow-xs'
                    : 'bg-[#e2e8f0] text-[#334155] hover:bg-[#cbd5e1]'
                }`}
              >
                🇮🇩 Indonesia
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#2563eb] text-white shadow-xs'
                    : 'bg-[#e2e8f0] text-[#334155] hover:bg-[#cbd5e1]'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-bold tracking-wider text-[#64748b] uppercase">{t.categoryMenu}</p>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                onClick={() => {
                  onSelectCategory('beans');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-[#dbeafe] text-[#0f172a] bg-white border border-[#cbd5e1] cursor-pointer"
              >
                {t.navBeans}
              </button>
              <button
                onClick={() => {
                  onSelectCategory('manual_brew');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-[#dbeafe] text-[#0f172a] bg-white border border-[#cbd5e1] cursor-pointer"
              >
                {t.navManualBrew}
              </button>
              <button
                onClick={() => {
                  onSelectCategory('espresso_machine');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-[#dbeafe] text-[#0f172a] bg-white border border-[#cbd5e1] cursor-pointer"
              >
                {t.navEspressoMachine}
              </button>
              <button
                onClick={() => {
                  onSelectCategory('grinder');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2 rounded-lg hover:bg-[#dbeafe] text-[#0f172a] bg-white border border-[#cbd5e1] cursor-pointer"
              >
                {t.navGrinder}
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-[#cbd5e1] space-y-2">
            <button
              onClick={() => {
                onOpenByob();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-xl bg-[#0b192c] text-white font-semibold text-xs border border-blue-900/60 cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>BYOB: Build Your Own Blend</span>
              </div>
              <span className="text-[9px] bg-[#2563eb] text-white px-1.5 py-0.5 rounded-full font-bold">Custom</span>
            </button>
            <button
              onClick={() => {
                onOpenBrewCalculator();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-xl bg-[#dbeafe] text-[#1e40af] font-semibold text-xs cursor-pointer"
            >
              <span>{t.navCalculator}</span>
              <span className="text-[9px] bg-[#2563eb] text-white px-1.5 py-0.5 rounded-full">Timer</span>
            </button>
            <button
              onClick={() => {
                onOpenJournal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#dbeafe] text-[#0f172a] text-xs font-medium cursor-pointer"
            >
              {t.navJournal}
            </button>
            <button
              onClick={() => {
                onOpenStoreLocator();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-[#dbeafe] text-[#0f172a] text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>{t.sanubariStores}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
