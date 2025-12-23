
import { supabase } from './supabaseClient';
import { Property, FilterState, PaginatedResponse } from './types';

export const apiService = {
  getProperties: async (filters: FilterState): Promise<PaginatedResponse<Property>> => {
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
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as any;
  },

  toggleFavorite: async (userId: string, propertyId: string) => {
    const { data: existing } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('property_id', propertyId)
      .single();

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
    const { data, error } = await supabase
      .from('favorites')
      .select('property_id')
      .eq('user_id', userId);
    
    if (error) return [];
    return data.map(f => f.property_id);
  },

  addProperty: async (propertyData: any) => {
    const { data, error } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
