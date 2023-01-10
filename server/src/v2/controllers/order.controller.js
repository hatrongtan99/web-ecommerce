const Order = require('../models/order.model');
const { Cart } = require('../models/carts.model');
const catchSyncErr = require('../utils/catchSyncErr');
const { limit } = require('../config/key');
const sendmail = require('../utils/sendMaill');
const {
    notiUserOrder,
    notiUserOrderForAdmin,
} = require('../utils/tempalteMaill');
const ThrowError = require('../utils/throwError');
const { maill } = require('../config/key');

const RESULT_PER_PAGE = limit;

class OrderController {
    //@desc: create new user order
    //@route: [POST]/v2/api/order/add
    //@public: auth
    createNewOrder = catchSyncErr(async (req, res, next) => {
        const user = req.user.id;

        const { phoneNumber, address } = req.body;
        if (!phoneNumber || !address) {
            return next(new ThrowError('Info invalid!', 400));
        }

        const cartUser = await Cart.findOneAndUpdate(
            { user, status: 'idle' },
            // { $set: { status: 'processed' } }
            {}
        ).populate({ path: 'user' });

        if (cartUser && !cartUser.products.length) {
            return next(
                new ThrowError(
                    'Cart is empty, please add product to cart!',
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

        // send mail to user comfim order
        await sendmail(
            cartUser.user.email,
            notiUserOrder(
                cartUser.user.user_name,
                `http://${req.headers.host}/v2/api/order/me/${order._id}`
            )
        );
        //send mail to admin to noti order
        await sendmail(
            maill.emailAdmin,
            notiUserOrderForAdmin(cartUser.user.user_name),
            `http://${req.headers.host}/v2/api/order/admin/${order._id}`
        );
        res.json({ success: true, order });
    });

    //@desc: get order by user
    //@route: [GET]/v2/api/order/me
    //@access: auth
    getOrderByUser = catchSyncErr(async (req, res, next) => {
        const { page = 1 } = req.query;
        const idUser = req.user.id;
        const skip = (page - 1) * RESULT_PER_PAGE;
        const order = await Order.findOne({ user: idUser })
            .populate({
                path: 'cart',
                populate: {
                    path: 'products.product',
                },
            })
            .limit(RESULT_PER_PAGE)
            .skip(skip);
        res.json({ success: true, order });
    });

    //@desc: get detail order by user
    //@route: [GET]/v2/api/order/me/:id
    //@access: auth
    getDetailOrderByUser = catchSyncErr(async (req, res, next) => {
        const idUser = req.user.id;

        const order = await Order.findOne({
            user: idUser,
            _id: req.params.id,
        }).populate({
            path: 'cart',
            select: 'status products',
            populate: {
                path: 'products.product',
                select: {
                    name_product: 1,
                    images: { $slice: 1 },
                    slug: 1,
                },
                populate: {
                    path: 'brand',
                    select: {
                        brand_name: 1,
                        brand_thumb: 1,
                        slug: 1,
                    },
                },
            },
        });
        res.json({ success: true, order });
    });

    //@desc: get order by admin
    //@route: [GET]/v2/api/order/all
    //@access: admin
    getOrderByAdmin = catchSyncErr(async (req, res, next) => {
        const { page = 1 } = req.query;
        const skip = (page - 1) * RESULT_PER_PAGE;
        const orders = await Order.find({})
            .populate({
                path: 'user',
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
        const orders = await Order.find({})
            .populate({
                path: 'user',
                select: {
                    avatar: 1,
                    email: 1,
                    user_name: 1,
                },
            })
            .populate({ path: 'cart' });
        res.json({ success: true, orders });
    });
}

module.exports = new OrderController();
