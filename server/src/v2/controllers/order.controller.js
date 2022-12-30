const Order = require('../models/order.model');
const catchSyncErr = require('../utils/catchSyncErr');
const ThrowError = require('../utils/throwError');

class OrderController {
    //@desc: create new user order
    //@route: [POST]/v2/api/order/add
    //@public: auth
    createNewOrder = catchSyncErr(async (req, res, next) => {
        const user = req.user.id;
        const { cart } = req.body;
        res.json({ success: true, order: await Order.create({ user, cart }) });
    });

    //@desc: get order by user
    //@route: [GET]/v2/api/order/me
    //@access: auth
    getOrderByUser = catchSyncErr(async (req, res, next) => {
        const idUser = req.user.id;
        const order = await Order.findOne({ user: idUser, status: 'pending' })
            .populate({ path: 'user' })
            .populate({ path: 'cart' });
        res.json({ success: true, order });
    });

    //@desc: get order by admin
    //@route: [GET]/v2/api/order/admin
    //@access: admin
    getOrderByAdmin = catchSyncErr(async (req, res, next) => {
        const orders = await Order.find({})
            .populate({ path: 'user' })
            .populate({ path: 'cart' });
        res.json({ success: true, orders });
    });
}

module.exports = new OrderController();
