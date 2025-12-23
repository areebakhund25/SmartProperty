
import { supabase } from './supabaseClient';
import { Property, FilterState, PaginatedResponse } from './types';
import { MOCK_PROPERTIES } from './constants';

const isSupabaseConfigured = !!supabase;

export const apiService = {
  getProperties: async (filters: FilterState): Promise<PaginatedResponse<Property>> => {
    if (!isSupabaseConfigured) {
      console.warn("Using mock data as Supabase is not configured.");
      return simulateMockPagination(filters);
    }

    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' });

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
    }

    if (filters.city) {
      query = query.eq('city', filters.city);
    }

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    if (filters.bedrooms && filters.bedrooms !== 'any') {
      query = query.gte('bedrooms', parseInt(filters.bedrooms));
    }

    query = query.lte('price', filters.maxPrice);

    const limit = 6;
    const page = filters.page || 1;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      data: (data || []) as any[],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    };
  },

  getPropertyById: async (id: string): Promise<Property | null> => {
    if (!isSupabaseConfigured) {
      return MOCK_PROPERTIES.find(p => p.id === id) || null;
    }

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as any;
  },

  toggleFavorite: async (userId: string, propertyId: string) => {
    if (!isSupabaseConfigured) return;

    const { data: existing } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .maybeSingle();

    if (existing) {
      return supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('property_id', propertyId);
    } else {
      return supabase
        .from('favorites')
        .insert({ user_id: userId, property_id: propertyId });
    }
  },

  getUserFavorites: async (userId: string) => {
    if (!isSupabaseConfigured) return [];

    const { data, error } = await supabase
      .from('favorites')
      .select('property_id')
      .eq('user_id', userId);
    
    if (error) return [];
    return data.map((f: any) => f.property_id);
  },

  addProperty: async (propertyData: any) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured. Cannot add property.");
    }

    const { data, error } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

/**
 * Helper to simulate pagination with mock data when DB is not ready
 */
async function simulateMockPagination(filters: FilterState): Promise<PaginatedResponse<Property>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...MOCK_PROPERTIES];
      if (filters.search) {
        const s = filters.search.toLowerCase();
        filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.location.toLowerCase().includes(s));
      }
      if (filters.city) filtered = filtered.filter(p => p.city === filters.city);
      if (filters.type) filtered = filtered.filter(p => p.type === filters.type);
      filtered = filtered.filter(p => p.price <= filters.maxPrice);

      const limit = 6;
      const page = filters.page || 1;
      const start = (page - 1) * limit;
      const data = filtered.slice(start, start + limit);

      resolve({
        data,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      });
    }, 500);
  });
}
