const Bus = require('../models/BusSupabase');

// @desc    Get all buses
// @route   GET /api/buses
// @access  Public
exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.findAll({ status: 'Active' });
    res.status(200).json({
      success: true,
      count: buses.length,
      data: buses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Search buses
// @route   GET /api/buses/search
// @access  Public
exports.searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;

    const buses = await Bus.search({ from, to });

    res.status(200).json({
      success: true,
      count: buses.length,
      data: buses
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single bus
// @route   GET /api/buses/:id
// @access  Public
exports.getBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }
    res.status(200).json({
      success: true,
      data: bus
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new bus
// @route   POST /api/buses
// @access  Private/Admin
exports.createBus = async (req, res) => {
  try {
    // Map frontend fields to database fields
    const busData = {
      bus_number: req.body.busNumber,
      bus_name: req.body.busName,
      bus_type: req.body.busType,
      operator_type: req.body.operatorType || 'Government',
      operator_name: req.body.operatorName || 'UPSRTC',
      from_location: req.body.from,
      to_location: req.body.to,
      departure_time: req.body.departureTime,
      arrival_time: req.body.arrivalTime,
      duration: req.body.duration,
      total_seats: req.body.totalSeats,
      available_seats: req.body.availableSeats || req.body.totalSeats,
      fare: req.body.fare,
      amenities: req.body.amenities || [],
      status: req.body.status
    };
    
    const bus = await Bus.create(busData);
    res.status(201).json({
      success: true,
      data: bus
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update bus
// @route   PUT /api/buses/:id
// @access  Private/Admin
exports.updateBus = async (req, res) => {
  try {
    // Map frontend fields to database fields
    const busData = {
      bus_number: req.body.busNumber,
      bus_name: req.body.busName,
      bus_type: req.body.busType,
      operator_type: req.body.operatorType,
      operator_name: req.body.operatorName,
      from_location: req.body.from,
      to_location: req.body.to,
      departure_time: req.body.departureTime,
      arrival_time: req.body.arrivalTime,
      duration: req.body.duration,
      total_seats: req.body.totalSeats,
      available_seats: req.body.availableSeats,
      fare: req.body.fare,
      amenities: req.body.amenities || [],
      status: req.body.status
    };
    
    const bus = await Bus.update(req.params.id, busData);

    if (!bus) {
      return res.status(404).json({ success: false, message: 'Bus not found' });
    }

    res.status(200).json({
      success: true,
      data: bus
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete bus
// @route   DELETE /api/buses/:id
// @access  Private/Admin
exports.deleteBus = async (req, res) => {
  try {
    await Bus.delete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
