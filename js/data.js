/**
 * Trrip Traveller App - Centralized Data Store
 * Contains curated restaurants, promotional slides, coupons, and location mapping.
 */

const restaurantsData = {
  'surya-mahal': {
    id: 'surya-mahal',
    title: 'Surya Mahal Restaurant',
    subtitle: 'Known local restaurant for authentic Rajasthani heritage family meals.',
    rating: '4.4',
    reviews: '850+ reviews',
    cost: '₹1,500 for two',
    hours: 'Opens till 22:00',
    address: 'Panch Batti, C Scheme, Ashok Nagar, Jaipur, Rajasthan 302001, Jaipur, Rajasthan 302017',
    proximity: '0.8 km from Albert Hall Museum',
    heroImg: './assets/suryamahal_dining_hall.jpg',
    dietary: 'Pure Veg • 100% Desi Ghee',
    phone: '+911412369845',
    mapsUrl: 'https://maps.google.com/?q=Surya+Mahal+Panch+Batti+Jaipur'
  },
  'retreat-bar': {
    id: 'retreat-bar',
    title: 'The Retreat Bar & Lounge',
    subtitle: 'Scenic Heritage Rooftop Cocktails & Tapas with Sunset City Views',
    rating: '4.2',
    reviews: '1.2k reviews',
    cost: '₹1,800 for two',
    hours: 'Opens till 01:00',
    address: 'Fortune Select Metropolitan, Bais Godam, Jaipur, Rajasthan 302006',
    proximity: '1.6 km from Albert Hall Museum',
    heroImg: './assets/jaipur_rooftop_dining.jpg',
    dietary: 'Cocktail Lounge & Global Tapas',
    phone: '+911412211999',
    mapsUrl: 'https://maps.google.com/?q=The+Retreat+Fortune+Select+Metropolitan+Jaipur'
  },
  'forresta': {
    id: 'forresta',
    title: 'The Forresta Kitchen & Bar',
    subtitle: 'Lush Open-Air Garden Dining with Live Acoustic Music & Multi-Cuisine',
    rating: '4.5',
    reviews: '2.4k reviews',
    cost: '₹1,600 for two',
    hours: 'Opens till 23:30',
    address: 'Van Shiv Niketan, Devraj Niwas, Bani Park, Jaipur, Rajasthan 302016',
    proximity: '2.8 km from Albert Hall Museum',
    heroImg: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    dietary: 'Garden Dining • Multi-Cuisine',
    phone: '+911412200550',
    mapsUrl: 'https://maps.google.com/?q=The+Forresta+Kitchen+and+Bar+Jaipur'
  }
};

const curatedSlides = [
  {
    id: 'retreat-bar',
    tag: 'Curated for you',
    title: 'Heritage Rooftops & Cocktails',
    perk: 'Up to 20% off with <span class="text-teal-300 font-bold">Trrip Dining</span>',
    img: './assets/jaipur_rooftop_dining.jpg',
    alt: 'Scenic Heritage Rooftops & Cocktails in Jaipur'
  },
  {
    id: 'surya-mahal',
    tag: 'Authentic Heritage',
    title: 'Authentic Royal Thalis & Sweets',
    perk: '10% OFF with <span class="text-teal-300 font-bold">Trrip Dining</span>',
    img: './assets/dal_baati_churma.jpg',
    alt: 'Authentic Royal Thalis and Rajasthani Feast'
  },
  {
    id: 'forresta',
    tag: 'Garden & Lounge',
    title: 'Open-Air Garden Dining & Cocktails',
    perk: 'Flat 20% OFF with <span class="text-teal-300 font-bold">Trrip Dining</span>',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSRXVHrOuwXUZSAuQU9gNP0FQfO5U9Wr3sg5KEWoT5ueM4-5DTMg7oHGkxGu_sj721G3K8Zp9imF781XgG5mTkc9i2JsMEHv3C0azajSv1iY45agzwDyWZnSf88vkONARHRZ77bwMa5CEXeBz96ZFZFgV8UbHpfBiCgk4yCewR59kAC16UEdiGAWJ3bg0Fi87znv6fnvYGhaLomt6sLqg-Xpbjqv__CY23fzwJBXKH-39Sgyoo8PeK',
    alt: 'Open-Air Garden Dining & Cocktails at The Forresta'
  }
];

const availableCoupons = {
  'TRRIP10': {
    code: 'TRRIP10',
    type: 'percent',
    rate: 0.10,
    description: 'Flat 10% off with Trrip Pass'
  },
  'FESTIVE15': {
    code: 'FESTIVE15',
    type: 'percent',
    rate: 0.15,
    description: 'Festive 15% special discount'
  },
  'WELCOME50': {
    code: 'WELCOME50',
    type: 'flat',
    rate: 50,
    description: '₹50 flat welcome dining discount'
  }
};

const subtitleMap = {
  'Jaipur': 'Near Albert Hall Museum',
  'C-Scheme, Jaipur': 'Near Central Park & Statue Circle',
  'MI Road, Jaipur': 'Near Panch Batti & Raj Mandir',
  'Raja Park, Jaipur': 'Near LBS College & Fashion Hub',
  'Malviya Nagar, Jaipur': 'Near World Trade Park (WTP)'
};

// Application Runtime State
const state = {
  currentRestaurant: 'surya-mahal',
  bookingData: {
    restaurant: 'Surya Mahal Restaurant & Cafe',
    guests: '2 Guests',
    slot: '8:00 PM',
    discount: '10% OFF'
  },
  activeCoupon: {
    code: 'TRRIP10',
    type: 'percent',
    rate: 0.10,
    description: 'Flat 10% off with Trrip Pass'
  }
};
