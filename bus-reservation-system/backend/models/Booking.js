const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  seatNumbers: [{
    type: Number,
    required: true
  }],
  passengerName: {
    type: String,
    required: [true, 'Please add passenger name'],
    trim: true
  },
  passengerAge: {
    type: Number,
    required: [true, 'Please add passenger age'],
    min: 1,
    max: 120
  },
  passengerGender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Please specify gender']
  },
  passengerPhone: {
    type: String,
    required: [true, 'Please add phone number'],
    match: [/^[0-9]{10}$/, 'Please add a valid 10-digit phone number']
  },
  journeyDate: {
    type: Date,
    required: [true, 'Please add journey date']
  },
  totalFare: {
    type: Number,
    required: true,
    min: 0
  },
  bookingStatus: {
    type: String,
    enum: ['Confirmed', 'Cancelled', 'Completed'],
    default: 'Confirmed'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Refunded'],
    default: 'Paid'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
