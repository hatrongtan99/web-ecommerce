const Feedbacks = require("../models/feedback.model");
const Products = require("../models/products.model");
const catchSyncErr = require("../utils/catchSyncErr");
const ThrowError = require("../utils/throwError");

class FeedbacksController {
  //@desc: get feedback
  //@route: [GET]/v2/api/feedback/:id
  //@access: public
  getFeedbackProduct = catchSyncErr(async (req, res, next) => {
    const { id } = req.params;
    const { page = 1, pageSize = 1 } = req.query;

    const totals = await Feedbacks.find({
      product: { $regex: `^${id}_` },
    }).countDocuments();

    const listFeedbacks = await Feedbacks.find({
      product: { $regex: `^${id}_` },
    })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    const detail = await Feedbacks.aggregate([
      {
        $match: { product: { $regex: `^${id}_` } },
      },
      {
        $unwind: "$feedbacks",
      },
      {
        $group: {
          _id: "$feedbacks.rating",
          sum: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          star: "$_id",
          sum: 1,
        },
      },
    ]);

    return res.json({
      success: true,
      feedbacks: listFeedbacks[0]?.feedbacks,
      meta: {
        count: listFeedbacks[0]?.count,
        page: +page,
        totals,
        detail: detail,
      },
    });
  });

  //@desc: new feedback
  //@route: [POST]/v2/api/feedback/:id
  //@access: public
  newFeedback = catchSyncErr(async (req, res, next) => {
    const { id } = req.params;
    const { feedbackId, user, rating, content } = req.body;

    if (!feedbackId || !rating || !content) {
      return next(new ThrowError("invalid feedback!", 400));
    }

    await Feedbacks.findOneAndUpdate(
      {
        product: { $regex: `^${id}_` },
        count: { $lt: 10 },
      },
      {
        $push: { feedbacks: { feedbackId, user, rating, content } },
        $inc: { count: 1 },
        $setOnInsert: {
          product: `${id}_${new Date().getTime()}`,
        },
      },
      {
        upsert: true,
      }
    );

    const avg = await Feedbacks.aggregate([
      { $match: { product: { $regex: `^${id}_` } } },
      {
        $unwind: "$feedbacks",
      },
      {
        $group: {
          _id: null,
          avg: { $avg: "$feedbacks.rating" },
        },
      },
    ]);

    await Products.findOneAndUpdate(
      { _id: id, deleted: false },
      {
        $inc: { totalFeedback: 1 },
        $set: {
          rating: avg[0].avg,
        },
      }
    );

    return res.json({
      success: true,
      message: "new feedback success",
    });
  });
}

module.exports = new FeedbacksController();
