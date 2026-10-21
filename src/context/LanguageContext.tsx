import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'id' | 'en';

export interface Translations {
  // Common & Brand
  brandName: string;
  brandTagline: string;
  roasteryLab: string;
  select: string;
  bestseller: string;
  specialty: string;
  notes: string;
  currencyPrefix: string;

  // Header & Announcement
  announcementFreeShipping: string;
  announcementFreeShippingMobile: string;
  announcementGuarantee: string;
  shipTo: string;
  sanubariStores: string;
  searchPlaceholder: string;
  searchPlaceholderMobile: string;
  navBeans: string;
  navManualBrew: string;
  navEspressoMachine: string;
  navGrinder: string;
  navByob: string;
  navCalculator: string;
  navJournal: string;
  wishlistTitle: string;
  cartTitle: string;
  categoryMenu: string;

  // Hero
  heroPreTitle: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroCtaByob: string;
  heroCtaBeans: string;
  heroCtaCalc: string;
  heroFreshRoastDate: string;
  heroPureCoffee: string;
  heroCardTag: string;
  heroCardTitle: string;
  heroCardDesc: string;
  heroCardBtn: string;
  valueFreshTitle: string;
  valueFreshDesc: string;
  valueShippingTitle: string;
  valueShippingDesc: string;
  valueWarrantyTitle: string;
  valueWarrantyDesc: string;
  valueBaristaTitle: string;
  valueBaristaDesc: string;

  // Catalog & Filters
  catalogPreTitle: string;
  catalogHeading: string;
  catAll: string;
  catBeans: string;
  catManualBrew: string;
  catEspressoMachine: string;
  catGrinder: string;
  catAccessories: string;
  roastAll: string;
  specialtyOnlyBtn: string;
  sortByLabel: string;
  sortPopular: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  sortRating: string;
  showingLabel: string;
  productsWord: string;
  searchResultFor: string;
  byobBannerBadge: string;
  byobBannerSub: string;
  byobBannerTitle: string;
  byobBannerDesc: string;
  byobBannerCta: string;
  noProductsFound: string;
  noProductsSub: string;
  resetFiltersBtn: string;

  // BYOB Modal
  byobModalTitle: string;
  byobModalSubtitle: string;
  byobStep1Title: string;
  byobSelectedCount: string;
  byobPricePer250: string;
  byobStep2Title: string;
  byobRatioTotal: string;
  byobPresetsLabel: string;
  byobStep3Title: string;
  byobBlendNameLabel: string;
  byobBlendNamePlaceholder: string;
  byobMessageLabel: string;
  byobMessagePlaceholder: string;
  byobStep4Title: string;
  byobRoastLabel: string;
  byobBrewLabel: string;
  byobBagSizeLabel: string;
  byobGrindLabel: string;
  byobPreviewTitle: string;
  byobFlavorRadarTitle: string;
  byobCostTitle: string;
  byobCostGreen: string;
  byobCostRoast: string;
  byobCostPouch: string;
  byobTotalPerBag: string;
  byobAddToCartBtn: string;
  byobBuyNowBtn: string;
  byobRatioWarning: string;

  // Feature Section
  labPromoPre: string;
  labPromoTitle: string;
  labPromoDesc: string;
  labPromoBtnByob: string;
  labPromoBtnCalc: string;
  labPromoBtnJournal: string;

  // Cart Drawer
  cartDrawerTitle: string;
  cartEmptyTitle: string;
  cartEmptyDesc: string;
  cartStartShopping: string;
  cartVoucherPlaceholder: string;
  cartApplyBtn: string;
  cartSubtotal: string;
  cartDiscount: string;
  cartTotalEstimated: string;
  cartProceedBtn: string;
  cartSecureNotice: string;
  cartSuggestedCode: string;

