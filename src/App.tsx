import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/mockCoffeeData';
import { Product, CartItem, CoffeeCategory, GrindOption, CustomBlendDetails } from './types/coffee';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BrewCalculator } from './components/BrewCalculator';
import { ByobModal } from './components/ByobModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OttenJournal } from './components/OttenJournal';
import { LocationModal } from './components/LocationModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { t, language } = useLanguage();

  // Navigation & Category state
  const [selectedCategory, setSelectedCategory] = useState<CoffeeCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('Malang');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isBrewCalculatorOpen, setIsBrewCalculatorOpen] = useState<boolean>(false);
  const [isByobOpen, setIsByobOpen] = useState<boolean>(false);
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Cart & Promo state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      productId: 'prod-gayo-specialty',
      product: PRODUCTS[0],
      selectedVariant: '200 gram',
      selectedGrind: 'Giling Sedang (V60 / Pour Over)',
      unitPrice: 98000,
      quantity: 1,
    },
    {
      id: 'cart-init-2',
      productId: 'prod-pourover-v60-kit',
      product: PRODUCTS[1],
      selectedVariant: 'Matte White Edition',
      unitPrice: 245000,
      quantity: 1,
    },
  ]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-gayo-specialty', 'prod-hand-grinder-precision']);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  const cartTotalCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    grind?: GrindOption,
    variantName?: string,
    quantity: number = 1,
    customBlendDetails?: CustomBlendDetails
  ) => {
    const selectedVariant = variantName || (product.variants ? product.variants[0].weightOrSpec : 'Standar');
    const matchedVariant = product.variants?.find((v) => v.weightOrSpec === selectedVariant);
    const unitPrice = matchedVariant 
      ? Math.round(product.price * matchedVariant.priceMultiplier) 
      : product.price;

    const existingIndex = cartItems.findIndex(
      (item) =>
        item.productId === product.id &&
        item.selectedVariant === selectedVariant &&
        item.selectedGrind === grind &&
        !item.customBlendDetails // separate entry for custom blends
    );

    if (existingIndex > -1 && !customBlendDetails) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        product,
        selectedGrind: grind,
        selectedVariant,
        unitPrice,
        quantity,
        customBlendDetails,
      };
      setCartItems((prev) => [newItem, ...prev]);
    }

    // Recalculate promo if percentage based
    if (appliedPromo === 'OTTENBARISTA' || appliedPromo === 'SANUBARI15') {
      const newSub = cartSubtotal + unitPrice * quantity;
      setDiscountAmount(Math.round(newSub * 0.15));
    }

    showToast(`✓ "${product.name}" ditambahkan ke keranjang!`);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  // Buy now handler
  const handleBuyNow = (
    product: Product,
    grind?: GrindOption,
    variantName?: string,
    quantity: number = 1,
    customBlendDetails?: CustomBlendDetails
  ) => {
    handleAddToCart(product, grind, variantName, quantity, customBlendDetails);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Cart quantity update
  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove cart item
  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Produk dihapus dari keranjang');
  };

  // Promo code logic
  const handleApplyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SANUBARI15' || clean === 'OTTENBARISTA') {
      const disc = Math.round(cartSubtotal * 0.15);
      setAppliedPromo(clean);
      setDiscountAmount(disc);
      return { success: true, message: 'Voucher Diskon 15% Berhasil Digunakan!' };
    }
    if (clean === 'KOPISANTUY') {
      const disc = Math.min(25000, cartSubtotal);
      setAppliedPromo('KOPISANTUY');
      setDiscountAmount(disc);
      return { success: true, message: 'Potongan Rp 25.000 Berhasil Digunakan!' };
    }
    if (clean === 'GRATISONGKIR') {
      setAppliedPromo('GRATISONGKIR');
      setDiscountAmount(0); // free shipping handled in shipping section
      return { success: true, message: 'Gratis Ongkir Seluruh Indonesia Aktif!' };
    }
    return { success: false, message: 'Kode voucher tidak valid atau sudah kedaluwarsa.' };
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
    showToast('Voucher dihapus');
  };

  // Wishlist handler
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Dihapus dari Favorit`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`✓ Ditambahkan ke Favorit`);
    }
  };

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const handleCategoryNav = (cat: string) => {
    setSelectedCategory(cat as CoffeeCategory);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f6fc] text-[#0f172a]">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f172a] text-[#f8fafc] text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-blue-500/40 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        cartCount={cartTotalCount}
        cartTotal={cartSubtotal}
        wishlistCount={wishlistIds.length}
        selectedCity={selectedCity}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        onSelectCategory={handleCategoryNav}
        onOpenBrewCalculator={() => setIsBrewCalculatorOpen(true)}
        onOpenJournal={() => setIsJournalOpen(true)}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        onOpenByob={() => setIsByobOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <Hero
          onExploreBeans={() => handleCategoryNav('beans')}
          onOpenBrewCalculator={() => setIsBrewCalculatorOpen(true)}
          onOpenByob={() => setIsByobOpen(true)}
        />

        {/* Product Catalog & Filter section */}
        <ProductCatalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={(p) => handleAddToCart(p)}
          onOpenByob={() => setIsByobOpen(true)}
        />

        {/* Feature Section: Interactive Barista Brewing & BYOB Custom Roasting Promo */}
        <section className="py-8 sm:py-12 bg-[#e6f0fa] border-t border-b border-[#cbd5e1]">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="bg-[#0b192c] rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-xl border border-blue-900/50">
              <div className="max-w-xl space-y-3 sm:space-y-4 relative z-10">
                <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-[#38bdf8] block">
                  {t.labPromoPre}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-serif-luxury leading-snug break-words">
                  {t.labPromoTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  {t.labPromoDesc}
                </p>
                <div className="pt-2 flex flex-col xs:flex-row flex-wrap gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setIsByobOpen(true)}
                    className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-blue-900/30 flex items-center justify-center gap-1.5"
                  >
                    <span>{t.labPromoBtnByob}</span>
                  </button>
                  <button
                    onClick={() => setIsBrewCalculatorOpen(true)}
                    className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#f0f7ff] text-xs font-bold transition-colors cursor-pointer border border-white/20 text-center"
                  >
                    {t.labPromoBtnCalc}
                  </button>
                  <button
                    onClick={() => setIsJournalOpen(true)}
                    className="px-3.5 py-2 sm:px-4 sm:py-3 rounded-full bg-transparent hover:bg-white/10 text-[#cbd5e1] text-xs font-medium transition-colors cursor-pointer text-center"
                  >
                    {t.labPromoBtnJournal}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleCategoryNav}
        onOpenBrewCalculator={() => setIsBrewCalculatorOpen(true)}
        onOpenJournal={() => setIsJournalOpen(true)}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        onOpenByob={() => setIsByobOpen(true)}
      />

      {/* BYOB (Build Your Own Blend) Custom Product Modal */}
      <ByobModal
        isOpen={isByobOpen}
        onClose={() => setIsByobOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Interactive Brew Calculator & Timer */}
      <BrewCalculator
        isOpen={isBrewCalculatorOpen}
        onClose={() => setIsBrewCalculatorOpen(false)}
      />

      {/* Sanubari Journal & Magazine */}
      <OttenJournal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        discountAmount={discountAmount}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* Indonesian Multi-step Checkout */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        initialCity={selectedCity}
        onOrderComplete={() => {
          setCartItems([]);
          setAppliedPromo(null);
          setDiscountAmount(0);
          showToast('Pesanan berhasil dibuat! Cek nomor resi di WhatsApp.');
        }}
      />

      {/* Destination Location Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          showToast(`Lokasi tujuan diubah ke: ${city}`);
        }}
      />

      {/* Experience Stores Locator Modal */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onSelectProduct={(p) => {
          setIsWishlistOpen(false);
          setSelectedProduct(p);
        }}
      />
    </div>
  );
}
