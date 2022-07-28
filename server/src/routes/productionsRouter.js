const express = require('express');
const router = express.Router()
const productionsController = require('../controllers/ProductionsController')

// get producs by search
router.get('/search', productionsController.getProductBySeach);

// get all brand products
router.get('/brands', productionsController.getAllBrandProduct);

// get all categorys product
router.get('/categories', productionsController.getCategories)

// create brand product
router.post('/admin/brands', productionsController.createNewBrand)

// delete brand product by id
router.delete('/admin/brands/:idBrand', productionsController.deleteBrand)

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
router.patch('/admin/products/:id/update', productionsController.updateProduct);

router.get('/admin/products/top', productionsController.getTopRatedProducts);
router.post('/admin/products/:id/reviews', productionsController.createNewReview);


module.exports = router