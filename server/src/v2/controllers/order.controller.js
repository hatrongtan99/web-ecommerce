const Order = require("../models/order.model");
const Products = require("../models/products.model");
const { Cart } = require("../models/carts.model");
const catchSyncErr = require("../utils/catchSyncErr");
const { limit } = require("../config/key");
const sendmail = require("../utils/sendMaill");
const {
  notiUserOrder,
  notiUserOrderForAdmin,
} = require("../utils/tempalteMaill");
const ThrowError = require("../utils/throwError");
const { maill } = require("../config/key");
const { default: mongoose } = require("mongoose");

const RESULT_PER_PAGE = limit;

class OrderController {
  //@desc: create new user order
  //@route: [POST]/v2/api/order/add
  //@public: auth
  createNewOrder = catchSyncErr(async (req, res, next) => {
    const user = req.user.id;

    const { phoneNumber, address } = req.body;
    if (!phoneNumber || !address) {
      return next(new ThrowError("Info invalid!", 400));
    }

    const cartUser = await Cart.findOneAndUpdate(
      {
        user,
        status: "idle",
        "products.0": {
          $exists: true,
        },
      },
      { $set: { status: "processed" } },
      {
        new: true,
      }
    ).populate({ path: "user" });

    if (!cartUser) {
      return next(
        new ThrowError(
          "Giỏ hàng đang trống, vui lòng thêm sản phẩm vào giỏ hàng!",
          400
        )
      );
    }

    const totalPrice = cartUser.products.reduce(
      (acc, pro) => acc + pro.totalPrice,
      0
    );

    const order = await Order.create({
      user,
      cart: cartUser._id,
      totalPrice,
      ...req.body,
    });

    // // send mail to user comfim order
    await sendmail(
      cartUser.user.email,
      notiUserOrder(
        cartUser.user.user_name,
        `${process.env.URL_CLIENT}/users/puchase/${order._id}`
      )
    );
    //send mail to admin to noti order
    await sendmail(
      maill.emailAdmin,
      notiUserOrderForAdmin(cartUser.user.user_name),
      `${process.env.URL_CLIENT}/admin/orders/${order._id}`
    );
    res.json({
      success: true,
      message:
        "Tạo đơn thành công, vui lòng kiểm tra đơn hàng của bạn qua email!",
    });
  });

  //@desc: get order by user
  //@route: [GET]/v2/api/order/me
  //@access: auth
  getOrderByUser = catchSyncErr(async (req, res, next) => {
    const { page = 1 } = req.query;
    const idUser = req.user.id;
    const skip = (page - 1) * RESULT_PER_PAGE;
    const order = await Order.find({ user: idUser })
      .populate({
        path: "cart",
        select: "status products",
        populate: {
          path: "products.product",
          select: {
            name_product: 1,
            images: { $slice: 1 },
            slug: 1,
            categories: { $slice: 1 },
          },
          populate: {
            path: "brand",
            select: {
              brand_name: 1,
              brand_thumb: 1,
              slug: 1,
            },
          },
          populate: {
            path: "categories",
            select: {
              name: 1,
              slug: 1,
            },
          },
        },
      })
      .limit(RESULT_PER_PAGE)
      .skip(skip);
    res.json({ success: true, order });
  });

  //@desc: get order by admin
  //@route: [GET]/v2/api/order/admin/all
  //@access: admin
  getOrderByAdmin = catchSyncErr(async (req, res, next) => {
    const { page = 1 } = req.query;
    const skip = (page - 1) * RESULT_PER_PAGE;
    const orders = await Order.find({})
      .populate({
        path: "user",
        select: {
          avatar: 1,
          email: 1,
          user_name: 1,
        },
      })
      .limit(RESULT_PER_PAGE)
      .skip(skip);
    res.json({ success: true, orders });
  });

  //@desc: get detail order by admin
  //@route: [GET]/v2/api/order/admin/:id
  //@access: admin
  getDetailOrderByAdmin = catchSyncErr(async (req, res, next) => {
    const { id } = req.params;
    const orders = await Order.find({ _id: id })
      .populate({
        path: "user",
        select: {
          avatar: 1,
          email: 1,
          user_name: 1,
        },
      })
      .populate({ path: "cart" });
    res.json({ success: true, orders });
  });

  //@desc: change status order by admin
  //@route: [PATCH]/v2/api/order/:id
  //@access: admin
  changeStatusOrder = catchSyncErr(async (req, res, next) => {
    const { id } = req.params;
    const { role, id: idUser } = req.user;
    const { status } = req.body;
    let isInvalid = [
      "not processed",
      "processed",
      "shipping",
      "delivered",
      "cancelled",
    ].includes(status);

    if (role == "User") {
      isInvalid = ["cancelled"].includes(status);
    }
    if (!isInvalid) {
      return next(new ThrowError("Can't update this resouce!", 401));
    }

    if (status === "delivered") {
      const listProductSold = await Order.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
            user: role === "User" ? idUser : { $exists: true },
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
          $group: {
            _id: "$cart.products.product",
            quantity: {
              $sum: "$cart.products.quantity",
            },
          },
        },
      ]);

      await updateProduct(listProductSold);
    }

    const order = await Order.findOneAndUpdate(
      { _id: id, user: role === "User" ? idUser : { $exists: true } },
      {
        $set: {
          status,
        },
      },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Cập nhật đơn hàng thành công",
      order,
    });
  });
}

const updateProduct = async (list) => {
  const update = list.map((i) => {
    return {
      updateOne: {
        filter: {
          _id: i._id,
          isActive: true,
        },
        update: {
          $inc: { sold: i.quantity, in_stock: -i.quantity },
        },
      },
    };
  });
  await Products.bulkWrite(update);
};

module.exports = new OrderController();
