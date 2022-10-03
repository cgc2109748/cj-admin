const mongoose = require('mongoose');

const awardSchema = mongoose.Schema(
  {
    name: {
      //奖品名称
      type: String,
      required: true,
    },
    img: {
      //奖品图片
      type: String,
      required: false,
    },
    amount: {
      //奖品库存
      type: Number,
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

module.exports = mongoose.model('Award', awardSchema);
