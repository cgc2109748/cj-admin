const e = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

const logModel = require('../models/logModel');
const _ = require('lodash');
// const User = require('../models/userModel')

// @desc    Get ProductLogs
// @route   GET /api/lotteryLogs
// @access  Private
const getLotteryLogs = asyncHandler(async (req, res) => {
  const lotteryLogs = await logModel.find();

  res.status(200).json(_.orderBy(lotteryLogs, ['updatedDate'], ['desc']));
});

// @desc    Set logModel
// @route   POST /api/lotteryLogs
// @access  Private
const setLotteryLog = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }

  const LotteryLog = await logModel.create({
    name: req.body.name,
    code: req.body.code,
    productType: req.body.productType,
    type: req.body.type,
    num: req.body.num,
    user: req.body.user,
    manager: req.body.manager,
    // createDate: req.body.createDate,
    // updatedDate: req.body.updatedDate,
    createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    usage: req.body.usage,
    remark: req.body.remark,
  });

  res.status(200).json(LotteryLog);
});

// @desc    Update logModel
// @route   PUT /api/lotteryLogs/:id
// @access  Private
const updateLotteryLog = asyncHandler(async (req, res) => {
  const LotteryLog = await logModel.findById(req.params.id);

  if (!LotteryLog) {
    res.status(400);
    throw new Error('logModel not found');
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // Make sure the logged in user matches the logModel user
  // if (logModel.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  const updatedLotteryLog = await logModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedLotteryLog);
});

// @desc    Delete logModel
// @route   DELETE /api/lotteryLogs/:id
// @access  Private
const deleteLotteryLog = asyncHandler(async (req, res) => {
  const LotteryLog = await logModel.findById(req.params.id);

  if (!LotteryLog) {
    res.status(400);
    throw new Error('logModel not found');
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // Make sure the logged in user matches the logModel user
  // if (logModel.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  await LotteryLog.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLotteryLogs,
  setLotteryLog,
  updateLotteryLog,
  deleteLotteryLog,
};
