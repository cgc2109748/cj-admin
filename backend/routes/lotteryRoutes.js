const express = require('express');
const router = express.Router();
const {
  getLotterys,
  createLottery,
  updateLottery,
  deleteLottery,
} = require('../controllers/lotteryController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getLotterys);
router.route('/create').post(createLottery);
router.route('/:id').delete(protect, deleteLottery).put(updateLottery);

module.exports = router;
