const e = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');
const _ = require('lodash');
const mongoose = require('mongoose');
const Roll = require('../utils/roll');

const Lottery = require('../models/lotteryModel');
const Log = require('../models/logModel');
// const User = require('../models/userModel')

// @desc    Get Products
// @route   GET /api/lotterys
// @access  Private
const getLotterys = asyncHandler(async (req, res) => {
  const lotterys = await Lottery.find();

  res.status(200).json(_.orderBy(lotterys, ['updatedDate'], ['desc']));
});

// @desc    Create Lottery
// @route   POST /api/lottery
// @access  Private
const createLottery = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }

  const lottery = await Lottery.create({
    name: req.body.name,
    // type: req.body.type,
    activityTime: req.body.activityTime,
    startTime: moment(req.body.activityTime[0]).format('YYYY-MM-DD HH:mm:ss'),
    endTime: moment(req.body.activityTime[1]).format('YYYY-MM-DD HH:mm:ss'),
    num: req.body.num,
    img: req.body.img,
    status: req.body.status,
    lottery1: req.body.lottery1,
    probabilityType1: req.body.probabilityType1,
    probabilityRate1: req.body.probabilityRate1,
    lottery2: req.body.lottery2,
    probabilityType2: req.body.probabilityType2,
    probabilityRate2: req.body.probabilityRate2,
    lottery3: req.body.lottery3,
    probabilityType3: req.body.probabilityType3,
    probabilityRate3: req.body.probabilityRate3,
    numberOfProbability: req.body.numberOfProbability,
    promotionType: req.body.promotionType,
    deductionAmount: req.body.deductionAmount,
    discount: req.body.discount,
    winnerCount: 0,
    accessCount: 0,
    triggerCount: 0,
    singleCount: 0,
    tenTimesCount: 0,
    hundredTimesCount: 0,
    income: 0,
    remark: req.body.remark,
    _deleted: req.body._deleted,
    createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
  });

  res.status(200).json(lottery);
});

// @desc    Update Lottery
// @route   PUT /api/lotterys/:id
// @access  Private
const updateLottery = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let access = null;
  let lottery = null;
  if (_.isEmpty(id)) {
    id = req.query.id;
    access = req.query.access;
    lottery = await Lottery.findById(id);
  } else {
    lottery = await Lottery.findById(id);
  }

  if (!lottery) {
    res.status(400);
    throw new Error('Lottery not found');
  }

  let data = {
    ...req.body,
    ...{
      startTime: moment(req.body.activityTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment(req.body.activityTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      accessCount: Boolean(access) && Number(lottery.accessCount) + 1,
      updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  };

  await Lottery.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({ access: true });
});

// @desc    Delete Lottery
// @route   DELETE /api/lotterys/:id
// @access  Private
const deleteLottery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const LotteryData = await Lottery.findById(id);

  if (!lottery) {
    res.status(400);
    throw new Error('Lottery not found');
  }

  await LotteryData.remove();

  res.status(200).json({ id: req.params.id });
});

// @desc     Lottery
// @route   POST /api/lotterys/lottery
// @access  Private

const lotteryLevel = ['一等奖', '二等奖', '三等奖', '四等奖', '五等奖'];

const lottery = asyncHandler(async (req, res) => {
  const { id, times } = req.query;
  try {
    const lottery = await Lottery.findById(mongoose.Types.ObjectId(id));
    if (!lottery) {
      res.status(200).json({ message: '查找不到对应的活动' });
    } else {
      console.log(
        'isFinished: ',
        moment(moment()).isBetween(lottery.startTime, lottery.endTime),
      );
      if (moment(moment()).isBetween(lottery.startTime, lottery.endTime)) {
        console.log('开始抽奖-------');
        console.log('-> times', times);
        // if (lottery.triggerCount )
        let roll = new Roll();
        let thanksRate = 0;

        for (let i = 0; i < lottery.num; i++) {
          roll.add(lotteryLevel[i], lottery[`probabilityRate${i + 1}`] * 100);
          thanksRate += lottery[`probabilityRate${i + 1}`] * 100;
        }

        console.log('-> thanksRate', thanksRate);
        roll.add('谢谢参与！', 100 - thanksRate);

        let win = false;
        let result = [];

        if (times === 100 || times === '100') {
          result.push('一等奖');
        } else {
          // 循环抽奖
          for (let i = 0; i < times; i++) {
            if (!win) {
              const rollResult = roll.roll();
              console.log('-> rollResult', rollResult);
              if (rollResult !== '谢谢参与！') {
                win = true;
              }
              result.push(rollResult);
            } else {
              result.push('谢谢参与！');
            }
          }
          console.log('-> result', result);
        }

        let income = 0;
        if (times === 1 || times === '1') {
          income = 8.8;
        } else if (times === 10 || times === '10') {
          income = 52;
        } else if (times === 100 || times === '100') {
          income = 328;
        }

        await Lottery.findByIdAndUpdate(
          id,
          {
            // accessCount: Number(lottery.accessCount) + 1,
            triggerCount: Number(lottery.triggerCount) + 1,
            singleCount:
              Number(times) === 1
                ? Number(lottery.singleCount) + 1
                : Number(lottery.singleCount),
            tenTimesCount:
              Number(times) === 1
                ? Number(lottery.tenTimesCount) + 1
                : Number(lottery.tenTimesCount),
            hundredTimesCount:
              Number(times) === 1
                ? Number(lottery.hundredTimesCount) + 1
                : Number(lottery.hundredTimesCount),
            income: Number(lottery.income) + income,
            winnerCount: win
              ? Number(lottery.winnerCount) + 1
              : Number(lottery.winnerCount),
          },
          {
            new: true,
          },
        );
        await Log.create({
          orderId: '1234567890',
          activityId: id,
          purchases: times,
          result: JSON.stringify(result),
        });
        return res.status(200).json({ result });
      } else {
        return res.status(200).json({ status: false, message: '该活动已结束！' });
      }
    }
    return res.status(200).json(lottery);
  } catch (e) {
    console.log(e);
    return res.status(200).json({ message: '查找不到对应的活动' });
  }
});

module.exports = {
  getLotterys,
  createLottery,
  updateLottery,
  deleteLottery,
  lottery,
};
