
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../apiService';
import { CITIES, TYPES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { PropertySkeleton } from '../components/SkeletonLoader';
import { Property, FilterState } from '../types';

interface ListingsProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const Listings: React.FC<ListingsProps> = ({ favorites, onToggleFavorite }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Property[]>([]);
  const [total, setTotal] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync state with URL
  const filters: FilterState = {
    search: searchParams.get('q') || '',
    city: searchParams.get('city') || '',
    type: searchParams.get('type') || '',
    minPrice: parseInt(searchParams.get('min') || '0'),
    maxPrice: parseInt(searchParams.get('max') || '5000000'),
    bedrooms: searchParams.get('beds') || 'any',
    page: parseInt(searchParams.get('page') || '1'),
  };

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.getProperties(filters);
      setData(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const next = { ...filters, ...newFilters, page: 1 };
    const params: any = {};
    if (next.search) params.q = next.search;
    if (next.city) params.city = next.city;
    if (next.type) params.type = next.type;
    if (next.maxPrice !== 5000000) params.max = next.maxPrice.toString();
    if (next.bedrooms !== 'any') params.beds = next.bedrooms;
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Property <span className="text-blue-600">Results</span>
            <span className="text-gray-400 text-lg font-medium ml-3">
              ({loading ? '...' : total} found)
            </span>
          </h1>

          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden w-full flex items-center justify-center gap-2 p-3 bg-white border border-gray-200 rounded-xl text-blue-600 font-bold"
          >
            <i className="fas fa-filter"></i> Refine Search
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className={`fixed inset-0 z-50 lg:relative lg:inset-auto lg:block w-72 transform transition-transform duration-300 bg-white lg:bg-transparent ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
            <div className="h-full flex flex-col p-6 lg:p-0">
              <div className="flex justify-between items-center lg:hidden mb-6">
                <h3 className="font-bold text-xl">Filters</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Keyword</label>
                    <input 
                      type="text" 
                      defaultValue={filters.search}
                      onBlur={(e) => updateFilters({ search: e.target.value })}
                      placeholder="Search..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">City</label>
                    <select 
                      value={filters.city}
                      onChange={(e) => updateFilters({ city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none"
                    >
                      <option value="">All Cities</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Max Price</label>
                    <div className="flex justify-between text-blue-600 font-bold mb-2">
                      <span className="text-xs font-medium text-gray-400">$100k</span>
                      <span>${filters.maxPrice.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="100000" max="5000000" step="100000"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilters({ maxPrice: parseInt(e.target.value) })}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <button 
                    onClick={() => setSearchParams({})}
                    className="w-full py-2 text-gray-400 font-bold text-xs uppercase hover:text-red-500 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <PropertySkeleton key={i} />)}
              </div>
            ) : data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {data.map(property => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {total > 6 && (
                  <div className="flex justify-center gap-2">
                    {[...Array(Math.ceil(total / 6))].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                          filters.page === i + 1 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                            : 'bg-white text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-3xl p-20 text-center border border-gray-100">
                <i className="fas fa-search-minus text-5xl text-gray-200 mb-6"></i>
                <h3 className="text-2xl font-bold text-gray-800">No properties found</h3>
                <p className="text-gray-500 mt-2">Adjust your search filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>}
    </div>
  );
};

export default Listings;
