const { supabase } = require('../config/supabase');

class Bus {
  // Get all buses
  static async findAll(filters = {}) {
    let query = supabase.from('buses').select('*');
    
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
  
  // Search buses
  static async search({ from, to }) {
    let query = supabase
      .from('buses')
      .select('*')
      .eq('status', 'Active');
    
    // Only apply filters if values are provided
    if (from && from.trim() !== '') {
      query = query.ilike('from_location', `%${from}%`);
    }
    
    if (to && to.trim() !== '') {
      query = query.ilike('to_location', `%${to}%`);
    }
    
    const { data, error } = await query.order('departure_time', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }
  
  // Get bus by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('buses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Create new bus
  static async create(busData) {
    const { data, error } = await supabase
      .from('buses')
      .insert([busData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Update bus
  static async update(id, busData) {
    const { data, error } = await supabase
      .from('buses')
      .update(busData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Delete bus
  static async delete(id) {
    const { error } = await supabase
      .from('buses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
}

module.exports = Bus;
