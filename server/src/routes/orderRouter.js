const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

// add to cart/sessiont order
router.post('/add-to-cart', orderController.addToCart);

// checkout
router.post('/checkout', orderController.createOrder);

// get cart products by user id
router.get('/cart/:userId', orderController.getCartByUserId);

// delete product in cart/ update quantity product in cart
router.route('/cart/:userId/:productId').delete(orderController.deleteProductInCart)
.put(orderController.updateQuantityProduct)


module.exports = router