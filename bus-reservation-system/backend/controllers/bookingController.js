const Booking = require('../models/BookingSupabase');
const Bus = require('../models/BusSupabase');
const { normalizeDate, isValidDate, isDatePast } = require('../utils/dateUtils');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const {
      bus,
      seatNumbers,
      passengerName,
      passengerAge,
      passengerGender,
      passengerPhone,
      journeyDate,
      totalFare
    } = req.body;

    // Normalize and validate journey date
    const normalizedDate = normalizeDate(journeyDate);
    
    if (!isValidDate(normalizedDate)) {
      return res.status(400).json({ success: false, message: 'Invalid journey date' });
    }
    
    if (isDatePast(normalizedDate)) {
      return res.status(400).json({ success: false, message: 'Cannot book for past dates' });
    }

    // Check if bus exists
    const busData = await Bus.findById(bus);
    if (!busData) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    // Check if seats are available
    if (busData.available_seats < seatNumbers.length) {
      return res.status(400).json({ success: false, message: 'Not enough seats available' });
    }

    // Check if seats are already booked for this date (use normalized date)
    const bookedSeats = await Booking.getBookedSeats(bus, normalizedDate);
    const conflictSeats = seatNumbers.filter(seat => bookedSeats.includes(seat));

    if (conflictSeats.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Seats ${conflictSeats.join(', ')} are already booked`
      });
    }

    // Create booking with normalized date
    const booking = await Booking.create({
      user_id: req.user.id,
      bus_id: bus,
      seat_numbers: seatNumbers,
      passenger_name: passengerName,
      passenger_age: passengerAge,
      passenger_gender: passengerGender,
      passenger_phone: passengerPhone,
      journey_date: normalizedDate,
      total_fare: totalFare
    });

    // Update available seats
    await Bus.update(bus, {
      available_seats: busData.available_seats - seatNumbers.length
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findByUserId(req.user.id);

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Make sure user is booking owner or admin
    if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Make sure user is booking owner or admin
    if (booking.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    if (booking.booking_status === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'Booking already cancelled' });
    }

    // Update booking status
    const updatedBooking = await Booking.update(req.params.id, {
      booking_status: 'Cancelled',
      payment_status: 'Refunded'
    });

    // Update available seats
    const bus = await Bus.findById(booking.bus_id);
    await Bus.update(booking.bus_id, {
      available_seats: bus.available_seats + booking.seat_numbers.length
    });

    res.status(200).json({
      success: true,
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get booked seats for a bus on a specific date
// @route   GET /api/bookings/booked-seats/:busId
// @access  Public
exports.getBookedSeats = async (req, res) => {
  try {
    const { busId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: 'Please provide journey date' });
    }

    // Normalize the date to ensure consistent format
    const normalizedDate = normalizeDate(date);
    
    if (!isValidDate(normalizedDate)) {
      return res.status(400).json({ success: false, message: 'Invalid date format' });
    }

    const bookedSeats = await Booking.getBookedSeats(busId, normalizedDate);

    res.status(200).json({
      success: true,
      data: bookedSeats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
