const express = require('express');
const router = express.Router();
const {
  getAwards,
  setAward,
  updateAward,
  deleteAward,
} = require('../controllers/awardController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getAwards);
router.route('/:id').put(updateAward);
router.route('/create').post(setAward);
router.route('/:id').delete(protect, deleteAward);

module.exports = router;
