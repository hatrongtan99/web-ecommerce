const productsController = require('../controllers/products.controller');
const router = require('express').Router();

router.route('/').get(productsController.getAllProducts);

module.exports = router;
