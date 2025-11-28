const express = require('express');
const {
  getAllBuses,
  searchBuses,
  getBus,
  createBus,
  updateBus,
  deleteBus
} = require('../controllers/busController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getAllBuses)
  .post(protect, authorize('admin'), createBus);

router.get('/search', searchBuses);

router.route('/:id')
  .get(getBus)
  .put(protect, authorize('admin'), updateBus)
  .delete(protect, authorize('admin'), deleteBus);

module.exports = router;
