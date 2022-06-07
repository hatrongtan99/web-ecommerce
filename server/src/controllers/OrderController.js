const orderService = require('../services/order');

class OrderController {
    // @desc    checkout/order product
    // @route   POST/api/checkout
    // @access  Public
    async createOrder(req, res, next) {
        const {userId, userName, userSex, userEmail, userPhone, userAddress} = req.body;
        if (!userId && !userName && !userSex && !userEmail && !userPhone && !userAddress) {
            return res.status(400).json({success: false, message: 'Data fotmatted not properly'})
        }
        try {
            const response = await orderService.orderProducts(req);
            if (response) {
                return res.json({success: true, message: 'Create order successfully'})
            }
            return res.status(400).json({success: false, message: 'Create order failed'});
        } catch (error) {
            console.log(error)
        }
    }

    // @desc    add product to cart
    // @route   POST/api/add-to-cart
    // @access  Public
    async addToCart(req, res, next) {
        const {userId, productId, quantity} = req.body;
        if (!userId && !productId && !quantity) {
            return res.status(400).json({success: false, message: 'Data fotmatted not properly'})
        }
        try {
            const response = await orderService.addToCart(req)
            if (response) {
                return res.json({ success: true, message: 'Add to cart successfully'})
            }
            return res.status(400).json({ success: false, message: 'Error adding to cart'})
        } catch (error) {
            console.log(error)
        }
    }

    // @desc    get cart by user userId
    // @route   GET/api/:userId/cart
    // @access  Public
    async getCartByUserId(req, res, next) {

    }
};

module.exports = new OrderController();