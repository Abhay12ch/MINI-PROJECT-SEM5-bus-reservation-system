const { supabase } = require('../config/supabase');

class Booking {
  // Create booking
  static async create(bookingData) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select(`
        *,
        user:users(id, name, email, phone),
        bus:buses(*)
      `)
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Get all bookings
  static async findAll() {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        user:users(id, name, email, phone),
        bus:buses(bus_number, bus_name, from_location, to_location, departure_time)
      `)
      .order('booking_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
  
  // Get user bookings
  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        bus:buses(bus_number, bus_name, from_location, to_location, departure_time, arrival_time)
      `)
      .eq('user_id', userId)
      .order('booking_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
  
  // Get booking by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        user:users(id, name, email, phone),
        bus:buses(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Update booking
  static async update(id, updates) {
    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Get booked seats for a bus on a specific date
  static async getBookedSeats(busId, journeyDate) {
    const { data, error } = await supabase
      .from('bookings')
      .select('seat_numbers')
      .eq('bus_id', busId)
      .eq('journey_date', journeyDate)
      .eq('booking_status', 'Confirmed');
    
    if (error) throw error;
    
    // Flatten the array of seat numbers
    const bookedSeats = data.flatMap(booking => booking.seat_numbers);
    return bookedSeats;
  }
}

module.exports = Booking;
