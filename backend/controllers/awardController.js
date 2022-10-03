const e = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

const awardModel = require('../models/awardModel');
const _ = require('lodash');
const Lottery = require('../models/lotteryModel');
const mongoose = require('mongoose');
// const User = require('../models/userModel')

// @desc    Get ProductLogs
// @route   GET /api/awards
// @access  Private
const getAwards = asyncHandler(async (req, res) => {
  const awards = await awardModel.find();

  res.status(200).json(_.orderBy(awards, ['updatedDate'], ['desc']));
});

// @desc    Set awardModel
// @route   POST /api/awards
// @access  Private
const setAward = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }

  const Award = await awardModel.create({
    name: req.body.name,
    img: req.body.img,
    amount: req.body.amount,
    _deleted: req.body._deleted,
    createDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
  });

  res.status(200).json(Award);
});

// @desc    Update awardModel
// @route   PUT /api/awards/:id
// @access  Private
const updateAward = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const award = await awardModel.findById(id);

  if (!award) {
    res.status(400);
    throw new Error('Award not found');
  }

  let data = {
    ...req.body,
    ...{
      updatedDate: moment().format('YYYY-MM-DD HH:mm:ss'),
    },
  };

  const updatedAward = await awardModel.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    data,
    {
      new: true,
    },
  );
  console.log('-> updatedAward', updatedAward);
  res.status(200).json(updatedAward);
});

// @desc    Delete awardModel
// @route   DELETE /api/awards/:id
// @access  Private
const deleteAward = asyncHandler(async (req, res) => {
  const Award = await awardModel.findById(req.params.id);

  if (!Award) {
    res.status(400);
    throw new Error('awardModel not found');
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401);
  //   throw new Error('User not found');
  // }

  // Make sure the logged in user matches the awardModel user
  // if (awardModel.user.toString() !== req.user.id) {
  //   res.status(401);
  //   throw new Error('User not authorized');
  // }

  await Award.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAwards,
  setAward,
  updateAward,
  deleteAward,
};
