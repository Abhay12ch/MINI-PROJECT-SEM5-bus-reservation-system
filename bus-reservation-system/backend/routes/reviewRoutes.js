const express = require('express');
const {
  createReview,
  getBusReviews,
  getMyReviews,
  getReviewByBooking,
  updateReview,
  deleteReview,
  getBusRatingStats,
  markHelpful
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/bus/:busId', getBusReviews);
router.get('/stats/:busId', getBusRatingStats);
router.put('/:id/helpful', markHelpful);

// Protected routes
router.post('/', protect, createReview);
router.get('/my-reviews', protect, getMyReviews);
router.get('/booking/:bookingId', protect, getReviewByBooking);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
