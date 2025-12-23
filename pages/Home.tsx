
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_PROPERTIES, CITIES, TYPES } from '../constants';
import PropertyCard from '../components/PropertyCard';

interface HomeProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ favorites, onToggleFavorite }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.isFeatured).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedCity) params.append('city', selectedCity);
    if (selectedType) params.append('type', selectedType);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/122/1920/1080" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Discover Your <span className="text-blue-400">Perfect</span> Space
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-light">
            Search thousands of high-quality property listings and find the home of your dreams with SmartProperty.
          </p>

          <form 
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-center"
          >
            <div className="w-full md:flex-1 relative">
              <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Search location, title..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-48">
              <select 
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Any City</option>
                {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="w-full md:w-48">
              <select 
                className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Any Type</option>
                {TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            <button 
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 whitespace-nowrap"
            >
              Search Now
            </button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-300">
            <div className="flex items-center"><i className="fas fa-check-circle text-emerald-400 mr-2"></i> Verified Listings</div>
            <div className="flex items-center"><i className="fas fa-check-circle text-emerald-400 mr-2"></i> No Hidden Fees</div>
            <div className="flex items-center"><i className="fas fa-check-circle text-emerald-400 mr-2"></i> Premium Support</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Properties Sold', value: '1,200+' },
            { label: 'Happy Customers', value: '850+' },
            { label: 'Expert Agents', value: '150+' },
            { label: 'Cities Covered', value: '45+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-extrabold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Our Picks</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Featured Listings</h2>
            </div>
            <Link to="/properties" className="mt-4 md:mt-0 text-blue-600 font-bold flex items-center hover:underline group">
              Browse All Properties <i className="fas fa-chevron-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Why SmartProperty?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">We provide a seamless experience from search to keys-in-hand.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: 'fa-search-location', title: 'Find your Future', desc: 'Powerful search tools and verified listings ensure you find exactly what you are looking for.' },
              { icon: 'fa-shield-alt', title: 'Trusted and Secure', desc: 'Every agent and property listing goes through a rigorous vetting process.' },
              { icon: 'fa-brain', title: 'AI-Powered Insights', desc: 'Get deep property analysis and neighborhood data using our proprietary AI model.' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 text-3xl">
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Are you an Agent?</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
                List your properties with us and reach thousands of potential buyers every day.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
                  Join Our Network
                </Link>
                <Link to="/properties" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm font-bold py-4 px-10 rounded-xl transition-all">
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
