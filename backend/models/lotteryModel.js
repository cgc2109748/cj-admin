const mongoose = require('mongoose');

const lotterySchema = mongoose.Schema(
  {
    name: {
      //活动名称
      type: String,
      // required: [true, 'Please add a name value'],
    },
    activityTime: {
      //活动时间段
      type: Array,
      required: [true, 'Please add a activityTime value'],
    },
    startTime: {
      //活动开始时间
      type: String,
      required: [true, 'Please add a startTime value'],
    },
    endTime: {
      //活动结束时间
      type: String,
      required: [true, 'Please add a endTime value'],
    },
    // type: {
    //   //奖项类型
    //   type: String,
    //   required: [true, 'Please add a type value'],
    // },
    num: {
      //奖品数量
      type: Number,
      required: [true, 'Please add a code value'],
    },
    img: {
      //奖品图片
      type: String,
      required: false,
    },
    status: {
      //状态
      type: String,
      required: [true, 'Please add a status value'],
    },
    lottery1: {
      //奖品一
      type: String,
    },
    probabilityType1: {
      //概率方式
      type: String,
    },
    probabilityRate1: {
      //中奖概率
      type: Number,
    },
    lottery2: {
      //奖品二
      type: String,
    },
    probabilityType2: {
      //概率方式
      type: String,
    },
    probabilityRate2: {
      //中奖概率
      type: Number,
    },
    lottery3: {
      //奖品三
      type: String,
    },
    probabilityType3: {
      //概率方式
      type: String,
    },
    probabilityRate3: {
      //中奖概率
      type: Number,
    },
    numberOfProbability: {
      //中奖概率生效次数
      type: Number,
    },
    promotionType: {
      //优惠方式
      type: String,
      required: [true, 'Please add a promotionType value'],
    },
    deductionAmount: {
      //固定扣减金额
      type: Number,
      required: false,
    },
    discount: {
      //固定折扣
      type: String,
      required: false,
    },
    remark: {
      //备注
      type: String,
      required: false,
    },
    winnerCount: {
      //中奖次数统计
      type: Number,
      required: false,
    },
    accessCount: {
      //活动访问次数
      type: Number,
      required: false,
    },
    triggerCount: {
      //活动参加次数
      type: Number,
      required: false,
    },
    singleCount: {
      // 单抽次数统计
      type: Number,
      required: false,
    },
    tenTimesCount: {
      // 十连抽次数统计
      type: Number,
      required: false,
    },
    hundredTimesCount: {
      // 一百连抽次数统计
      type: Number,
      required: false,
    },
    income: {
      //累计收入
      type: Number,
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
