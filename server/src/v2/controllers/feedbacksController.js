const Feedbacks = require("../models/feedback.model");
const Products = require("../models/products.model");
const Order = require("../models/order.model");

const catchSyncErr = require("../utils/catchSyncErr");
const ThrowError = require("../utils/throwError");
const { default: mongoose } = require("mongoose");

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
        $match: {
          product: { $regex: `^${id}_` },
        },
      },
      {
        $unwind: {
          path: "$feedbacks",
        },
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
      {
        $sort: {
          star: -1,
        },
      },
    ]);

    const avg = await getAvg(id);

    return res.json({
      success: true,
      feedbacks: listFeedbacks[0]?.feedbacks,
      meta: {
        count: listFeedbacks[0]?.count,
        page: +page,
        totals,
        detail: detail,
        avg: avg[0]?.avg,
      },
    });
  });

  //@desc: new feedback
  //@route: [POST]/v2/api/feedback/:id
  //@access: public
  newFeedback = catchSyncErr(async (req, res, next) => {
    const { id } = req.params;
    const { user, rating, phoneNumber, email } = req.body;

    if (!rating || !user || !phoneNumber || !email) {
      return next(new ThrowError("invalid feedback!", 400));
    }

    const existOrder = await Order.aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          "user.email": email,
        },
      },
      {
        $lookup: {
          from: "Cart",
          localField: "cart",
          foreignField: "_id",
          as: "cart",
        },
      },
      {
        $unwind: "$cart",
      },
      {
        $unwind: "$cart.products",
      },
      {
        $match: {
          "cart.products.product": mongoose.Types.ObjectId(id),
        },
      },
    ]);

    if (!existOrder.length) {
      return next(
        new ThrowError("Khách hàng chưa từng mua sản phẩm này.", 400)
      );
    }

    await Feedbacks.findOneAndUpdate(
      {
        product: { $regex: `^${id}_` },
        count: { $lt: 10 },
      },
      {
        $push: { feedbacks: { ...req.body } },
        $inc: { count: 1 },
        $setOnInsert: {
          product: `${id}_${new Date().getTime()}`,
        },
      },
      {
        upsert: true,
      }
    );

    const avg = await getAvg(id);

    await Products.findOneAndUpdate(
      { _id: id, deleted: false },
      {
        $inc: { totalFeedback: 1 },
        $set: {
          rating: avg[0]?.avg,
        },
      }
    );

    return res.json({
      success: true,
      message: "new feedback success",
    });
  });
}

const getAvg = async (id) => {
  return await Feedbacks.aggregate([
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
};

module.exports = new FeedbacksController();
