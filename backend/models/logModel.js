const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
  {
    // title: {
    //   //订单名称
    //   type: String,
    // },
    orderId: {
      //订单ID
      type: String,
      required: true,
    },
    purchases: {
      //购买次数
      type: String,
      required: true,
    },
    result: {
      // 中奖结果
      type: String,
      required: true,
    },
    _deleted: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Log', logSchema);
