const { supabase } = require('../config/supabase');
const bcrypt = require('bcryptjs');

class User {
  // Create new user
  static async create(userData) {
    const { name, email, password, phone, role = 'user' } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          phone,
          role
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Find user by email
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
  
  // Find user by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, phone, role, created_at')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }
  
  // Compare password
  static async matchPassword(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
  
  // Update reset code
  static async updateResetCode(userId, resetCode, expiry) {
    const { error } = await supabase
      .from('users')
      .update({
        reset_code: resetCode,
        reset_code_expiry: expiry.toISOString()
      })
      .eq('id', userId);
    
    if (error) throw error;
    return true;
  }
  
  // Verify reset code
  static async verifyResetCode(userId, resetCode) {
    const { data, error } = await supabase
      .from('users')
      .select('reset_code, reset_code_expiry')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    if (!data || !data.reset_code || !data.reset_code_expiry) return false;
    
    const now = new Date();
    const expiry = new Date(data.reset_code_expiry);
    
    return data.reset_code === resetCode && now < expiry;
  }
  
  // Update password
  static async updatePassword(userId, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    const { error } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', userId);
    
    if (error) throw error;
    return true;
  }
  
  // Clear reset code
  static async clearResetCode(userId) {
    const { error } = await supabase
      .from('users')
      .update({
        reset_code: null,
        reset_code_expiry: null
      })
      .eq('id', userId);
    
    if (error) throw error;
    return true;
  }
}

module.exports = User;
