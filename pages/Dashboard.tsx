
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, Property, PropertyType } from '../types';
import { MOCK_PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';

interface DashboardProps {
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'favorites' | 'add'>('overview');

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const userFavorites = MOCK_PROPERTIES.filter(p => user.favorites.includes(p.id));
  const agentListings = user.role === 'agent' ? MOCK_PROPERTIES.filter(p => p.agent.name === user.name) : [];

  const StatsCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: string; color: string }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${color}`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 space-y-2">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6 text-center">
              <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt={user.name} className="w-20 h-20 rounded-2xl mx-auto mb-4 border-4 border-blue-50 shadow-md" />
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">{user.role}</p>
            </div>

            {[
              { id: 'overview', label: 'Overview', icon: 'fa-chart-pie' },
              { id: 'favorites', label: 'My Favorites', icon: 'fa-heart' },
              ...(user.role === 'agent' ? [
                { id: 'listings', label: 'My Listings', icon: 'fa-list' },
                { id: 'add', label: 'Add Property', icon: 'fa-plus-circle' }
              ] : [])
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatsCard title="Total Views" value="4,250" icon="fa-eye" color="bg-blue-600" />
                  <StatsCard title="Inquiries" value="12" icon="fa-envelope" color="bg-emerald-500" />
                  <StatsCard title="Favorites" value={user.favorites.length} icon="fa-heart" color="bg-rose-500" />
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                  <div className="space-y-6">
                    {[
                      { icon: 'fa-heart', text: 'You favorited "Modern Luxury Villa"', time: '2 hours ago' },
                      { icon: 'fa-envelope', text: 'New inquiry received for "Downtown Penthouse"', time: '5 hours ago' },
                      { icon: 'fa-user-plus', text: 'New user registered on your dashboard', time: '1 day ago' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                          <i className={`fas ${activity.icon}`}></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium text-sm">{activity.text}</p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userFavorites.length > 0 ? (
                  userFavorites.map(p => (
                    <PropertyCard 
                      key={p.id} 
                      property={p} 
                      isFavorite={true} 
                      onToggleFavorite={() => {}} 
                    />
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-gray-500">You haven't added any favorites yet.</p>
                    <Link to="/properties" className="text-blue-600 font-bold mt-4 inline-block hover:underline">
                      Explore Properties
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agentListings.map(p => (
                  <PropertyCard 
                    key={p.id} 
                    property={p} 
                    isFavorite={user.favorites.includes(p.id)} 
                    onToggleFavorite={() => {}} 
                  />
                ))}
                <button 
                  onClick={() => setActiveTab('add')}
                  className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-12 flex flex-col items-center justify-center group hover:border-blue-300 transition-colors"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <i className="fas fa-plus text-2xl"></i>
                  </div>
                  <span className="font-bold text-gray-400 group-hover:text-blue-500">Add New Listing</span>
                </button>
              </div>
            )}

            {activeTab === 'add' && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-8">List Your Property</h3>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Feature coming soon: Property data validation and persistence."); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Modern Villa" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Price ($)</label>
                      <input type="number" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 250000" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Property Type</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location Address</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Street name, District..." />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Beds</label>
                      <input type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Baths</label>
                      <input type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Area (ft²)</label>
                      <input type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                    <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Describe the amazing features..."></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Photos</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 hover:border-blue-300 transition-all cursor-pointer">
                      <i className="fas fa-cloud-upload-alt text-3xl mb-2"></i>
                      <p className="text-sm font-medium">Click to upload or drag and drop photos</p>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all">
                    Publish Listing
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
