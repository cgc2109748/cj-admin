const express = require('express');
const router = express.Router();
const {
  getLotteryLogs,
  setLotteryLog,
  updateLotteryLog,
  deleteLotteryLog,
} = require('../controllers/lotteryLogsController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getLotteryLogs);
router.route('/create').post(setLotteryLog);
router.route('/').delete(protect, deleteLotteryLog).put(updateLotteryLog);

module.exports = router;
