const mongoose = require('mongoose');

const lotterySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    type: {
      type: String,
      required: [true, 'Please add a type value'],
    },
    num: {
      type: Number,
      required: [true, 'Please add a code value'],
    },
    img: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: [true, 'Please add a status value'],
    },
    probabilityType: {
      type: String,
      required: [true, 'Please add a total value'],
    },
    probabilityRate: {
      type: Number,
      required: [true, 'Please add a total value'],
    },
    numberOfProbability: {
      type: Number,
    },
    promotionType: {
      type: String,
      required: [true, 'Please add a total value'],
    },
    deductionAmount: {
      type: Number,
      required: false,
    },
    discount: {
      type: String,
      required: false,
    },
    remark: {
      type: String,
      required: false,
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

module.exports = mongoose.model('Lottery', lotterySchema);
