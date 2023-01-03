const router = require('express').Router();
const productsController = require('../controllers/products.controller');
const auth = require('../middleware/auth');

// get all products / create new product
router
    .route('/')
    .get(productsController.getAllProducts)
    .post(
        auth.protectRoute,
        auth.authAdmin(['Admin']),
        productsController.createProduct
    );

// get detail product / update product / delete product
router
    .route('/:id')
    .get(productsController.getDetailsProduct)
    .patch(
        auth.protectRoute,
        auth.authAdmin(['Admin']),
        productsController.updateProduct
    )
    .delete(
        auth.protectRoute,
        auth.authAdmin(['Admin']),
        productsController.deleteProduct
    );

module.exports = router;
