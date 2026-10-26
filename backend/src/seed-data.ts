// Store catalog and test accounts. All brands and products are fictional.
export interface SeedProduct {
  slug: string;
  name: string;
  brand: string;
  category: 'cleats' | 'balls' | 'apparel' | 'goalkeeper' | 'training';
  priceCents: number;
  description: string;
  sizes: string[];
  color: string;
  inStock: boolean;
  featured: boolean;
}

const bootSizes = ['7', '8', '9', '10', '11', '12'];
const youthBootSizes = ['1Y', '2Y', '3Y', '4Y', '5Y'];
const apparelSizes = ['S', 'M', 'L', 'XL'];

export const products: SeedProduct[] = [
  { slug: 'stryker-velocity-fg', name: 'Velocity FG Cleat', brand: 'Stryker', category: 'cleats', priceCents: 13999,
    description: 'A lightweight firm-ground cleat with a thin synthetic upper for close touch at speed.',
    sizes: bootSizes, color: '#1f6feb', inStock: true, featured: true },
  { slug: 'volta-grip-pro-fg', name: 'Grip Pro FG Cleat', brand: 'Volta', category: 'cleats', priceCents: 11999,
    description: 'Textured upper for extra grip on the ball, with a stable heel counter for planting and cutting.',
    sizes: bootSizes, color: '#e5484d', inStock: true, featured: false },
  { slug: 'northpitch-turf-trainer', name: 'Turf Trainer TF', brand: 'Northpitch', category: 'cleats', priceCents: 7999,
    description: 'Rubber-studded turf shoe for artificial pitches and hard ground training.',
    sizes: bootSizes, color: '#8e4ec6', inStock: true, featured: false },
  { slug: 'stryker-junior-sprint', name: 'Junior Sprint FG Cleat', brand: 'Stryker', category: 'cleats', priceCents: 5499,
    description: 'A youth firm-ground cleat with an easy hook-and-loop strap over the laces.',
    sizes: youthBootSizes, color: '#f76b15', inStock: true, featured: false },
  { slug: 'volta-indoor-court', name: 'Indoor Court IC', brand: 'Volta', category: 'cleats', priceCents: 6999,
    description: 'Flat gum-rubber sole for futsal and indoor courts.',
    sizes: bootSizes, color: '#12a594', inStock: true, featured: false },

  { slug: 'kickoff-match-ball', name: 'Match Ball', brand: 'KickOff', category: 'balls', priceCents: 3999,
    description: 'Thermally bonded match ball with a true, consistent flight. Size 5 is the adult and high school size.',
    sizes: ['4', '5'], color: '#f2c230', inStock: true, featured: true },
  { slug: 'kickoff-training-ball', name: 'Training Ball', brand: 'KickOff', category: 'balls', priceCents: 2499,
    description: 'A durable machine-stitched ball built for daily drills on any surface.',
    sizes: ['3', '4', '5'], color: '#3e63dd', inStock: true, featured: false },
  { slug: 'volta-futsal-ball', name: 'Futsal Ball', brand: 'Volta', category: 'balls', priceCents: 3499,
    description: 'Low-bounce ball for indoor futsal, sized for quick passing and close control.',
    sizes: ['4'], color: '#e5484d', inStock: true, featured: false },

  { slug: 'kickoff-home-jersey', name: 'Home Jersey', brand: 'KickOff', category: 'apparel', priceCents: 6499,
    description: 'Breathable match jersey in club green with a ribbed collar.',
    sizes: apparelSizes, color: '#0e5a3a', inStock: true, featured: true },
  { slug: 'kickoff-away-jersey', name: 'Away Jersey', brand: 'KickOff', category: 'apparel', priceCents: 6499,
    description: 'Lightweight away jersey in chalk white with green trim.',
    sizes: apparelSizes, color: '#d9ddd6', inStock: true, featured: false },
  { slug: 'northpitch-training-top', name: 'Quarter-Zip Training Top', brand: 'Northpitch', category: 'apparel', priceCents: 4499,
    description: 'Brushed-back quarter-zip for cold warmups and early sessions.',
    sizes: apparelSizes, color: '#13201a', inStock: true, featured: false },
  { slug: 'stryker-training-shorts', name: 'Training Shorts', brand: 'Stryker', category: 'apparel', priceCents: 2999,
    description: 'Quick-dry shorts with an elastic waist and inside drawcord.',
    sizes: apparelSizes, color: '#1f6feb', inStock: true, featured: false },

  { slug: 'volta-shield-gk-gloves', name: 'Shield Goalkeeper Gloves', brand: 'Volta', category: 'goalkeeper', priceCents: 4999,
    description: 'Negative-cut gloves with a 4 mm latex palm and finger protection.',
    sizes: ['7', '8', '9', '10'], color: '#f76b15', inStock: true, featured: true },
  { slug: 'northpitch-padded-gk-jersey', name: 'Padded Goalkeeper Jersey', brand: 'Northpitch', category: 'goalkeeper', priceCents: 5499,
    description: 'Long-sleeve keeper jersey with padded elbows for diving saves.',
    sizes: apparelSizes, color: '#8e4ec6', inStock: true, featured: false },

  { slug: 'kickoff-shin-guards', name: 'Slip-In Shin Guards', brand: 'KickOff', category: 'training', priceCents: 1999,
    description: 'Low-profile shin guards with a breathable foam backing.',
    sizes: ['S', 'M', 'L'], color: '#0e5a3a', inStock: true, featured: false },
  { slug: 'kickoff-agility-cones', name: 'Agility Cone Set (20)', brand: 'KickOff', category: 'training', priceCents: 1499,
    description: 'Twenty flexible disc cones in four colors with a carry stand.',
    sizes: ['One size'], color: '#f2c230', inStock: true, featured: false },
  { slug: 'stryker-crew-socks', name: 'Crew Socks (3 pack)', brand: 'Stryker', category: 'training', priceCents: 1799,
    description: 'Cushioned crew socks with arch support. Three pairs per pack.',
    sizes: ['S', 'M', 'L'], color: '#d9ddd6', inStock: true, featured: false },
  { slug: 'kickoff-popup-goal', name: 'Pop-Up Training Goal', brand: 'KickOff', category: 'training', priceCents: 5999,
    description: 'A 6 x 4 ft goal that folds flat for the car. Currently out of stock.',
    sizes: ['One size'], color: '#12a594', inStock: false, featured: false },
];

export const testUsers = [
  { email: 'shopper@kickoff.test', password: 'Password123', firstName: 'Riley', lastName: 'Shopper',
    phone: '919-555-0100', address1: '100 Pitch Lane', city: 'Raleigh', state: 'NC', zip: '27601' },
  { email: 'reviewer@kickoff.test', password: 'Password123', firstName: 'Jordan', lastName: 'Reviewer',
    phone: '919-555-0101', address1: '22 Corner Flag Ct', city: 'Durham', state: 'NC', zip: '27701' },
];
