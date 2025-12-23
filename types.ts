
export enum PropertyType {
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  PLOT = 'Plot',
  VILLA = 'Villa'
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqft
  isFeatured: boolean;
  images: string[];
  createdAt: string;
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'agent' | 'admin';
  favorites: string[];
}

export interface Inquiry {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface FilterState {
  search: string;
  city: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
