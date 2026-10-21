export type CoffeeCategory = 
  | 'all' 
  | 'beans' 
  | 'manual_brew' 
  | 'espresso_machine' 
  | 'grinder' 
  | 'accessories';

export type RoastLevel = 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';

export type GrindOption = 
  | 'Biji Utuh (Whole Bean)' 
  | 'Giling Halus (Espresso / Moka Pot)' 
  | 'Giling Sedang (V60 / Pour Over)' 
  | 'Giling Kasar (French Press / Cold Brew)';

export interface FlavorProfile {
  acidity: number; // 1-5
  body: number; // 1-5
  sweetness: number; // 1-5
  aroma: number; // 1-5
}

export interface ProductVariant {
  weightOrSpec: string; // e.g. "200g", "500g", "1000g" or "Matte White", "Silver Steel"
  priceMultiplier: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  brewMethod?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: CoffeeCategory;
  categoryLabel: string;
  price: number; // base price in IDR
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isSpecialty?: boolean;
  isBestseller?: boolean;
  shortDesc: string;
  fullDesc: string;
  
  // Specific for coffee beans
  origin?: string;
  elevation?: string;
  variety?: string;
  process?: string;
  roastLevel?: RoastLevel;
  flavorNotes?: string[];
  flavorProfile?: FlavorProfile;
  grindOptions?: GrindOption[];
  
  // Specific for equipment
  specs?: Record<string, string>;
  warranty?: string;

  variants?: ProductVariant[];
  reviews: Review[];
}

export interface BlendComponentOption {
  id: string;
  name: string;
  origin: string;
  elevation: string;
  process: string;
  roastProfile: string;
  flavorNotes: string[];
  pricePer250g: number;
  flavorProfile: FlavorProfile;
  colorHex: string;
  description: string;
}

export interface CustomBlendDetails {
  blendName: string;
  customMessage?: string;
  components: {
    coffeeId: string;
    coffeeName: string;
    origin: string;
    percentage: number;
    colorHex: string;
    flavorNotes: string[];
  }[];
  roastLevel: RoastLevel;
  intendedBrew: 'Espresso (Milk / Straight)' | 'Filter / Manual Brew' | 'Omniroast (Semua Alat)';
  bagSizeGrams: 250 | 500 | 1000;
  grindOption: GrindOption;
  calculatedPrice: number;
  roasterBatchCode: string;
  calculatedFlavorProfile: FlavorProfile;
  combinedFlavorNotes: string[];
}

export interface CartItem {
  id: string; // generated unique key
  productId: string;
  product: Product;
  selectedGrind?: GrindOption;
  selectedVariant: string;
  unitPrice: number;
  quantity: number;
  customBlendDetails?: CustomBlendDetails;
}

export interface BrewMethod {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  defaultRatio: number; // e.g. 15 for 1:15
  defaultDose: number; // in grams
  tempC: number;
  grindGuide: string;
  steps: {
    phase: string;
    targetWater: (coffeeWeight: number, ratio: number) => number;
    durationSec: number;
    instruction: string;
  }[];
}

export interface JournalArticle {
  id: string;
  title: string;
  readTime: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  content: string[];
  image: string;
  tags: string[];
}
