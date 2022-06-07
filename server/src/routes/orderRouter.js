const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

// add to cart/sessiont order
router.post('/add-to-cart', orderController.addToCart);

// checkout
router.post('/checkout', orderController.createOrder);

// get cart info by user id
router.get('/:userId/cart', orderController.getCartByUserId)

module.exports = router