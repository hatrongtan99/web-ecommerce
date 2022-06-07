const express = require('express');
const router = express.Router()
const productionsController = require('../controllers/ProductionsController')

router.get('/:category', productionsController.getProductsByCategory);
router.get('/:category/:slug', productionsController.getProductByCategoryAndSlug);

// delete product
router.delete('/admin/:category/:id', productionsController.deleteProductById);

// create product
router.post('/admin/products', productionsController.createProduct);

// create product description
router.post('/admin/products/:id/descriptions', productionsController.createProductDescription);
// get product description
router.get('/products/:id/descriptions', productionsController.getProductDescById);

// create product catalog
router.post('/admin/products/:id/catalog', productionsController.createProductCatalog);
// get product catalog
router.get('/products/:id/catalog', productionsController.getProductCatalog);

// 
router.get('/admin/products/top', productionsController.getTopRatedProducts);
router.post('/admin/products/:id/reviews', productionsController.createNewReview);
router.put('/admin/products/:id', productionsController.updateProduct);

module.exports = router