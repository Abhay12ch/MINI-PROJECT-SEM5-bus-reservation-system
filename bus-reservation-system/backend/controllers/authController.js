const User = require('../models/UserSupabase');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user exists
    const userExists = await User.findByEmail(email);
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    res.status(201).json({
      success: true,
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    console.log('📥 Login request received');
    console.log('Body:', { email: req.body.email, password: '***' });
    
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      console.log('❌ Validation failed: Missing email or password');
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Check for user (with password)
    console.log('🔍 Looking up user:', email);
    const user = await User.findByEmail(email);
    if (!user) {
      console.log('❌ Login failed: User not found for email:', email);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('✅ User found:', user.email);
    console.log('🔐 Checking password...');
    
    // Check if password matches
    const isMatch = await User.matchPassword(password, user.password);
    if (!isMatch) {
      console.log('❌ Login failed: Password mismatch for email:', email);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('✅ Password matched!');
    console.log('🎉 Login successful for:', email);
    
    res.status(200).json({
      success: true,
      token: generateToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    console.error('💥 Login error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Request password reset (generates temporary code)
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide email address' });
    }

    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a password reset code has been sent.'
      });
    }

    // Generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store reset code in user record
    await User.updateResetCode(user.id, resetCode, resetCodeExpiry);

    console.log(`🔐 Password reset code for ${email}: ${resetCode}`);
    // In production, send this via email instead of logging
    
    res.status(200).json({
      success: true,
      message: 'Password reset code has been generated.',
      resetCode: resetCode // Remove this in production, send via email instead
    });
  } catch (error) {
    console.error('Forgot password error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify reset code and update password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { email, resetCode, newPassword } = req.body;

    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, reset code, and new password'
      });
    }

    // Find user and verify reset code
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid reset code or email' });
    }

    // Verify reset code and check expiry
    const isValidCode = await User.verifyResetCode(user.id, resetCode);
    if (!isValidCode) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset code'
      });
    }

    // Update password
    await User.updatePassword(user.id, newPassword);

    // Clear reset code
    await User.clearResetCode(user.id);

    console.log(`✅ Password reset successful for: ${email}`);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });
  } catch (error) {
    console.error('Reset password error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
