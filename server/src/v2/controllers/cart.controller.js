const { CartItem, Cart } = require('../models/carts.model');
const catchSyncErr = require('../utils/catchSyncErr');
const ThrowError = require('../utils/throwError');

class CartController {
    //@desc: get cart
    //@route: [GET]/v2/api/cart/
    //@access: auth
    getCartUser = catchSyncErr(async (req, res, next) => {
        const cart = await Cart.findOne({
            user: req.user.id,
            status: 'idle',
        });
        return res.json({
            success: true,
            cart,
        });
    });

    //@desc: add product to cart
    //@route: [POST]/v2/api/cart
    //@access: auth
    addProduct = catchSyncErr(async (req, res, next) => {
        const { product, quantity, perchasePrice } = req.body;
        const user = req.user.id;

        if (!product || !quantity || !perchasePrice) {
            return next(new ThrowError('Info Invalid!', 400));
        }

        const cartItem = await CartItem.create({
            product,
            quantity,
            perchasePrice,
        });
        let cart = await Cart.findOneAndUpdate(
            { user, status: 'idle' },
            { products: { $push: { cartItem } } },
            { upsert: true, new: true }
        );

        res.json({ success: true, cart });
    });

    //@desc: delete product
    //@route: [DELETE]/v2/api/cart
    //@access: auth
    deleteProduct = catchSyncErr(async (req, res, next) => {
        const { product, user } = req.body;
    });
}

module.exports = new CartController();
