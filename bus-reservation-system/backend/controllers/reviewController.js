const Review = require('../models/ReviewSupabase');
const Booking = require('../models/BookingSupabase');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const { 
      bookingId, 
      rating, 
      comment,
      cleanliness_rating,
      punctuality_rating,
      staff_behavior_rating,
      comfort_rating
    } = req.body;

    // Validate required fields
    if (!bookingId || !rating) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide booking ID and rating' 
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        success: false, 
        message: 'Rating must be between 1 and 5' 
      });
    }

    // Check if booking exists and belongs to user
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }

    if (booking.user_id !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to review this booking' 
      });
    }

    // Check if booking is completed
    if (booking.booking_status !== 'Completed') {
      return res.status(400).json({ 
        success: false, 
        message: 'Can only review completed bookings' 
      });
    }

    // Check if review already exists for this booking
    const existingReview = await Review.findByBookingId(bookingId);
    if (existingReview) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already reviewed this booking' 
      });
    }

    // Create review
    const reviewData = {
      user_id: req.user.id,
      bus_id: booking.bus_id,
      booking_id: bookingId,
      rating,
      comment: comment || null,
      cleanliness_rating: cleanliness_rating || null,
      punctuality_rating: punctuality_rating || null,
      staff_behavior_rating: staff_behavior_rating || null,
      comfort_rating: comfort_rating || null
    };

    const review = await Review.create(reviewData);

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating review',
      error: error.message 
    });
  }
};

// @desc    Get reviews for a bus
// @route   GET /api/reviews/bus/:busId
// @access  Public
exports.getBusReviews = async (req, res) => {
  try {
    const { busId } = req.params;
    const reviews = await Review.findByBusId(busId);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Get bus reviews error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching reviews',
      error: error.message 
    });
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/my-reviews
// @access  Private
exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.findByUserId(req.user.id);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    console.error('Get my reviews error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching reviews',
      error: error.message 
    });
  }
};

// @desc    Get review by booking ID
// @route   GET /api/reviews/booking/:bookingId
// @access  Private
exports.getReviewByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const review = await Review.findByBookingId(bookingId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'No review found for this booking'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Get review by booking error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching review',
      error: error.message 
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      rating, 
      comment,
      cleanliness_rating,
      punctuality_rating,
      staff_behavior_rating,
      comfort_rating
    } = req.body;

    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Rating must be between 1 and 5' 
      });
    }

    const updateData = {};
    if (rating) updateData.rating = rating;
    if (comment !== undefined) updateData.comment = comment;
    if (cleanliness_rating) updateData.cleanliness_rating = cleanliness_rating;
    if (punctuality_rating) updateData.punctuality_rating = punctuality_rating;
    if (staff_behavior_rating) updateData.staff_behavior_rating = staff_behavior_rating;
    if (comfort_rating) updateData.comfort_rating = comfort_rating;

    const review = await Review.update(id, req.user.id, updateData);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or not authorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating review',
      error: error.message 
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.delete(id, req.user.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or not authorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting review',
      error: error.message 
    });
  }
};

// @desc    Get bus rating statistics
// @route   GET /api/reviews/stats/:busId
// @access  Public
exports.getBusRatingStats = async (req, res) => {
  try {
    const { busId } = req.params;
    const stats = await Review.getBusRatingStats(busId);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get rating stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching rating statistics',
      error: error.message 
    });
  }
};

// @desc    Mark review as helpful
// @route   PUT /api/reviews/:id/helpful
// @access  Public
exports.markHelpful = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.incrementHelpful(id);

    res.status(200).json({
      success: true,
      message: 'Marked as helpful'
    });
  } catch (error) {
    console.error('Mark helpful error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error marking review as helpful',
      error: error.message 
    });
  }
};
