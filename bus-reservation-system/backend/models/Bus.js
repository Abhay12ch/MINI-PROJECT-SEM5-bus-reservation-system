const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: [true, 'Please add a bus number'],
    unique: true,
    trim: true
  },
  busName: {
    type: String,
    required: [true, 'Please add a bus name'],
    trim: true
  },
  busType: {
    type: String,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
    required: [true, 'Please specify bus type']
  },
  from: {
    type: String,
    required: [true, 'Please add departure location'],
    trim: true
  },
  to: {
    type: String,
    required: [true, 'Please add destination location'],
    trim: true
  },
  departureTime: {
    type: String,
    required: [true, 'Please add departure time']
  },
  arrivalTime: {
    type: String,
    required: [true, 'Please add arrival time']
  },
  duration: {
    type: String,
    required: [true, 'Please add journey duration']
  },
  totalSeats: {
    type: Number,
    required: [true, 'Please add total seats'],
    default: 40
  },
  availableSeats: {
    type: Number,
    required: true,
    default: 40
  },
  fare: {
    type: Number,
    required: [true, 'Please add fare'],
    min: 0
  },
  amenities: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Maintenance'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bus', busSchema);
