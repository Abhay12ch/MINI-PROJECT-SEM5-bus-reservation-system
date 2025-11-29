const { supabase } = require('../config/supabase');

class Review {
  // Create review
  static async create(reviewData) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select(`
        *,
        user:users(id, name, email),
        bus:buses(id, bus_name, bus_number, operator_name)
      `)
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Get all reviews for a bus
  static async findByBusId(busId) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users(id, name)
      `)
      .eq('bus_id', busId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
  
  // Get user reviews
  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        bus:buses(id, bus_name, bus_number, from_location, to_location)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
  
  // Get review by booking ID
  static async findByBookingId(bookingId) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users(id, name),
        bus:buses(id, bus_name, bus_number)
      `)
      .eq('booking_id', bookingId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw error;
    }
    return data;
  }
  
  // Update review
  static async update(id, userId, updateData) {
    const { data, error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Delete review
  static async delete(id, userId) {
    const { data, error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Get bus rating statistics
  static async getBusRatingStats(busId) {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating, cleanliness_rating, punctuality_rating, staff_behavior_rating, comfort_rating')
      .eq('bus_id', busId);
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        averageCleanliness: 0,
        averagePunctuality: 0,
        averageStaffBehavior: 0,
        averageComfort: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }
    
    const totalReviews = data.length;
    const averageRating = (data.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);
    const averageCleanliness = (data.reduce((sum, r) => sum + (r.cleanliness_rating || 0), 0) / totalReviews).toFixed(1);
    const averagePunctuality = (data.reduce((sum, r) => sum + (r.punctuality_rating || 0), 0) / totalReviews).toFixed(1);
    const averageStaffBehavior = (data.reduce((sum, r) => sum + (r.staff_behavior_rating || 0), 0) / totalReviews).toFixed(1);
    const averageComfort = (data.reduce((sum, r) => sum + (r.comfort_rating || 0), 0) / totalReviews).toFixed(1);
    
    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    data.forEach(r => {
      ratingDistribution[r.rating]++;
    });
    
    return {
      totalReviews,
      averageRating: parseFloat(averageRating),
      averageCleanliness: parseFloat(averageCleanliness),
      averagePunctuality: parseFloat(averagePunctuality),
      averageStaffBehavior: parseFloat(averageStaffBehavior),
      averageComfort: parseFloat(averageComfort),
      ratingDistribution
    };
  }
  
  // Increment helpful count
  static async incrementHelpful(id) {
    const { data, error } = await supabase
      .rpc('increment_helpful_count', { review_id: id });
    
    if (error) throw error;
    return data;
  }
}

module.exports = Review;
