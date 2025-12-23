
import { Property, PropertyType } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Villa',
    description: 'A stunning modern villa with panoramic ocean views, featuring smart home integration and high-end finishes throughout.',
    price: 1250000,
    location: 'Hilltop Estate, Beverly Hills',
    city: 'Los Angeles',
    type: PropertyType.VILLA,
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    isFeatured: true,
    images: [
      'https://picsum.photos/id/10/800/600',
      'https://picsum.photos/id/11/800/600',
      'https://picsum.photos/id/12/800/600'
    ],
    createdAt: '2023-11-01',
    agent: {
      name: 'Sarah Connor',
      phone: '+1 555-0101',
      email: 'sarah@smartproperty.com',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    }
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    description: 'Experience city living at its finest in this spacious penthouse. Floor-to-ceiling windows offer breathtaking views of the skyline.',
    price: 850000,
    location: 'Central Plaza, Lower Manhattan',
    city: 'New York',
    type: PropertyType.APARTMENT,
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    isFeatured: true,
    images: [
      'https://picsum.photos/id/20/800/600',
      'https://picsum.photos/id/21/800/600',
      'https://picsum.photos/id/22/800/600'
    ],
    createdAt: '2023-11-05',
    agent: {
      name: 'Michael Ross',
      phone: '+1 555-0102',
      email: 'mike@smartproperty.com',
      avatar: 'https://i.pravatar.cc/150?u=mike'
    }
  },
  {
    id: '3',
    title: 'Cozy Family Suburban House',
    description: 'Perfect for a growing family, this house offers a large backyard and is located in a top-rated school district.',
    price: 450000,
    location: 'Oak Drive, Sunnyvale',
    city: 'San Jose',
    type: PropertyType.HOUSE,
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    isFeatured: false,
    images: [
      'https://picsum.photos/id/30/800/600',
      'https://picsum.photos/id/31/800/600'
    ],
    createdAt: '2023-11-10',
    agent: {
      name: 'Jessica Pearson',
      phone: '+1 555-0103',
      email: 'jessica@smartproperty.com',
      avatar: 'https://i.pravatar.cc/150?u=jess'
    }
  },
  {
    id: '4',
    title: 'Prime Commercial Plot',
    description: 'A strategic plot of land ready for commercial development in the heart of the business district.',
    price: 2100000,
    location: 'Tech Corridor, Austin',
    city: 'Austin',
    type: PropertyType.PLOT,
    bedrooms: 0,
    bathrooms: 0,
    area: 12000,
    isFeatured: false,
    images: [
      'https://picsum.photos/id/40/800/600'
    ],
    createdAt: '2023-11-12',
    agent: {
      name: 'Louis Litt',
      phone: '+1 555-0104',
      email: 'louis@smartproperty.com',
      avatar: 'https://i.pravatar.cc/150?u=louis'
    }
  },
  {
    id: '5',
    title: 'Rustic Lakefront Cabin',
    description: 'Escape the city to this beautiful lakefront property. Ideal for weekend getaways or permanent residence.',
    price: 620000,
    location: 'Blue Lake Trail, Tahoe',
    city: 'Lake Tahoe',
    type: PropertyType.HOUSE,
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    isFeatured: true,
    images: [
      'https://picsum.photos/id/50/800/600',
      'https://picsum.photos/id/51/800/600'
    ],
    createdAt: '2023-11-15',
    agent: {
      name: 'Harvey Specter',
      phone: '+1 555-0105',
      email: 'harvey@smartproperty.com',
      avatar: 'https://i.pravatar.cc/150?u=harvey'
    }
  },
  {
    id: '6',
    title: 'Chic Urban Studio',
    description: 'Efficient living in a vibrant neighborhood. Close to cafes, transit, and nightlife.',
    price: 320000,
    location: 'Arts District, Miami',
    city: 'Miami',
    type: PropertyType.APARTMENT,
    bedrooms: 1,
    bathrooms: 1,
    area: 750,
    isFeatured: false,
    images: [
      'https://picsum.photos/id/60/800/600',
      'https://picsum.photos/id/61/800/600'
    ],
    createdAt: '2023-11-20',
    agent: {
      name: 'Donna Paulsen',
      phone: '+1 555-0106',
      email: 'donna@smartproperty.com',
      avatar: 'https://i.pravatar.cc/150?u=donna'
    }
  }
];

export const CITIES = Array.from(new Set(MOCK_PROPERTIES.map(p => p.city)));
export const TYPES = Object.values(PropertyType);
