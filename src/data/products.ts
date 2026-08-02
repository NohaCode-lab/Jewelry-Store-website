import { Product } from '../types/product';

import ring1 from '../assets/optimized/rings/ring-1.webp';
import ring2 from '../assets/optimized/rings/ring-2.webp';
import ring3 from '../assets/optimized/rings/ring-3.webp';
import ring4 from '../assets/optimized/rings/ring-4.webp';

import crown1 from '../assets/optimized/crown/crown-1.webp';
import crown2 from '../assets/optimized/crown/crown-2.webp';
import crown3 from '../assets/optimized/crown/crown-3.webp';
import crown4 from '../assets/optimized/crown/crown-4.webp';

import earrings1 from '../assets/optimized/earrings/earrings-1.webp';
import earrings2 from '../assets/optimized/earrings/earrings-2.webp';
import earrings3 from '../assets/optimized/earrings/earrings-3.webp';

import bracelet1 from '../assets/optimized/bracelet/bracelet-1.webp';
import bracelet2 from '../assets/optimized/bracelet/bracelet-2.webp';
import bracelet3 from '../assets/optimized/bracelet/bracelet-3.webp';
import bracelet4 from '../assets/optimized/bracelet/bracelet-4.webp';

import img2 from '../assets/optimized/collection/img-2.webp';
import img3 from '../assets/optimized/collection/img-3.webp';
import img4 from '../assets/optimized/collection/img-4.webp';

