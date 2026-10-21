import React, { useState, useMemo } from 'react';
import { 
  X, 
  Sparkles, 
  Sliders, 
  Coffee, 
  Flame, 
  Check, 
  Plus, 
  Minus, 
  AlertCircle, 
  Package, 
  Info, 
  ShoppingBag, 
  ArrowRight,
  RotateCcw,
  Tag,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { BYOB_COFFEE_OPTIONS, BYOB_PRESET_RATIOS } from '../data/byobData';
import { BlendComponentOption, CustomBlendDetails, GrindOption, RoastLevel, Product } from '../types/coffee';
import { formatRupiah } from '../utils/formatCurrency';
import { SanubariLogoMark } from './SanubariLogo';
import { useLanguage } from '../context/LanguageContext';

interface ByobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customProduct: Product, grind?: GrindOption, variantName?: string, quantity?: number, customBlendDetails?: CustomBlendDetails) => void;
  onBuyNow: (customProduct: Product, grind?: GrindOption, variantName?: string, quantity?: number, customBlendDetails?: CustomBlendDetails) => void;
}

export const ByobModal: React.FC<ByobModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  const { t, language } = useLanguage();

  // Selected component coffees (2 to 3)
  const [selectedCoffeeIds, setSelectedCoffeeIds] = useState<string[]>([
    'byob-dampit-malang',
    'byob-gayo-anaerobic',
  ]);

  // Percentage allocation mapped by coffeeId
  const [percentages, setPercentages] = useState<Record<string, number>>({
    'byob-dampit-malang': 60,
    'byob-gayo-anaerobic': 40,
  });

  // Blend metadata
  const [blendName, setBlendName] = useState<string>('Malang Heritage Crema');
  const [customMessage, setCustomMessage] = useState<string>('Batch khusus diracik dengan penuh dedikasi');
  const [roastLevel, setRoastLevel] = useState<RoastLevel>('Medium');
  const [intendedBrew, setIntendedBrew] = useState<'Espresso (Milk / Straight)' | 'Filter / Manual Brew' | 'Omniroast (Semua Alat)'>('Espresso (Milk / Straight)');
  const [bagSize, setBagSize] = useState<250 | 500 | 1000>(250);
  const [grind, setGrind] = useState<GrindOption>('Biji Utuh (Whole Bean)');
  const [quantity, setQuantity] = useState<number>(1);
  const [showCostTransparency, setShowCostTransparency] = useState<boolean>(true);

  if (!isOpen) return null;

  // Selected bean objects
  const selectedCoffees = useMemo(() => {
    return selectedCoffeeIds
      .map((id) => BYOB_COFFEE_OPTIONS.find((c) => c.id === id))
      .filter((c): c is BlendComponentOption => Boolean(c));
  }, [selectedCoffeeIds]);

  // Total percentage check
  const totalPercentage = useMemo(() => {
    return selectedCoffeeIds.reduce((sum, id) => sum + (percentages[id] || 0), 0);
  }, [selectedCoffeeIds, percentages]);

  const isPercentageValid = totalPercentage === 100;

  // Toggle bean selection (min 2, max 3)
  const handleToggleCoffee = (coffee: BlendComponentOption) => {
    if (selectedCoffeeIds.includes(coffee.id)) {
      if (selectedCoffeeIds.length <= 2) {
        return; // maintain at least 2 components for a blend
      }
      const remaining = selectedCoffeeIds.filter((id) => id !== coffee.id);
      setSelectedCoffeeIds(remaining);

      // Rebalance percentages equally
      const equalShare = Math.floor(100 / remaining.length);
      const newPercentages: Record<string, number> = {};
      remaining.forEach((id, idx) => {
        if (idx === remaining.length - 1) {
          const sumSoFar = Object.values(newPercentages).reduce((a, b) => a + b, 0);
          newPercentages[id] = 100 - sumSoFar;
        } else {
          newPercentages[id] = equalShare;
        }
      });
      setPercentages(newPercentages);
    } else {
      if (selectedCoffeeIds.length >= 3) {
        return; // maximum 3 components
      }
      const updated = [...selectedCoffeeIds, coffee.id];
      setSelectedCoffeeIds(updated);

      // Rebalance to 100
      if (updated.length === 3) {
        setPercentages({
          [updated[0]]: 50,
          [updated[1]]: 30,
          [updated[2]]: 20,
        });
      }
    }
  };

  // Preset Ratio Applier
  const handleApplyPreset = (splits: number[]) => {
    if (splits.length !== selectedCoffeeIds.length) return;
    const newPercentages: Record<string, number> = {};
    selectedCoffeeIds.forEach((id, idx) => {
      newPercentages[id] = splits[idx];
    });
    setPercentages(newPercentages);
  };

  // Change individual percentage
  const handleUpdatePercentage = (coffeeId: string, val: number) => {
    const clamped = Math.max(5, Math.min(95, val));
    setPercentages((prev) => ({
      ...prev,
      [coffeeId]: clamped,
    }));
  };

  // Dynamic Calculated Flavor Profile
  const calculatedProfile = useMemo(() => {
    if (selectedCoffees.length === 0 || totalPercentage === 0) {
      return { acidity: 3, body: 3, sweetness: 3, aroma: 3 };
    }

    let weightedAcidity = 0;
    let weightedBody = 0;
    let weightedSweetness = 0;
    let weightedAroma = 0;

    selectedCoffees.forEach((coffee) => {
      const weight = (percentages[coffee.id] || 0) / totalPercentage;
      weightedAcidity += coffee.flavorProfile.acidity * weight;
      weightedBody += coffee.flavorProfile.body * weight;
      weightedSweetness += coffee.flavorProfile.sweetness * weight;
      weightedAroma += coffee.flavorProfile.aroma * weight;
    });

    return {
      acidity: Math.round(weightedAcidity * 10) / 10,
      body: Math.round(weightedBody * 10) / 10,
      sweetness: Math.round(weightedSweetness * 10) / 10,
      aroma: Math.round(weightedAroma * 10) / 10,
    };
  }, [selectedCoffees, percentages, totalPercentage]);

  // Combined Unique Flavor Notes
  const combinedFlavorNotes = useMemo(() => {
    const notesSet = new Set<string>();
    selectedCoffees.forEach((c) => {
      c.flavorNotes.forEach((n) => notesSet.add(n));
    });
    return Array.from(notesSet).slice(0, 6);
  }, [selectedCoffees]);

  // Dynamic Price Calculation (Transparent Pricing Model ala NiR Coffee)
  const priceCalculation = useMemo(() => {
    // 1. Raw coffee cost for 250g
    let rawCoffeeCost250g = 0;
    selectedCoffees.forEach((coffee) => {
      const weightFrac = (percentages[coffee.id] || 0) / 100;
      rawCoffeeCost250g += coffee.pricePer250g * weightFrac;
    });

    // Multiplier for size
    const sizeMultiplier = bagSize === 250 ? 1 : bagSize === 500 ? 1.9 : 3.6;
    const baseGreenCost = Math.round(rawCoffeeCost250g * sizeMultiplier * 0.72);
    const roastAndLabLabor = Math.round(rawCoffeeCost250g * sizeMultiplier * 0.18);
    const packagingAndCustomLabel = Math.round(rawCoffeeCost250g * sizeMultiplier * 0.1);

    const calculatedPrice = baseGreenCost + roastAndLabLabor + packagingAndCustomLabel;

    return {
      baseGreenCost,
      roastAndLabLabor,
      packagingAndCustomLabel,
      totalPerBag: calculatedPrice,
    };
  }, [selectedCoffees, percentages, bagSize]);

  // Generate Unique Roaster Batch Code
  const batchCode = useMemo(() => {
    const chars = selectedCoffees.map((c) => c.name.slice(0, 2).toUpperCase()).join('');
    return `BYOB-${chars}-${bagSize}G`;
  }, [selectedCoffees, bagSize]);

  // Construct Custom Blend Object
  const customBlendPayload = useMemo<CustomBlendDetails>(() => {
    return {
      blendName: blendName.trim() || 'Custom Specialty Blend',
      customMessage: customMessage.trim(),
      components: selectedCoffees.map((c) => ({
        coffeeId: c.id,
        coffeeName: c.name,
        origin: c.origin,
        percentage: percentages[c.id] || 0,
        colorHex: c.colorHex,
        flavorNotes: c.flavorNotes,
      })),
      roastLevel,
      intendedBrew,
      bagSizeGrams: bagSize,
      grindOption: grind,
      calculatedPrice: priceCalculation.totalPerBag,
      roasterBatchCode: batchCode,
      calculatedFlavorProfile: calculatedProfile,
      combinedFlavorNotes,
    };
  }, [
    blendName,
    customMessage,
    selectedCoffees,
    percentages,
    roastLevel,
    intendedBrew,
    bagSize,
    grind,
    priceCalculation.totalPerBag,
    batchCode,
    calculatedProfile,
    combinedFlavorNotes,
  ]);

  // Mock product wrapper for cart integration
  const customProductWrapper = useMemo<Product>(() => {
    const summaryBreakdown = selectedCoffees
      .map((c) => `${percentages[c.id] || 0}% ${c.name}`)
      .join(' + ');

    return {
      id: `byob-${Date.now()}`,
      name: `BYOB: ${blendName || 'Custom Blend'} (${bagSize}g)`,
      brand: 'Sanubari Custom Roasting Lab',
      category: 'beans',
      categoryLabel: 'Custom Blend (BYOB)',
      price: priceCalculation.totalPerBag,
      image: '/src/assets/images/product_aceh_gayo_beans_1792427749469.jpg',
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      isSpecialty: true,
      shortDesc: `Custom blend racikan sendiri: ${summaryBreakdown}. Disangrai fresh sesuai pesanan.`,
      fullDesc: `Blend pesanan khusus pelanggan Sanubari Roastery. Komposisi: ${summaryBreakdown}. Profil sangrai: ${roastLevel}. Ditujukan untuk: ${intendedBrew}.`,
      origin: 'Kompilasi Multi-Origin Nusantara',
      roastLevel,
      flavorNotes: combinedFlavorNotes,
      flavorProfile: {
        acidity: Math.round(calculatedProfile.acidity),
        body: Math.round(calculatedProfile.body),
        sweetness: Math.round(calculatedProfile.sweetness),
        aroma: Math.round(calculatedProfile.aroma),
      },
      reviews: [],
    };
  }, [
    blendName,
    bagSize,
    selectedCoffees,
    percentages,
    priceCalculation.totalPerBag,
    roastLevel,
    intendedBrew,
    combinedFlavorNotes,
    calculatedProfile,
  ]);

  const handleAddCustomToCart = () => {
    if (!isPercentageValid) return;
    onAddToCart(
      customProductWrapper,
      grind,
      `${bagSize} gram (Custom Blend)`,
      quantity,
      customBlendPayload
    );
    onClose();
  };

  const handleBuyCustomNow = () => {
    if (!isPercentageValid) return;
    onBuyNow(
      customProductWrapper,
      grind,
      `${bagSize} gram (Custom Blend)`,
      quantity,
      customBlendPayload
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#cbd5e1] bg-[#f0f6fc]">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#0b192c] flex items-center justify-center text-[#38bdf8] shadow-sm border border-blue-900/40 shrink-0">
              <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-100 text-[#1d4ed8]">
                  BYOB
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#64748b] truncate hidden xs:inline">
                  {t.byobModalSubtitle}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-[#0f172a] font-serif-luxury mt-0.5 truncate">
                {t.byobModalTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-[#dbeafe] text-[#334155] transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Tutup Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Content Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Customizer Configuration Controls */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Step 1: Component Coffee Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b192c] text-white text-xs font-bold flex items-center justify-center">1</span>
                    <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">
                      Pilih Biji Kopi (2 - 3 Pilihan)
                    </h3>
                  </div>
                  <span className="text-xs text-[#64748b] font-medium">
                    Terpilih: <strong className="text-[#2563eb]">{selectedCoffeeIds.length}</strong> / 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BYOB_COFFEE_OPTIONS.map((coffee) => {
                    const isSelected = selectedCoffeeIds.includes(coffee.id);
                    return (
                      <div
                        key={coffee.id}
                        onClick={() => handleToggleCoffee(coffee)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-[#eff6ff] border-[#2563eb] shadow-sm ring-1 ring-[#2563eb]'
                            : 'bg-white border-[#cbd5e1] hover:border-[#93c5fd] hover:bg-[#f8fafc]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span 
                              className="inline-block w-2.5 h-2.5 rounded-full mr-1.5"
                              style={{ backgroundColor: coffee.colorHex }}
                            />
                            <h4 className="text-xs font-bold text-[#0f172a] inline">
                              {coffee.name}
                            </h4>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] ${
                              isSelected ? 'bg-[#2563eb]' : 'border border-[#cbd5e1]'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        <div className="text-[11px] text-[#64748b] mt-1 space-y-0.5">
                          <p className="truncate">📍 {coffee.origin}</p>
                          <p className="truncate">⚙️ {coffee.process} · {coffee.elevation}</p>
                        </div>

                        {/* Flavor Badges */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {coffee.flavorNotes.slice(0, 3).map((note) => (
                            <span
                              key={note}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-white/80 border border-[#cbd5e1] text-[#334155]"
                            >
                              {note}
                            </span>
                          ))}
                        </div>

                        <div className="mt-2 text-[11px] font-semibold text-[#0f172a] pt-1.5 border-t border-[#e2e8f0]/80 flex justify-between">
                          <span className="text-[#64748b]">Harga /250g:</span>
                          <span>{formatRupiah(coffee.pricePer250g)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Percentage Allocation & Ratio Presets */}
              <div className="space-y-4 pt-4 border-t border-[#cbd5e1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0b192c] text-white text-xs font-bold flex items-center justify-center">2</span>
                    <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">
                      Atur Rasio Campuran (Wajib 100%)
                    </h3>
                  </div>

                  <div className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                    isPercentageValid
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800 animate-pulse'
                  }`}>
                    <span>Total: {totalPercentage}%</span>
                    {isPercentageValid ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Multi-segmented dynamic proportion preview bar */}
                <div className="h-5 w-full bg-[#e2e8f0] rounded-full overflow-hidden flex shadow-inner p-0.5">
                  {selectedCoffees.map((coffee) => {
                    const pct = percentages[coffee.id] || 0;
                    if (pct <= 0) return null;
                    return (
                      <div
                        key={coffee.id}
                        className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-300 relative group flex items-center justify-center text-[10px] text-white font-bold"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: coffee.colorHex,
                        }}
                        title={`${coffee.name}: ${pct}%`}
                      >
                        {pct >= 15 && `${pct}%`}
                      </div>
                    );
                  })}
                </div>

                {/* Preset Ratios Buttons */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-[#64748b] font-medium">Rasio Rekomendasi Barista:</span>
                  <div className="flex flex-wrap gap-2">
                    {BYOB_PRESET_RATIOS
                      .filter((p) => p.splits.length === selectedCoffeeIds.length)
                      .map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => handleApplyPreset(preset.splits)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#f0f6fc] hover:bg-[#dbeafe] text-[#1e40af] border border-[#bfdbfe] transition-colors cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Individual Sliders */}
                <div className="space-y-3">
                  {selectedCoffees.map((coffee) => {
                    const pct = percentages[coffee.id] || 0;
                    return (
                      <div key={coffee.id} className="p-3 bg-[#f8fafc] rounded-xl border border-[#cbd5e1] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#0f172a] flex items-center gap-1.5">
                            <span 
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: coffee.colorHex }}
                            />
                            {coffee.name}
                          </span>
                          <span className="font-mono font-bold text-sm text-[#2563eb]">
                            {pct}%
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleUpdatePercentage(coffee.id, pct - 5)}
                            className="p-1.5 rounded bg-white hover:bg-[#dbeafe] text-[#0f172a] border border-[#cbd5e1] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <input
                            type="range"
                            min="5"
                            max="95"
                            step="5"
                            value={pct}
                            onChange={(e) => handleUpdatePercentage(coffee.id, Number(e.target.value))}
                            className="flex-1 accent-[#2563eb] cursor-pointer h-2 bg-[#cbd5e1] rounded-lg"
                          />

                          <button
                            type="button"
                            onClick={() => handleUpdatePercentage(coffee.id, pct + 5)}
                            className="p-1.5 rounded bg-white hover:bg-[#dbeafe] text-[#0f172a] border border-[#cbd5e1] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Roast Profile & Intended Brew Purpose */}
              <div className="space-y-3 pt-4 border-t border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0b192c] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">
                    Tujuan Seduh & Profil Sangrai
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[11px] text-[#64748b] block mb-1.5">Metode Seduh Utama:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'Espresso (Milk / Straight)', label: 'Espresso & Susu', desc: 'Crema tebal, bold, gurih manis' },
                        { id: 'Filter / Manual Brew', label: 'Filter / Pour Over', desc: 'Clean cup, floral, asam buah cerah' },
                        { id: 'Omniroast (Semua Alat)', label: 'Omniroast (Universal)', desc: 'Fleksibel untuk filter & espresso' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setIntendedBrew(item.id as any)}
                          className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                            intendedBrew === item.id
                              ? 'bg-[#2563eb] text-white border-[#2563eb]'
                              : 'bg-white border-[#cbd5e1] text-[#0f172a] hover:bg-[#f8fafc]'
                          }`}
                        >
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className={`text-[10px] mt-0.5 ${intendedBrew === item.id ? 'text-blue-100' : 'text-[#64748b]'}`}>
                            {item.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#64748b] block mb-1.5">Tingkat Sangrai (Roast Level):</span>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Light', 'Medium', 'Medium-Dark'] as RoastLevel[]).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setRoastLevel(lvl)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                            roastLevel === lvl
                              ? 'bg-[#0b192c] text-white border-[#0b192c]'
                              : 'bg-white border-[#cbd5e1] text-[#334155] hover:bg-[#f8fafc]'
                          }`}
                        >
                          {lvl} Roast
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Size & Grind Selection */}
              <div className="space-y-3 pt-4 border-t border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0b192c] text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">
                    Ukuran Kemasan & Pilihan Gilingan
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] text-[#64748b] block mb-1">Ukuran Kemasan (Valve Pouch):</span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { size: 250, label: '250 gram' },
                        { size: 500, label: '500 gram' },
                        { size: 1000, label: '1 kg' },
                      ].map((item) => (
                        <button
                          key={item.size}
                          type="button"
                          onClick={() => setBagSize(item.size as any)}
                          className={`py-2 px-2 text-center rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            bagSize === item.size
                              ? 'bg-[#2563eb] text-white border-[#2563eb]'
                              : 'bg-white border-[#cbd5e1] text-[#0f172a] hover:bg-[#f8fafc]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] text-[#64748b] block mb-1">Pilihan Gilingan (Grind Size):</span>
                    <select
                      value={grind}
                      onChange={(e) => setGrind(e.target.value as GrindOption)}
                      className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs font-semibold text-[#0f172a] focus:outline-none focus:border-[#2563eb] cursor-pointer"
                    >
                      <option value="Biji Utuh (Whole Bean)">Biji Utuh (Whole Bean) - Direkomendasikan</option>
                      <option value="Giling Halus (Espresso / Moka Pot)">Giling Halus (Espresso / Moka Pot)</option>
                      <option value="Giling Sedang (V60 / Pour Over)">Giling Sedang (V60 / Pour Over)</option>
                      <option value="Giling Kasar (French Press / Cold Brew)">Giling Kasar (French Press / Cold Brew)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 5: Custom Pouch Label Personalization */}
              <div className="space-y-3 pt-4 border-t border-[#cbd5e1]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0b192c] text-white text-xs font-bold flex items-center justify-center">5</span>
                  <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">
                    Personalisasi Label Kemasan Kopi Anda
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#334155] block mb-1">
                      Nama Blend Kreasi Anda:
                    </label>
                    <input
                      type="text"
                      maxLength={40}
                      value={blendName}
                      onChange={(e) => setBlendName(e.target.value)}
                      placeholder="Contoh: Malang Morning Glory / Senja Sanubari"
                      className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-sm font-bold text-[#0f172a] focus:outline-none focus:border-[#2563eb]"
                    />
                    <div className="flex gap-2 mt-1.5 text-[10px] text-[#64748b]">
                      <span>Ide nama:</span>
                      {['Malang Sunrise', 'Barista Velvet Blend', 'Kedai Signature #1'].map((suggest) => (
                        <button
                          key={suggest}
                          type="button"
                          onClick={() => setBlendName(suggest)}
                          className="underline hover:text-[#2563eb] cursor-pointer"
                        >
                          {suggest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#334155] block mb-1">
                      Pesan / Dedikasi Khusus pada Label Kemasan:
                    </label>
                    <input
                      type="text"
                      maxLength={60}
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Contoh: Roasted exclusively for Kedai Kopi Sukses"
                      className="w-full bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-xs text-[#0f172a] focus:outline-none focus:border-[#2563eb]"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Live Pouch Mockup, Radar Profile & COGS Transparency */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-4">
              
              {/* Visual Artisan Pouch Label Mockup */}
              <div className="bg-[#0b192c] rounded-2xl p-6 text-white shadow-xl border border-blue-900/60 relative overflow-hidden">
                {/* Background coffee bean watermark */}
                <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 opacity-10 pointer-events-none">
                  <SanubariLogoMark size="xl" className="w-full h-full" />
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Pouch Label Header */}
                  <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
                    <div className="flex items-center gap-2">
                      <SanubariLogoMark size="sm" />
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-[#38bdf8] uppercase">
                          SANUBARI BYOB LAB
                        </div>
                        <div className="text-[9px] text-[#94a3b8]">
                          BATCH: {batchCode}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-[#38bdf8] border border-blue-800/40">
                      {bagSize}g · {roastLevel}
                    </span>
                  </div>

                  {/* Pouch Headline Blend Name */}
                  <div className="py-1">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#94a3b8]">
                      Custom Artisan Blend
                    </div>
                    <h4 className="text-xl font-extrabold text-white font-serif-luxury tracking-wide mt-0.5 text-balance">
                      {blendName || 'Unnamed Blend'}
                    </h4>
                    {customMessage && (
                      <p className="text-[10px] italic text-[#38bdf8] mt-1 border-l-2 border-[#38bdf8] pl-2">
                        &ldquo;{customMessage}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Composition Percentages Pill */}
                  <div className="bg-[#13233c] p-3 rounded-xl border border-blue-800/40 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] block">
                      Komposisi Racikan:
                    </span>
                    <div className="space-y-1.5">
                      {selectedCoffees.map((coffee) => (
                        <div key={coffee.id} className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 text-white truncate max-w-[70%]">
                            <span 
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: coffee.colorHex }}
                            />
                            <span className="truncate">{coffee.name}</span>
                          </span>
                          <span className="font-mono font-bold text-[#38bdf8]">
                            {percentages[coffee.id] || 0}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tasting Notes on Label */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] block mb-1.5">
                      Predicted Tasting Notes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {combinedFlavorNotes.map((note) => (
                        <span
                          key={note}
                          className="text-[10px] font-medium bg-blue-950/80 text-[#38bdf8] px-2 py-0.5 rounded border border-blue-800/40"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Grind & Fresh Guarantee */}
                  <div className="pt-2 border-t border-blue-900/60 flex items-center justify-between text-[10px] text-[#94a3b8]">
                    <span>Grind: {grind.split(' ')[0]}</span>
                    <span>100% Arabika & Fine Robusta</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Sensory Profile Meter */}
              <div className="bg-white p-5 rounded-2xl border border-[#cbd5e1] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#0f172a]">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <Coffee className="w-3.5 h-3.5 text-[#2563eb]" />
                    Sensory Profile Bar
                  </span>
                  <span className="text-[10px] font-normal text-[#64748b]">Kalkulasi real-time</span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Acidity (Keasaman)', val: calculatedProfile.acidity, max: 5 },
                    { label: 'Body (Ketebalan)', val: calculatedProfile.body, max: 5 },
                    { label: 'Sweetness (Kemanisan)', val: calculatedProfile.sweetness, max: 5 },
                    { label: 'Aroma (Keharuman)', val: calculatedProfile.aroma, max: 5 },
                  ].map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#475569]">{stat.label}</span>
                        <span className="font-bold text-[#0f172a]">{stat.val} / 5</span>
                      </div>
                      <div className="h-2 w-full bg-[#e2e8f0] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#2563eb] to-[#38bdf8] rounded-full transition-all duration-300"
                          style={{ width: `${(stat.val / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Transparency Breakdown (COGS - Ala NiR Coffee) */}
              <div className="bg-[#f0f6fc] p-4 rounded-2xl border border-[#cbd5e1] space-y-2.5">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowCostTransparency(!showCostTransparency)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#0f172a] hover:text-[#2563eb] cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>Transparansi Biaya Produksi (COGS)</span>
                  </button>
                  <span className="text-[10px] font-semibold text-[#2563eb]">
                    {showCostTransparency ? 'Tutup' : 'Lihat'}
                  </span>
                </div>

                {showCostTransparency && (
                  <div className="text-[11px] space-y-1.5 pt-2 border-t border-[#cbd5e1] text-[#475569]">
                    <div className="flex justify-between">
                      <span>Nilai Biji Kopi Hijau (Green Coffee):</span>
                      <span className="font-mono text-[#0f172a]">{formatRupiah(priceCalculation.baseGreenCost)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Artisan Roasting & Quality Lab:</span>
                      <span className="font-mono text-[#0f172a]">{formatRupiah(priceCalculation.roastAndLabLabor)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>One-Way Valve Foil & Print Label:</span>
                      <span className="font-mono text-[#0f172a]">{formatRupiah(priceCalculation.packagingAndCustomLabel)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Add to Cart Module */}
              <div className="p-5 bg-white rounded-2xl border border-[#cbd5e1] space-y-4 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#64748b]">Total Harga Per Bag:</span>
                    <div className="text-2xl font-extrabold text-[#2563eb]">
                      {formatRupiah(priceCalculation.totalPerBag)}
                    </div>
                    <span className="text-[11px] text-[#64748b]">
                      Kemasan {bagSize} gram · Fresh Roasted
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#cbd5e1] rounded-lg overflow-hidden bg-[#f8fafc]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-xs hover:bg-[#dbeafe] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold font-mono">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-xs hover:bg-[#dbeafe] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {!isPercentageValid && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{t.byobRatioWarning} (Total: {totalPercentage}%).</span>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    disabled={!isPercentageValid}
                    onClick={handleAddCustomToCart}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#0b192c] hover:bg-[#1e293b] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#38bdf8] shrink-0" />
                    <span className="truncate">{t.byobAddToCartBtn}</span>
                  </button>

                  <button
                    type="button"
                    disabled={!isPercentageValid}
                    onClick={handleBuyCustomNow}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>{t.byobBuyNowBtn}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#64748b] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{language === 'id' ? 'Disangrai segar dalam 24 jam setelah order masuk' : 'Freshly roasted within 24 hours of order'}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
