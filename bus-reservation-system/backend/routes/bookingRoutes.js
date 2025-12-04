const express = require('express');
const {
  createBooking,
  getAllBookings,
  getMyBookings,
  getBooking,
  cancelBooking,
  getBookedSeats
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getAllBookings)
  .post(protect, createBooking);

router.get('/my-bookings', protect, getMyBookings);
router.get('/booked-seats/:busId', getBookedSeats);

// Public route for QR code ticket download
router.get('/:id', getBooking);

// Protected routes
router.route('/:id')
  .get(protect, getBooking);

router.put('/:id/cancel', protect, cancelBooking);

module.exports = router;
