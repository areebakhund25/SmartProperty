
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../apiService';
import { getSmartInsights } from '../geminiService';
import { Property, User } from '../types';
import { DetailSkeleton } from '../components/SkeletonLoader';

interface PropertyDetailProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  user: User | null;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ favorites, onToggleFavorite, user }) => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      const data = await apiService.getPropertyById(id);
      setProperty(data);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    load();
  }, [id]);

  const handleGetInsights = async () => {
    if (!property) return;
    setLoadingInsights(true);
    const insights = await getSmartInsights(property);
    setAiInsights(insights);
    setLoadingInsights(false);
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20"><DetailSkeleton /></div>;

  if (!property) return <div className="py-40 text-center font-bold">Property not found.</div>;

  const isFavorite = favorites.includes(property.id);

  return (
    <div className="bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">FOR SALE</span>
                <span className="text-gray-400 text-sm font-medium">Verified Property</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-2">{property.title}</h1>
              <p className="text-gray-500 flex items-center text-lg">
                <i className="fas fa-map-marker-alt text-blue-500 mr-2"></i>
                {property.location}, {property.city}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1">List Price</p>
              <p className="text-4xl font-extrabold text-blue-600">${property.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <img src={property.images[activeImage]} className="w-full h-full object-cover" />
                <button 
                  onClick={() => onToggleFavorite(property.id)}
                  className={`absolute top-6 right-6 p-4 rounded-full shadow-lg transition-all ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'
                  }`}
                >
                  <i className={`${isFavorite ? 'fas' : 'far'} fa-heart text-xl`}></i>
                </button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {property.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-4 transition-all ${
                      activeImage === idx ? 'border-blue-500 scale-95 shadow-lg' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Beds', value: property.bedrooms, icon: 'fa-bed' },
                { label: 'Baths', value: property.bathrooms, icon: 'fa-bath' },
                { label: 'Area', value: `${property.area} ft²`, icon: 'fa-expand' },
                { label: 'Type', value: property.type, icon: 'fa-building' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-3">
                    <i className={`fas ${stat.icon}`}></i>
                  </div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase">{stat.label}</p>
                  <p className="text-gray-900 font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Property Insights</h3>
                <button 
                  onClick={handleGetInsights}
                  disabled={loadingInsights}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
                >
                  {loadingInsights ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
                  {aiInsights ? 'Refresh AI Analysis' : 'Get AI Analysis'}
                </button>
              </div>
              {aiInsights ? (
                <div className="bg-blue-50 p-6 rounded-2xl text-blue-800 leading-relaxed animate-fade-in italic">
                  "{aiInsights}"
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed text-lg">{property.description}</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-24">
              <div className="flex items-center gap-4 mb-8">
                <img src={property.agent.avatar} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h4 className="font-bold text-xl">{property.agent.name}</h4>
                  <p className="text-blue-600 text-sm font-semibold">Listing Agent</p>
                </div>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); setInquirySent(true); }} className="space-y-4">
                <input required placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200" />
                <input required type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl border border-gray-200" />
                <textarea rows={3} placeholder="Message" className="w-full px-4 py-3 rounded-xl border border-gray-200 resize-none"></textarea>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all">
                  {inquirySent ? 'Inquiry Sent!' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
