export interface Property {
  id: string;
  title: string;
  price: number;
  priceType: 'night' | 'week' | 'month' | 'year';
  beds: number;
  baths: number;
  guests: number;
  type: 'apartment' | 'hostel' | 'shortlet' | 'lounge' | 'shared' | 'selfcon' | 'room';
  location: string;
  state: string;
  image: string;
  images: string[];
  amenities: string[];
  availableFrom: string;
  availableTo?: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  agent?: Agent;
  owner?: Owner;
  isVerified: boolean;
  isInstantBook: boolean;
  rating: number;
  reviewCount: number;
  propertyCategory: 'student' | 'shortlet' | 'residential';
  minStay: number;
  maxStay?: number;
  virtualTour?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
  avatar: string;
  company: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  listings: number;
  location: string;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
  isVerified: boolean;
  joinedDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  location: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  state: string;
  image: string;
  listingCount: number;
  avgPrice: number;
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  propertyType: string[];
  priceRange: [number, number];
  amenities: string[];
  category: 'all' | 'student' | 'shortlet' | 'residential';
}

export interface AIListingInput {
  description: string;
  location: string;
  budget: number;
  duration: string;
  preferences: string[];
}

export interface Conversation {
  id: string;
  participant: Agent | Owner;
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
  };
  unreadCount: number;
}
