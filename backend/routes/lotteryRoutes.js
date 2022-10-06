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
router.route('/').put(updateLottery);
router.route('/create').post(createLottery);
router.route('/:id').delete(protect, deleteLottery).put(updateLottery);
router.route('/lottery').post(lottery);

module.exports = router;
