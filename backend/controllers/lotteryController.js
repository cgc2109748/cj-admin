const e = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');
const _ = require('lodash');

const Lottery = require('../models/lotteryModel');
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
    type: req.body.type,
    num: req.body.num,
    img: req.body.img,
    status: req.body.status,
    probabilityType: req.body.probabilityType,
    probabilityRate: req.body.probabilityRate,
    numberOfProbability: req.body.numberOfProbability,
    promotionType: req.body.promotionType,
    deductionAmount: req.body.deductionAmount,
    discount: req.body.discount,
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
  const lottery = await Lottery.findById(req.params.id);

  if (!lottery) {
    res.status(400);
    throw new Error('Lottery not found');
  }

  let data = {
    ...req.body,
    ...{
      updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  };
  if (!_.isUndefined(data.used) && !_.isUndefined(data.left)) {
    if (Number(data.used) === 0) {
      data.status = '0';
    } else if (Number(data.left === 0)) {
      data.status = '2';
    } else {
      data.status = '1';
    }
    // console.log('used:', data.used);
    // console.log('left:', data.left);
    // console.log('data:', data);
  }

  const updatedLottery = await Lottery.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });

  res.status(200).json(updatedLottery);
});

// @desc    Delete Lottery
// @route   DELETE /api/lotterys/:id
// @access  Private
const deleteLottery = asyncHandler(async (req, res) => {
  const lottery = await Lottery.findById(req.params.id);

  if (!lottery) {
    res.status(400);
    throw new Error('Lottery not found');
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // Make sure the logged in user matches the Lottery user
  // if (Lottery.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  await Lottery.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLotterys,
  createLottery,
  updateLottery,
  deleteLottery,
};
