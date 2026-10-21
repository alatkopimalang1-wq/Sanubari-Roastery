import { BlendComponentOption } from '../types/coffee';

export const BYOB_COFFEE_OPTIONS: BlendComponentOption[] = [
  {
    id: 'byob-dampit-malang',
    name: 'Dampit Fine Robusta (Malang Heritage)',
    origin: 'Dampit, Malang, Jawa Timur',
    elevation: '800 - 950 mdpl',
    process: 'Natural Double-Pick',
    roastProfile: 'Medium-Dark (Full Crema & Rich Sweetness)',
    flavorNotes: ['Dark Chocolate', 'Roasted Hazelnut', 'Palm Sugar', 'Creamy Crema'],
    pricePer250g: 65000,
    flavorProfile: {
      acidity: 1,
      body: 5,
      sweetness: 4,
      aroma: 4,
    },
    colorHex: '#854d0e', // Amber brown
    description: 'Biji kopi kebanggaan Malang Selatan dengan body tebal dan crema emas solid. Pondasi sempurna untuk espresso base susu.',
  },
  {
    id: 'byob-gayo-anaerobic',
    name: 'Aceh Gayo Pantan Musara Arabica',
    origin: 'Takengon, Aceh Tengah',
    elevation: '1.550 - 1.650 mdpl',
    process: 'Anaerobic Natural',
    roastProfile: 'Medium (Fruit Forward)',
    flavorNotes: ['Jasmine Floral', 'Blackcurrant', 'Ripe Plum', 'Raw Honey'],
    pricePer250g: 95000,
    flavorProfile: {
      acidity: 4,
      body: 3,
      sweetness: 5,
      aroma: 5,
    },
    colorHex: '#2563eb', // Royal blue
    description: 'Memberikan semburat aroma bunga melati dan manis buah tropis cerah yang kompleks pada racikan blend Anda.',
  },
  {
    id: 'byob-toraja-sapan',
    name: 'Toraja Sapan Gunung Sesean Arabica',
    origin: 'Tana Toraja, Sulawesi Selatan',
    elevation: '1.700 - 1.850 mdpl',
    process: 'Full Washed',
    roastProfile: 'Medium (Balanced Classic)',
    flavorNotes: ['Sweet Cinnamon', 'Green Apple', 'Caramelized Sugar', 'Velvety Finish'],
    pricePer250g: 102000,
    flavorProfile: {
      acidity: 3,
      body: 4,
      sweetness: 4,
      aroma: 4,
    },
    colorHex: '#0284c7', // Sky cyan
    description: 'Menghadirkan kelembutan herba rempah manis dan keasaman bersih elegan yang menyeimbangkan karakter racikan.',
  },
  {
    id: 'byob-flores-honey',
    name: 'Flores Bajawa Inerie Yellow Honey',
    origin: 'Ngada, Flores, NTT',
    elevation: '1.450 - 1.600 mdpl',
    process: 'Yellow Honey Ferment',
    roastProfile: 'Medium-Light (Honey & Nutty)',
    flavorNotes: ['Wild Honey', 'Candied Orange', 'Cashew Nut', 'Milk Chocolate'],
    pricePer250g: 98000,
    flavorProfile: {
      acidity: 3,
      body: 3,
      sweetness: 5,
      aroma: 4,
    },
    colorHex: '#d97706', // Honey gold
    description: 'Proses honey menghasilkan lapisan manis madu alami yang membulat dan aftertaste kacang gurih tahan lama.',
  },
  {
    id: 'byob-bali-kintamani',
    name: 'Bali Kintamani Ulian Natural',
    origin: 'Kintamani, Bangli, Bali',
    elevation: '1.300 - 1.450 mdpl',
    process: 'Natural Sun-Dried',
    roastProfile: 'Medium (Juicy Citrus)',
    flavorNotes: ['Tangerine Peel', 'Citrus Blossom', 'Brown Sugar', 'Juicy Pear'],
    pricePer250g: 92000,
    flavorProfile: {
      acidity: 4,
      body: 3,
      sweetness: 4,
      aroma: 4,
    },
    colorHex: '#ea580c', // Tangerine
    description: 'Sentuhan kesegaran jeruk keprok Bali dan rasa manis buah pir yang menyegarkan pada tegukan awal.',
  },
  {
    id: 'byob-westjava-preanger',
    name: 'West Java Gunung Tilu Preanger',
    origin: 'Pangalengan, Jawa Barat',
    elevation: '1.500 - 1.600 mdpl',
    process: 'Washed Signature',
    roastProfile: 'Medium (Tea-like Elegance)',
    flavorNotes: ['Black Tea', 'Bergamot', 'Lemon Drop', 'Cane Sugar'],
    pricePer250g: 89000,
    flavorProfile: {
      acidity: 4,
      body: 2,
      sweetness: 4,
      aroma: 5,
    },
    colorHex: '#059669', // Emerald
    description: 'Kopi legendaris Priangan Jawa Barat dengan karakter floral teh hitam bergamot yang sangat harum dan bersih.',
  },
];

export const BYOB_PRESET_RATIOS = [
  {
    label: '50 : 50',
    description: 'Keseimbangan merata antara body dan kompleksitas buah/floral',
    splits: [50, 50],
  },
  {
    label: '70 : 30',
    description: 'Formula klasik kafe: 70% pondasi rasa mantap + 30% aksen karakter khas',
    splits: [70, 30],
  },
  {
    label: '60 : 40',
    description: 'Perpaduan modern espresso dengan rasa manis dan aroma yang seimbang',
    splits: [60, 40],
  },
  {
    label: '60 : 20 : 20',
    description: 'Tiga komponen: 1 base utama + 2 aksen aroma & keasaman manis',
    splits: [60, 20, 20],
  },
  {
    label: '50 : 30 : 20',
    description: 'Racikan bertingkat (Layered Blend) untuk kompetisi dan seduhan signature',
    splits: [50, 30, 20],
  },
];
