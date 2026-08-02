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
    rating: 4.9,
    reviewsCount: 51,
    isBestSeller: true,
    inStock: true,
    availableMetals: ['18K Yellow Gold', '18K Rose Gold', '950 Platinum'],
    availableCarats: ['1.0 ct', '1.5 ct', '2.0 ct', '3.0 ct'],
  },
];
