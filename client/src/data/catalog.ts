export interface Variant {
  id: string;
  label: string;
  swatch?: string; // hex color, used as a CSS backgroundColor
  swatchImage?: string; // image path, takes precedence over swatch when set
}

export interface Product {
  id: string;
  stepId: string;
  title: string;
  description: string;
  learnMoreUrl?: string;
  compareAtPrice?: number;
  price: number;
  priceUnit?: string; // "/mo" for plans
  image: string;
  variants?: Variant[];
  category: 'Cameras' | 'Sensors' | 'Accessories' | 'Plan';
  seededQty?: number;
}

export interface Step {
  id: 'cameras' | 'plan' | 'sensors' | 'accessories';
  order: number;
  title: string;
  icon: string;
}

export const steps: Step[] = [
  { id: 'cameras', order: 1, title: 'Choose your cameras', icon: '📷' },
  { id: 'plan', order: 2, title: 'Choose your plan', icon: '📋' },
  { id: 'sensors', order: 3, title: 'Choose your sensors', icon: '🔔' },
  { id: 'accessories', order: 4, title: 'Add extra protection', icon: '🛡️' },
];

export const products: Product[] = [
  // Cameras
  {
    id: 'wyze-cam-v4',
    stepId: 'cameras',
    title: 'Wyze Cam v4',
    description: 'The clearest Wyze Cam ever made.',
    learnMoreUrl: '#',
    compareAtPrice: 35.98,
    price: 27.98,
    image: '/products/wyze-cam-v4.png',
    category: 'Cameras',
    seededQty: 1,
    variants: [
      { id: 'white', label: 'White', swatch: '#FFFFFF', swatchImage: '/products/wyze-cam-v4-white.png' },
      { id: 'grey', label: 'Grey', swatch: '#8E8E93', swatchImage: '/products/wyze-cam-v4-gray.png' },
      { id: 'black', label: 'Black', swatch: '#000000', swatchImage: '/products/wyze-cam-v4-black.png' },
    ],
  },
  {
    id: 'wyze-cam-pan-v3',
    stepId: 'cameras',
    title: 'Wyze Cam Pan v3',
    description: '360° pan and 180° tilt security camera.',
    learnMoreUrl: '#',
    compareAtPrice: 34.98,
    price: 34.98,
    image: 'https://via.placeholder.com/200x200?text=Wyze+Pan+v3',
    category: 'Cameras',
    seededQty: 2,
    variants: [
      { id: 'white', label: 'White', swatch: '#FFFFFF' },
      { id: 'black', label: 'Black', swatch: '#000000' },
    ],
  },
  {
    id: 'wyze-cam-floodlight-v2',
    stepId: 'cameras',
    title: 'Wyze Cam Floodlight v2',
    description: '2K floodlight camera with a 360° view for your garage.',
    learnMoreUrl: '#',
    compareAtPrice: 69.98,
    price: 69.98,
    image: 'https://via.placeholder.com/200x200?text=Floodlight+v2',
    category: 'Cameras',
  },
  {
    id: 'wyze-duo-cam-doorbell',
    stepId: 'cameras',
    title: 'Wyze Duo Cam Doorbell',
    description: 'Two cameras. Two views. Double the protection.',
    learnMoreUrl: '#',
    compareAtPrice: 69.98,
    price: 69.98,
    image: 'https://via.placeholder.com/200x200?text=Duo+Doorbell',
    category: 'Cameras',
  },
  {
    id: 'wyze-battery-cam-pro',
    stepId: 'cameras',
    title: 'Wyze Battery Cam Pro',
    description: 'Protect anywhere. See everything in 2.3K HDR. No power outlet needed.',
    learnMoreUrl: '#',
    compareAtPrice: undefined,
    price: 69.98,
    image: 'https://via.placeholder.com/200x200?text=Battery+Cam+Pro',
    category: 'Cameras',
    variants: [
      { id: 'white', label: 'White', swatch: '#FFFFFF' },
      { id: 'black', label: 'Black', swatch: '#000000' },
    ],
  },

  // Plans
  {
    id: 'cam-unlimited',
    stepId: 'plan',
    title: 'Cam Unlimited',
    description: 'Unlimited cloud storage, priority support, and more.',
    compareAtPrice: 12.99,
    price: 9.99,
    priceUnit: '/mo',
    image: 'https://via.placeholder.com/200x200?text=Cam+Unlimited',
    category: 'Plan',
    seededQty: 1,
  },
  {
    id: 'cam-plus',
    stepId: 'plan',
    title: 'Cam Plus',
    description: '14-day cloud storage and person/pet detection.',
    compareAtPrice: undefined,
    price: 4.99,
    priceUnit: '/mo',
    image: 'https://via.placeholder.com/200x200?text=Cam+Plus',
    category: 'Plan',
  },
  {
    id: 'cam-basic',
    stepId: 'plan',
    title: 'Cam Basic',
    description: '14-day cloud storage.',
    compareAtPrice: undefined,
    price: 0,
    priceUnit: '/mo',
    image: 'https://via.placeholder.com/200x200?text=Cam+Basic',
    category: 'Plan',
  },

  // Sensors
  {
    id: 'wyze-sense-motion-sensor',
    stepId: 'sensors',
    title: 'Wyze Sense Motion Sensor',
    description: 'Triggers alerts when motion is detected.',
    learnMoreUrl: '#',
    compareAtPrice: 69.98,
    price: 69.98,
    image: 'https://via.placeholder.com/200x200?text=Motion+Sensor',
    category: 'Sensors',
    seededQty: 2,
  },
  {
    id: 'wyze-sense-hub-required',
    stepId: 'sensors',
    title: 'Wyze Sense Hub (Required)',
    description: 'Required hub to use Wyze Sense accessories.',
    compareAtPrice: 29.99,
    price: 29.99,
    image: 'https://via.placeholder.com/200x200?text=Sense+Hub',
    category: 'Sensors',
    seededQty: 1,
  },

  // Accessories
  {
    id: 'wyze-microsd-256gb',
    stepId: 'accessories',
    title: 'Wyze MicroSD Card (256GB)',
    description: 'Local storage for continuous recording.',
    learnMoreUrl: '#',
    compareAtPrice: 41.96,
    price: 41.96,
    image: 'https://via.placeholder.com/200x200?text=MicroSD+256GB',
    category: 'Accessories',
    seededQty: 2,
  },
  {
    id: 'wyze-microsd-128gb',
    stepId: 'accessories',
    title: 'Wyze MicroSD Card (128GB)',
    description: 'Local storage for continuous recording.',
    compareAtPrice: 20.98,
    price: 20.98,
    image: 'https://via.placeholder.com/200x200?text=MicroSD+128GB',
    category: 'Accessories',
  },
];
