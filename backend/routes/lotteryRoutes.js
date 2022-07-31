const express = require('express');
const router = express.Router();
const {
  getLotterys,
  createLottery,
  updateLottery,
  deleteLottery,
  lottery,
} = require('../controllers/lotteryController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getLotterys);
router.route('/create').post(createLottery);
router.route('/').delete(protect, deleteLottery).put(updateLottery);
router.route('/lottery').post(lottery);

module.exports = router;
