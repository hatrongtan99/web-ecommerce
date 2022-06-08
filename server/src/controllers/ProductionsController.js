const productService = require('../services/products');

class ProductionsController {
    // @desc    get mutipleProduct
    // @route   GET/api/:category
    // @access  Public
    async getProductsByCategory(req, res, next) {
        try {
            const category = req.params.category;
            const products = await productService.mutipleProductsByCategory(category, req);
            return res.status(200)
            .json({success: true, message: 'Get mutiple products successfully', products})

        } catch (error) {
            console.log(error);
            res.status(404)
        }
    }

    // @desc get single product by category and slug
    // @route GET/api/:category/:slug
    // @access Public
    async getProductByCategoryAndSlug(req, res, next) {
        try {
            const {category, slug} = req.params
            const response = await productService.getProductByCategoryAndSlug(category, slug);
            if (response) {
                if (response.images) {
                    const arrImages = response.images.split(', ')
                    response.images = arrImages
                } else {
                    response.images = []
                }
                const desc = await productService.getProductDesc(response.id);
                const catalog = await productService.getProductCatalog(response.id);
                response.description = desc;
                response.catalog = catalog;
                return res.status(200).json({success: true, message: 'Get product by slug successfully', products: response})
            }
            return res.status(400).json({success: false, message: 'Get product by slug failed'})
        } catch (error) {
            console.log(error);
            res.status(404)
        }        
    };

    // @desc    create product
    // @route   POST/api/admin/products
    // @accsess Private/Admin
    async createProduct(req, res, next) {
        const {
            productName, 
            productPrice,
            productCategoryId,
            productBrandId,
            productThumb,
            images,
            quantity
        } = req.body;
        try {
            if (!productName && !productPrice && !productThumb && !productCategoryId && !productBrandId && !images && !quantity) {
                return res.status(400).json({success: false, message: 'Data not fotmatted properly!'})
            }

            const response = await productService.createProduct(req)
            if (response) {
                return res.json({success: true, message: 'Tạo thành công'})
            } else {
                return res.status(400).json({success: false, message: 'Tạo thất bại!'})
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    // @desc    create description
    // @router  POST/admin/products/:id/description
    // @access  Private/Admin
    async createProductDescription(req, res, next) {
        const {title, content} = req.body;
        try {
            if (title.length == 0 && content.length == 0) {
                return res.status(400).json({success: false, message: 'Data fotmatted not properly'})
            }
            const response = await productService.createDesc(req);
            if (response) {
                return res.json({success: true, message: 'Create description successfully!'})
            } else {
                return res.status(400).json({success: false, message: 'Create description Failed'})
            }
        } catch (error) {
            console.log(error)
        }
    };

    // @desc    create catalog
    // @router  POST/admin/products/:id/catalog
    // @access  Private/Admin
    async createProductCatalog(req, res, next) {
        const {titleCatalog, contentCatalog} = req.body;
        try {
            if (titleCatalog.length == 0 && contentCatalog.length == 0 && titleCatalog.length != contentCatalog.length) {
                return res.status(400).json({success: false, message: 'Data fotmatted not properly'})
            }
            const response = await productService.createCatalog(req);
            if (response) {
                return res.json({success: true, message: 'Create catalog successfully!'})
            } else {
                return res.status(400).json({success: false, message: 'Create catalog Failed'})
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    // @desc    Update a product
    // @route   PUT /api/admin/products/:id
    // @access  Private/Admin
    async updateProduct(req, res, next) {
        try {
            const response = await productService.updateProduct(req);
            if (response) {
                return res.json({success: true, message: 'Update successful'});
            }
            return res.status(400).json({success: false, message: 'Update failed'});
        } catch (error) {
            console.log(error);
        }
    }

    // @desc    delete product
    // @route   DELETE/api/admin/:category/:id
    // @accsess Private/Admin
    async deleteProductById(req, res, next) {
        try {
            const {category, id} = req.params
            await productService.deleteProduct(category, id);
            res.json({success: true, message: 'Product deleted successfully'})
        } catch (error) {
            console.log(error);
        }
    }

    // @desc    Create new review
    // @route   POST/api/admin/products/:id/reviews
    // @access  Private
    async createNewReview(req, res, next) {

    }

    // @desc    Get top rated products
    // @route   GET/api/admin/products/top
    // @access  Public
    async getTopRatedProducts(req, res, next) {

    }

}

module.exports = new ProductionsController();
