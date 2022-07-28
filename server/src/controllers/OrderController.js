const orderService = require('../services/order');

class OrderController {
    // @desc    checkout/order product
    // @route   POST/api/checkout
    // @access  Public
    async createOrder(req, res, next) {
        const {userId} = req.params
        const {userName, userSex, userEmail, userPhone, userAddress} = req.body;
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

    // @desc    get cart products by user userId
    // @route   GET/api/:userId/cart
    // @access  Public
    async getCartByUserId(req, res, next) {
        const {userId} = req.params;
        try {
            const response = await orderService.productsCart(userId);
            return res.json({success: true, message: 'Get cart products by user id', data: response})
        } catch (error) {
            console.log(error)
        }
    }

    // @desc    delete product in cart
    // @route   DELETE/api/cart/:userId/:productId
    // @access  Public
    async deleteProductInCart(req, res, next) {
        try {
            const response = await orderService.deleteProductInCart(req);
            if (response) {
                return res.json({success: true, message: 'Delete successfuly'});
            }
            return res.json({success: false, message: 'Delete product failed'});
        } catch (error) {
            console.log(error)
        }
    };

    // @desc    update quantity product in cart
    // @route   PUT/api/cart/:userId/:productId
    // @access  Public
    async updateQuantityProduct(req, res, next) {
        try {
            const response = await orderService.updateQuantityProduct(req);
            if (response) {
                return res.json({success: true, message: 'Update quantity successfully'})
            }
            return res.json({success: false, message: 'Update quantity failed'});
        } catch (error) {
            console.log(error)
        }
    }
};

module.exports = new OrderController();