import necklace1 from '../assets/optimized/necklace/necklace-1.webp';
import necklace2 from '../assets/optimized/necklace/necklace-2.webp';
import necklace3 from '../assets/optimized/necklace/necklace-3.webp';
import necklace4 from '../assets/optimized/necklace/necklace-4.webp';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-rings-01',
    title: 'The Eternal Solitaire Ring',
    category: 'rings',
    price: 3450,
    description:
      'A masterpiece of precision hand-craftsmanship featuring a certified brilliant-cut diamond mounted on a sleek 18K gold band.',
    details: [
      'Handcrafted in Austin, Texas',
      'VVS1 Clarity Certified Diamond',
      'Custom sizing & free interior engraving available',
      'Includes Mangata & Gallo Certificate of Authenticity',
    ],
    mainImage: ring1,
    images: [ring1, ring2, ring3, ring4],
    imageVariants: [
      {
        url: ring1,
        title: 'The Eternal Solitaire Ring',
        price: 3450,
        description: 'A masterpiece of precision hand-craftsmanship featuring a certified brilliant-cut diamond mounted on a sleek 18K Yellow Gold band.',
        metal: '18K Yellow Gold',
      },
      {
        url: ring2,
        title: 'Royal Cathedral Halo Ring',
        price: 4200,
        description: 'An ethereal halo of micropavé diamonds framing a central brilliant diamond, forged in warm 18K Rose Gold.',
        metal: '18K Rose Gold',
      },
      {
        url: ring3,
        title: 'Vintage Emerald-Cut Diamond Ring',
        price: 5100,
        description: 'A stately emerald-cut solitaire set on an architectural 950 Platinum shank with tapered baguette side stones.',
        metal: '950 Platinum',
      },
      {
        url: ring4,
        title: 'Pavé Diamond Eternity Ring',
        price: 2950,
        description: 'Continuous band of hand-selected round brilliant diamonds set in lustrous 18K White Gold.',
        metal: '18K White Gold',
      },
    ],
    rating: 4.9,
    reviewsCount: 38,
    isBestSeller: true,
    inStock: true,
    availableMetals: ['18K Yellow Gold', '18K Rose Gold', '950 Platinum', '18K White Gold'],
    availableCarats: ['0.5 ct', '1.0 ct', '1.5 ct', '2.0 ct', '3.0 ct'],
  },
  {
    id: 'prod-crowns-01',
    title: 'Imperial Diamond Tiara Crown',
    category: 'crowns',
    price: 12800,
    description:
      'Inspired by royal heritage, this hand-set diamond crown captures light from every angle for unforgettable weddings and galas.',
    details: [
      'Over 120 precision-set micro diamonds',
      'Heavy 950 Platinum structural frame',
      'Velvet presentation box & authenticity ledger',
    ],
    mainImage: crown1,
    images: [crown1, crown2, crown3, crown4],
    imageVariants: [
      {
        url: crown1,
        title: 'Imperial Diamond Tiara Crown',
        price: 12800,
        description: 'Inspired by royal heritage, this hand-set diamond crown in 950 Platinum captures light from every angle.',
        metal: '950 Platinum',
      },
      {
        url: crown2,
        title: 'Queen Victoria Sapphire Tiara',
        price: 15400,
        description: 'Deep royal blue sapphires intertwined with diamond arches set in 18K White Gold.',
        metal: '18K White Gold',
      },
      {
        url: crown3,
        title: 'Golden Renaissance Diadem',
        price: 9800,
        description: 'Ornate 18K Yellow Gold filigree tiara with sparkling brilliant diamond accents.',
        metal: '18K Yellow Gold',
      },
      {
        url: crown4,
        title: 'Bespoke Emerald Gala Coronet',
        price: 18200,
        description: 'Hand-selected Colombian emeralds surrounded by platinum diamond halos.',
        metal: '950 Platinum',
      },
    ],
    rating: 5.0,
    reviewsCount: 14,
    isNewArrival: true,
    inStock: true,
    availableMetals: ['950 Platinum', '18K White Gold', '18K Yellow Gold'],
  },
  {
    id: 'prod-earrings-01',
    title: 'Celestial Drop Earrings',
    category: 'earrings',
    price: 2150,
    description:
      'Cascading diamond drop earrings designed to sway gracefully with every movement, creating a radiant halo effect.',
    details: [
      'Conflict-free ethically sourced diamonds',
      'Secure push-back closure with safety latch',
      'Lightweight ergonomic luxury design',
    ],
    mainImage: earrings1,
    images: [earrings1, earrings2, earrings3],
    imageVariants: [
      {
        url: earrings1,
        title: 'Celestial Diamond Drop Earrings',
        price: 2150,
        description: 'Cascading diamond drop earrings in 18K Yellow Gold designed to sway gracefully with every movement.',
        metal: '18K Yellow Gold',
      },
      {
        url: earrings2,
        title: 'Atelier Rose Gold Hoop Earrings',
        price: 1850,
        description: 'Sleek 18K Rose Gold hoops channel-set with brilliant round diamonds.',
        metal: '18K Rose Gold',
      },
      {
        url: earrings3,
        title: 'Platinum Chandelier Diamond Earrings',
        price: 3600,
        description: 'Grand chandelier drop earrings in 950 Platinum with pear-cut drop diamonds.',
        metal: '950 Platinum',
      },
    ],
    rating: 4.8,
    reviewsCount: 29,
    isBestSeller: true,
    inStock: true,
    availableMetals: ['18K Yellow Gold', '18K Rose Gold', '950 Platinum'],
  },
  {
    id: 'prod-bracelet-01',
    title: 'Monaco Tennis Bracelet',
    category: 'bracelet',
    price: 5600,
    description: 'A classic continuous strand of round brilliant diamonds set in liquid-smooth gold links.',
    details: ['Double-latch safety mechanism', '4.5 total carat weight', 'Sustainably alloyed 18K solid gold'],
    mainImage: bracelet1,
    images: [bracelet1, bracelet2, bracelet3, bracelet4],
    imageVariants: [
      {
        url: bracelet1,
        title: 'Monaco Diamond Tennis Bracelet',
        price: 5600,
        description: 'A classic continuous strand of round brilliant diamonds set in liquid-smooth 18K Yellow Gold links.',
        metal: '18K Yellow Gold',
      },
      {
        url: bracelet2,
        title: 'Tokyo Vintage Solid Gold Bangle',
        price: 3400,
        description: 'Architectural solid 18K Rose Gold cuff bracelet with hand-engraved satin finish.',
        metal: '18K Rose Gold',
      },
      {
        url: bracelet3,
        title: 'Atelier Dual Gold Wave Bangles',
        price: 4250,
        description: 'Interlocking dual bangles combining 950 Platinum and gold curves studded with diamond pavé.',
        metal: '950 Platinum',
      },
      {
        url: bracelet4,
        title: 'Multi-Strand Venetian Link Bracelet',
        price: 2900,
        description: 'Intricate multi-strand woven chain bracelet forged in radiant 18K White Gold.',
        metal: '18K White Gold',
      },
    ],
    rating: 4.9,
    reviewsCount: 42,
    isBestSeller: true,
    inStock: true,
    availableMetals: ['18K Yellow Gold', '18K Rose Gold', '950 Platinum', '18K White Gold'],
  },
  {
    id: 'prod-necklace-01',
    title: 'Royal Sapphire & Diamond Pendant',
    category: 'necklace',
    price: 4900,
    description: 'A deep Ceylon blue sapphire surrounded by a brilliant diamond halo on a delicate gold link chain.',
    details: [
      'Natural unheated 2.2ct blue sapphire',
      'Adjustable 16"-18" solid gold chain',
      'Hand-carved prong settings',
    ],
    mainImage: necklace1,
    images: [necklace1, necklace2, necklace3, necklace4],
    imageVariants: [
      {
        url: necklace1,
        title: 'Royal Sapphire & Diamond Pendant',
        price: 4900,
        description: 'A deep Ceylon blue sapphire surrounded by a brilliant diamond halo on an 18K Yellow Gold chain.',
        metal: '18K Yellow Gold',
      },
      {
        url: necklace2,
        title: 'Parisian Diamond Collar Choker',
        price: 7200,
        description: 'Sculptural 950 Platinum diamond collar choker hugging the neckline with VVS1 diamonds.',
        metal: '950 Platinum',
      },
      {
        url: necklace3,
        title: 'Golden Solitaire Diamond Necklace',
        price: 3100,
        description: 'Floating solitaire diamond pendant suspended on a delicate 18K Rose Gold chain.',
        metal: '18K Rose Gold',
      },
      {
        url: necklace4,
        title: 'Cascading Diamond Layered Chain',
        price: 5800,
        description: 'Multi-tiered 18K White Gold chain draped with sparkling diamond bezel drops.',
        metal: '18K White Gold',
      },
    ],
    rating: 5.0,
    reviewsCount: 23,
    isNewArrival: true,
    inStock: true,
    availableMetals: ['18K Yellow Gold', '950 Platinum', '18K Rose Gold'],
  },
  {
    id: 'prod-collection-01',
    title: 'Aura Signature Bridal Set',
    category: 'collections',
    price: 8900,
    description: 'The ultimate luxury pairing: a solitaire engagement ring with a matching diamond pavé band.',
    details: [
      'Seamless interlocking band design',
      'GIA Certified center stone',
      'Lifetime polishing & complimentary inspection',
    ],
    mainImage: img2,
    images: [img2, img3, img4],
    imageVariants: [
      {
        url: img2,
        title: 'Aura Signature Bridal Set',
        price: 8900,
        description: 'The ultimate luxury pairing: a solitaire engagement ring with a matching diamond pavé band in 18K Yellow Gold.',
        metal: '18K Yellow Gold',
      },
      {
        url: img3,
        title: 'Atelier Heritage Cushion Set',
        price: 10500,
        description: 'Cushion-cut diamond set in vintage-inspired 950 Platinum with hand-carved lace detailing.',
        metal: '950 Platinum',
      },
      {
        url: img4,
        title: 'Eternity Rose Diamond Pairing',
        price: 7600,
        description: 'Romantically styled 18K Rose Gold wedding ring set featuring rose-cut diamond accents.',
        metal: '18K Rose Gold',
      },
    ],
    rating: 4.9,
    reviewsCount: 51,
    isBestSeller: true,
    inStock: true,
    availableMetals: ['18K Yellow Gold', '18K Rose Gold', '950 Platinum'],
    availableCarats: ['1.0 ct', '1.5 ct', '2.0 ct', '3.0 ct'],
  },
];
