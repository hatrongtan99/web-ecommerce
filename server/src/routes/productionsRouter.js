const express = require('express');
const router = express.Router()
const productionsController = require('../controllers/ProductionsController')

// get multiple products by category
router.get('/:category', productionsController.getProductsByCategory);

// get product bu category and slug
router.get('/:category/:slug', productionsController.getProductByCategoryAndSlug);

// delete product
router.delete('/admin/:category/:id', productionsController.deleteProductById);

// create product
router.post('/admin/products', productionsController.createProduct);

// create product description
router.post('/admin/products/:id/descriptions', productionsController.createProductDescription);

// create product catalog
router.post('/admin/products/:id/catalog', productionsController.createProductCatalog);

// update product
router.put('/admin/products/:id', productionsController.updateProduct);

router.get('/admin/products/top', productionsController.getTopRatedProducts);
router.post('/admin/products/:id/reviews', productionsController.createNewReview);


module.exports = router