  // Footer
  footerAboutTitle: string;
  footerAboutText: string;
  footerQuickLinks: string;
  footerCustomerService: string;
  footerStoreTitle: string;
  footerHoursLabel: string;
  footerNewsletterTitle: string;
  footerNewsletterDesc: string;
  footerEmailPlaceholder: string;
  footerSubscribeBtn: string;
  footerCopyright: string;

  // Notifications
  toastAddedCart: string;
  toastRemovedCart: string;
  toastAddedWishlist: string;
  toastRemovedWishlist: string;
  toastLocationChanged: string;
}

const translations: Record<Language, Translations> = {
  id: {
    brandName: 'SANUBARI',
    brandTagline: '',
    roasteryLab: 'Sanubari Roastery',
    select: 'Pilih',
    bestseller: 'Terlaris',
    specialty: 'Specialty',
    notes: 'Notes:',
    currencyPrefix: 'Rp',

    // Header & Announcement
    announcementFreeShipping: 'Gratis Ongkir ke seluruh Indonesia min. belanja Rp 250.000',
    announcementFreeShippingMobile: 'Gratis Ongkir min. Rp 250rb',
    announcementGuarantee: 'Garansi Fresh Roast 100% Kopi Murni',
    shipTo: 'Kirim ke:',
    sanubariStores: 'Kedai Sanubari',
    searchPlaceholder: 'Cari Gayo, V60, Grinder...',
    searchPlaceholderMobile: 'Cari biji kopi, alat seduh, mesin...',
    navBeans: 'Biji Kopi',
    navManualBrew: 'Manual Brew',
    navEspressoMachine: 'Mesin Espresso',
    navGrinder: 'Grinder Kopi',
    navByob: 'BYOB (Custom Blend)',
    navCalculator: 'Kalkulator Seduh',
    navJournal: 'Jurnal Sanubari',
    wishlistTitle: 'Favorit Saya',
    cartTitle: 'Keranjang',
    categoryMenu: 'Kategori Produk',

    // Hero
    heroPreTitle: 'Specialty Coffee Roastery · Malang & Nusantara Heritage',
    heroHeadline: 'Cita Rasa Kopi Nusantara, Disangrai Sempurna Setiap Hari.',
    heroSubtitle: 'Jelajahi kurasi biji kopi pilihan nusantara, alat seduh presisi, atau racik profil blend kopi Anda sendiri melalui studio interaktif BYOB.',
    heroCtaByob: 'Racik Blend Kopi (BYOB)',
    heroCtaBeans: 'Katalog Biji Kopi',
    heroCtaCalc: 'Kalkulator Seduh',
    heroFreshRoastDate: 'Roasting Tanggal Baru',
    heroPureCoffee: '100% Kopi Asli Tanpa Esens',
    heroCardTag: 'Koleksi Single Origin',
    heroCardTitle: 'Sumatra Gayo & Toraja Highlands',
    heroCardDesc: 'Dipetik merah sempurna dari ketinggian 1.600 mdpl dengan profil rasa floral dan madu alami.',
    heroCardBtn: 'Lihat Kopi',
    valueFreshTitle: 'Fresh Roasted',
    valueFreshDesc: 'Disangrai berkala setiap minggu untuk aroma maksimal.',
    valueShippingTitle: 'Gratis Ongkir',
    valueShippingDesc: 'Pengiriman ke seluruh Nusantara min. order 250rb.',
    valueWarrantyTitle: 'Garansi Resmi',
    valueWarrantyDesc: 'Peralatan & mesin kopi asli bergaransi hingga 1 tahun.',
    valueBaristaTitle: 'Bimbingan Barista',
    valueBaristaDesc: 'Konsultasi kalibrasi & resep gratis oleh barista Sanubari.',

    // Catalog & Filters
    catalogPreTitle: 'Katalog Resmi Sanubari Roastery',
    catalogHeading: 'Peralatan Seduh & Kopi Sangrai Segar',
    catAll: 'Semua Koleksi',
    catBeans: 'Biji Kopi',
    catManualBrew: 'Manual Brew',
    catEspressoMachine: 'Mesin Kopi',
    catGrinder: 'Grinder',
    catAccessories: 'Aksesoris',
    roastAll: 'Semua Tingkat Sangrai',
    specialtyOnlyBtn: 'Specialty Grade Only',
    sortByLabel: 'Urutkan:',
    sortPopular: 'Paling Populer',
    sortPriceAsc: 'Harga: Rendah ke Tinggi',
    sortPriceDesc: 'Harga: Tinggi ke Rendah',
    sortRating: 'Rating Tertinggi',
    showingLabel: 'Menampilkan',
    productsWord: 'produk',
    searchResultFor: 'Cari:',
    byobBannerBadge: 'Fitur Eksklusif',
    byobBannerSub: 'BYOB (Build Your Own Blend)',
    byobBannerTitle: 'Ingin Meracik Komposisi Biji Kopi Signature Anda Sendiri?',
    byobBannerDesc: 'Pilih 2–3 biji kopi pilihan (Dampit, Gayo, Toraja, Flores, Bali), atur rasio persentase rasa, profil sangrai, dan cetak nama blend Anda di kemasan valve pouch kami.',
    byobBannerCta: 'Buka Studio BYOB Sekarang',
    noProductsFound: 'Tidak ada produk yang sesuai kriteria.',
    noProductsSub: 'Coba ganti kata kunci pencarian atau ubah filter sangrai.',
    resetFiltersBtn: 'Reset Semua Filter',

    // BYOB Modal
    byobModalTitle: 'Studio Racik Kopi Mandiri',
    byobModalSubtitle: 'Terinspirasi dari Tradisi Roasting Malang',
    byobStep1Title: 'Pilih Biji Kopi (2 - 3 Pilihan)',
    byobSelectedCount: 'Terpilih:',
    byobPricePer250: 'Harga /250g:',
    byobStep2Title: 'Atur Rasio Campuran (Wajib 100%)',
    byobRatioTotal: 'Total Rasio:',
    byobPresetsLabel: 'Preset Rekomendasi Barista:',
    byobStep3Title: 'Kustomisasi Nama & Pesan Kemasan',
    byobBlendNameLabel: 'Nama Blend Kustom Anda',
    byobBlendNamePlaceholder: 'Contoh: Malang Heritage Crema',
    byobMessageLabel: 'Pesan / Catatan di Label Kemasan',
    byobMessagePlaceholder: 'Contoh: Batch khusus diracik dengan penuh dedikasi',
    byobStep4Title: 'Profil Sangrai & Ukuran Kemasan',
    byobRoastLabel: 'Tingkat Sangrai (Roast Profile)',
    byobBrewLabel: 'Metode Seduh yang Dituju',
    byobBagSizeLabel: 'Ukuran Kemasan (Valve Pouch)',
    byobGrindLabel: 'Pilihan Gilingan (Grind Size)',
    byobPreviewTitle: 'Simulasi Kemasan Pouch Kustom',
    byobFlavorRadarTitle: 'Prediksi Karakter Rasa (Cupping Score)',
    byobCostTitle: 'Transparansi Biaya Produksi (Ala NiR Coffee)',
    byobCostGreen: 'Biaya Green Bean Pilihan',
    byobCostRoast: 'Jasa Sangrai & Quality Control Lab',
    byobCostPouch: 'Pouch Valve & Cetak Label Kustom',
    byobTotalPerBag: 'Total Harga per Kemasan',
    byobAddToCartBtn: 'Tambah Custom Blend ke Keranjang',
    byobBuyNowBtn: 'Beli Langsung Custom Blend',
    byobRatioWarning: 'Total rasio harus tepat 100% sebelum dapat dipesan',

    // Feature Section
    labPromoPre: 'Sanubari Coffee Roasting & Brewing Lab',
    labPromoTitle: 'Racik Blend Kopi Kustom Anda atau Seduh Seperti Barista',
    labPromoDesc: 'Gunakan studio BYOB (Build Your Own Blend) untuk memadukan kopi Dampit, Gayo, dan Toraja dengan persentase Anda sendiri, atau gunakan kalkulator seduh presisi V60 kami.',
    labPromoBtnByob: 'Racik Blend Kopi (BYOB)',
    labPromoBtnCalc: 'Buka Panduan Seduh V60',
    labPromoBtnJournal: 'Baca Resep & Tips Barista',

    // Cart Drawer
    cartDrawerTitle: 'Keranjang Belanja',
    cartEmptyTitle: 'Keranjang Anda masih kosong',
    cartEmptyDesc: 'Temukan biji kopi specialty atau alat seduh favorit Anda sekarang.',
    cartStartShopping: 'Mulai Belanja',
    cartVoucherPlaceholder: 'Kode Voucher (cth: SANUBARI15)',
    cartApplyBtn: 'Gunakan',
    cartSubtotal: 'Subtotal Belanja',
    cartDiscount: 'Diskon Promo',
    cartTotalEstimated: 'Total Estimasi',
    cartProceedBtn: 'Lanjut ke Pembayaran',
    cartSecureNotice: 'Transaksi Aman & Bergaransi Pengiriman Sanubari Roastery',
    cartSuggestedCode: 'Gunakan kode SANUBARI15 untuk diskon 15%',

    // Footer
    footerAboutTitle: 'Tentang Sanubari Roastery',
    footerAboutText: 'Roastery kopi specialty dan lab kalibrasi seduh yang berdedikasi melestarikan kekayaan rasa kopi Indonesia dari perkebunan Dampit Malang hingga penjuru Nusantara.',
    footerQuickLinks: 'Tautan Cepat',
    footerCustomerService: 'Layanan Pelanggan',
    footerStoreTitle: 'Lokasi & Jam Buka Kedai',
    footerHoursLabel: 'Senin – Minggu: 08:00 – 21:00 WIB',
    footerNewsletterTitle: 'Dapatkan Wawasan Sangrai & Resep Eksklusif',
    footerNewsletterDesc: 'Berlangganan kabar diskon awal bulan dan rilis terbatas single origin terbaru.',
    footerEmailPlaceholder: 'Alamat email Anda...',
    footerSubscribeBtn: 'Daftar',
    footerCopyright: 'Hak Cipta Terpelihara. Sanubari Roastery & Coffee Lab Indonesia.',

    // Notifications
    toastAddedCart: 'ditambahkan ke keranjang!',
    toastRemovedCart: 'Produk dihapus dari keranjang',
    toastAddedWishlist: 'Ditambahkan ke Favorit',
    toastRemovedWishlist: 'Dihapus dari Favorit',
    toastLocationChanged: 'Lokasi tujuan diubah ke:',
  },
  en: {
    brandName: 'SANUBARI',
    brandTagline: '',
    roasteryLab: 'Sanubari Roastery',
    select: 'Select',
    bestseller: 'Bestseller',
    specialty: 'Specialty',
    notes: 'Notes:',
    currencyPrefix: 'Rp',

    // Header & Announcement
    announcementFreeShipping: 'Free nationwide delivery across Indonesia on orders over Rp 250,000',
    announcementFreeShippingMobile: 'Free Shipping min. Rp 250k',
    announcementGuarantee: 'Fresh Roast Guarantee · 100% Pure Coffee',
    shipTo: 'Ship to:',
    sanubariStores: 'Sanubari Stores',
    searchPlaceholder: 'Search Gayo, V60, Grinders...',
    searchPlaceholderMobile: 'Search beans, brew tools, machines...',
    navBeans: 'Coffee Beans',
    navManualBrew: 'Manual Brew',
    navEspressoMachine: 'Espresso Machines',
    navGrinder: 'Coffee Grinders',
    navByob: 'BYOB (Custom Blend)',
    navCalculator: 'Brew Calculator',
    navJournal: 'Sanubari Journal',
    wishlistTitle: 'My Wishlist',
    cartTitle: 'Cart',
    categoryMenu: 'Product Categories',

    // Hero
    heroPreTitle: 'Specialty Coffee Roastery · Malang & Indonesian Heritage',
    heroHeadline: 'Authentic Indonesian Coffee, Roasted Fresh to Perfection Daily.',
    heroSubtitle: 'Explore our curated Indonesian specialty single origins, precision manual brew gear, or craft your signature coffee blend in our interactive BYOB studio.',
    heroCtaByob: 'Craft Custom Blend (BYOB)',
    heroCtaBeans: 'Coffee Bean Catalog',
    heroCtaCalc: 'Brew Calculator',
    heroFreshRoastDate: 'Recent Roast Dates',
    heroPureCoffee: '100% Pure Coffee, Zero Additives',
    heroCardTag: 'Single Origin Collection',
    heroCardTitle: 'Sumatra Gayo & Toraja Highlands',
    heroCardDesc: 'Hand-picked ripe red cherries from 1,600 masl with delicate floral jasmine and wild honey notes.',
    heroCardBtn: 'Explore Coffee',
    valueFreshTitle: 'Fresh Roasted',
    valueFreshDesc: 'Batch roasted weekly for peak aroma and balanced sweetness.',
    valueShippingTitle: 'Free Shipping',
    valueShippingDesc: 'Free nationwide delivery across Indonesia for orders over Rp 250k.',
    valueWarrantyTitle: 'Official Warranty',
    valueWarrantyDesc: 'Authentic espresso machines & grinders with 1-year warranty.',
    valueBaristaTitle: 'Barista Guidance',
    valueBaristaDesc: 'Complimentary dial-in support & brew recipes by Sanubari baristas.',

    // Catalog & Filters
    catalogPreTitle: 'Official Sanubari Roastery Catalog',
    catalogHeading: 'Precision Brewing Gear & Fresh Roasted Coffee',
    catAll: 'All Collections',
    catBeans: 'Coffee Beans',
    catManualBrew: 'Manual Brew',
    catEspressoMachine: 'Espresso Machines',
    catGrinder: 'Grinders',
    catAccessories: 'Accessories',
    roastAll: 'All Roast Levels',
    specialtyOnlyBtn: 'Specialty Grade Only',
    sortByLabel: 'Sort By:',
    sortPopular: 'Most Popular',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    sortRating: 'Highest Rating',
    showingLabel: 'Showing',
    productsWord: 'products',
    searchResultFor: 'Search:',
    byobBannerBadge: 'Exclusive Feature',
    byobBannerSub: 'BYOB (Build Your Own Blend)',
    byobBannerTitle: 'Want to Craft Your Own Signature Coffee Blend?',
    byobBannerDesc: 'Select 2–3 origin beans (Dampit, Gayo, Toraja, Flores, Bali), calibrate ratio percentages, pick your roast profile, and print your custom name on our valve pouch.',
    byobBannerCta: 'Launch BYOB Studio Now',
    noProductsFound: 'No products match your criteria.',
    noProductsSub: 'Try searching with different keywords or adjust the roast level filter.',
    resetFiltersBtn: 'Reset All Filters',

    // BYOB Modal
    byobModalTitle: 'Custom Coffee Roasting Studio',
    byobModalSubtitle: 'Inspired by Artisanal Malang Roasting Tradition',
    byobStep1Title: 'Select Origin Beans (2 - 3 Varieties)',
    byobSelectedCount: 'Selected:',
    byobPricePer250: 'Price /250g:',
    byobStep2Title: 'Adjust Blend Ratios (Must Equal 100%)',
    byobRatioTotal: 'Total Ratio:',
    byobPresetsLabel: 'Barista Recommended Presets:',
    byobStep3Title: 'Custom Name & Packaging Label',
    byobBlendNameLabel: 'Your Signature Blend Name',
    byobBlendNamePlaceholder: 'e.g. Malang Heritage Crema',
    byobMessageLabel: 'Message / Roaster Note on Label',
    byobMessagePlaceholder: 'e.g. Handcrafted batch roasted with dedicated passion',
    byobStep4Title: 'Roast Profile & Packaging Size',
    byobRoastLabel: 'Roast Level (Roast Profile)',
    byobBrewLabel: 'Intended Brew Method',
    byobBagSizeLabel: 'Package Size (Valve Pouch)',
    byobGrindLabel: 'Grind Size Option',
    byobPreviewTitle: 'Live Custom Pouch Preview',
    byobFlavorRadarTitle: 'Predicted Sensory Profile (Cupping Score)',
    byobCostTitle: 'Transparent Production Cost (NiR Coffee Style)',
    byobCostGreen: 'Selected Green Beans Cost',
    byobCostRoast: 'Roasting & QC Lab Calibration',
    byobCostPouch: 'Valve Pouch & Custom Label Print',
    byobTotalPerBag: 'Total Price per Bag',
    byobAddToCartBtn: 'Add Custom Blend to Cart',
    byobBuyNowBtn: 'Buy Custom Blend Now',
    byobRatioWarning: 'Total ratio must equal exactly 100% to proceed',

    // Feature Section
    labPromoPre: 'Sanubari Coffee Roasting & Brewing Lab',
    labPromoTitle: 'Craft Your Signature Blend or Brew Like a Barista',
    labPromoDesc: 'Use our BYOB (Build Your Own Blend) studio to blend Dampit, Gayo, and Toraja beans with your custom ratios, or dial in the perfect cup with our V60 timer.',
    labPromoBtnByob: 'Craft Custom Blend (BYOB)',
    labPromoBtnCalc: 'Open V60 Brew Guide',
    labPromoBtnJournal: 'Read Barista Recipes & Tips',

    // Cart Drawer
    cartDrawerTitle: 'Shopping Cart',
    cartEmptyTitle: 'Your cart is empty',
    cartEmptyDesc: 'Discover fresh roasted specialty beans or favorite brew equipment now.',
    cartStartShopping: 'Start Shopping',
    cartVoucherPlaceholder: 'Voucher Code (e.g. SANUBARI15)',
    cartApplyBtn: 'Apply',
    cartSubtotal: 'Subtotal',
    cartDiscount: 'Promo Discount',
    cartTotalEstimated: 'Estimated Total',
    cartProceedBtn: 'Proceed to Checkout',
    cartSecureNotice: 'Safe Checkout & Guaranteed Sanubari Roastery Delivery',
    cartSuggestedCode: 'Use code SANUBARI15 for 15% discount',

    // Footer
    footerAboutTitle: 'About Sanubari Roastery',
    footerAboutText: 'Specialty coffee roastery and dial-in calibration lab dedicated to preserving authentic Indonesian coffee origins, from Dampit Malang estates to every corner of the archipelago.',
    footerQuickLinks: 'Quick Links',
    footerCustomerService: 'Customer Service',
    footerStoreTitle: 'Locations & Store Hours',
    footerHoursLabel: 'Monday – Sunday: 08:00 – 21:00 WIB',
    footerNewsletterTitle: 'Get Roasting Insights & Exclusive Recipes',
    footerNewsletterDesc: 'Subscribe for seasonal discounts and rare single origin releases.',
    footerEmailPlaceholder: 'Your email address...',
    footerSubscribeBtn: 'Subscribe',
    footerCopyright: 'All Rights Reserved. Sanubari Roastery & Coffee Lab Indonesia.',

    // Notifications
    toastAddedCart: 'added to cart!',
    toastRemovedCart: 'Item removed from cart',
    toastAddedWishlist: 'Added to Wishlist',
    toastRemovedWishlist: 'Removed from Wishlist',
    toastLocationChanged: 'Destination location changed to:',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('sanubari_lang');
      if (saved === 'id' || saved === 'en') return saved;
    } catch {
      // fallback
    }
    return 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sanubari_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
