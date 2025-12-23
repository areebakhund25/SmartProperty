
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isFavorite, onToggleFavorite }) => {
  const isNew = new Date().getTime() - new Date(property.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full border border-gray-100">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {isNew && (
            <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm tracking-tighter">
              NEW
            </span>
          )}
          {property.isFeatured && (
            <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm tracking-tighter">
              FEATURED
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); onToggleFavorite(property.id); }}
          className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-200 shadow-md ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'
          }`}
        >
          <i className={`${isFavorite ? 'fas' : 'far'} fa-heart`}></i>
        </button>
        <div className="absolute bottom-4 left-4">
          <span className="bg-gray-900/80 text-white px-3 py-1.5 rounded-lg text-lg font-black backdrop-blur-md">
            ${property.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-400 text-xs mb-4 flex items-center">
          <i className="fas fa-map-marker-alt mr-2 text-blue-500/50"></i>
          {property.location}
        </p>

        <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-50 text-center">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Beds</p>
            <p className="font-bold text-gray-700">{property.bedrooms}</p>
          </div>
          <div className="border-x border-gray-50">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Baths</p>
            <p className="font-bold text-gray-700">{property.bathrooms}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Area</p>
            <p className="font-bold text-gray-700 text-xs">{property.area} <span className="text-[8px]">ft²</span></p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={property.agent.avatar} className="w-6 h-6 rounded-full grayscale group-hover:grayscale-0 transition-all" />
          <span className="text-[11px] font-bold text-gray-500">{property.agent.name.split(' ')[0]}</span>
        </div>
        <Link
          to={`/property/${property.id}`}
          className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:underline"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
