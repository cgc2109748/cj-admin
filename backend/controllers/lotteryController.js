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

  const total = Number(req.body.total);
  const used = !_.isNaN(Number(req.body.used)) ? Number(req.body.used) : 0;
  const left = total - used;

  if (left < 0) {
    res.status(400);
    throw new Error('使用数量不能大于资产数量');
  }

  const lottery = await Lottery.create({
    name: req.body.name,
    img: req.body.img,
    code: req.body.code,
    type: req.body.type,
    status: req.body.status,
    unit: req.body.unit,
    total: String(total),
    price: req.body.price,
    totalPrice: req.body.totalPrice,
    used: !_.isEmpty(String(used)) ? used : '0',
    left: String(req.body.left) === 'undefined' ? left : String(req.body.left),
    manager: req.body.manager,
    // createDate: req.body.createDate,
    // updatedDate: req.body.updatedDate,
    createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    // qrCode: req.body.qrCode,
    remark: req.body.remark,
    place: req.body.place,
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
