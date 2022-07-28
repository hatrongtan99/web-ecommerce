const productService = require('../services/products');

class ProductionsController {
    // @desc    get mutipleProduct by category
    // @route   GET/api/:category
    // @access  Public
    async getProductsByCategory(req, res, next) {
        try {
            const category = req.params.category;
            const products = await productService.mutipleProductsByCategory(category, req);
            return res.status(200)
            .json({success: true, message: 'Get mutiple products successfully', data: products})

        } catch (error) {
            console.log(error);
        }
    }

    // @desc    get single product by category and slug
    // @route   GET/api/:category/:slug
    // @access  Public
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
                return res.status(200).json({success: true, message: 'Get product by slug successfully', data: response})
            }
            return res.status(400).json({success: false, message: 'Get product by slug failed'})
        } catch (error) {
            console.log(error);
        }        
    };

    // @desc    get product by seach
    // @route   GET/api/search
    // @accsess Public
    async getProductBySeach(req, res, next) {
        const { _q } = req.query;
        if (!_q) {
            return res.status(400).json({succsess: false, message: 'Search query not fotmatted properly!'})
        }

        try {
            const response = await productService.searchProducts(_q)
            return res.json({success: true, message: 'Search products successfully', data: response})
        } catch (error) {
            console.log(error);
        }
    }

    // @desc    get all categories
    // @route   GET/api/categories
    // @accsess  Public
    async getCategories(req, res, next) {
        try {
            const response = await productService.getAllCategories();
            return res.json({success: true, message: 'Get all categories successfully', data: response})
        } catch (error) {
            console.log(error);
        }
    }

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
                return res.json({success: true, message: 'Create successfully'})
            } else {
                return res.status(400).json({success: false, message: 'Create failed'})
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
    // @route   PUT /api/admin/products/:id/update
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

    // @desc    Get all brand
    // @route   GET/api/brands
    // @access  Public
    async getAllBrandProduct(req, res) {
        try {
            const response = await productService.getAllBrand();
            res.json({success: true, message: 'Get all brand products successfully', data: response})
        } catch (error) {
            console.log(error);
        }
    }

    // @desc    Create new brand
    // @route   POST/api/admin/brands
    // @acsess  Private/Amin
    async createNewBrand(req, res) {
        const {brandName, brandThumb} = req.body;
        if (!brandName && !brandThumb) {
            return res.json({success: false, message: 'Data fotmatted not properly'})
        }
        try {
            const allBrand = await productService.getAllBrand();
            const brandAlreadyInDB = allBrand.find((brand) => brand.brandName === brandName);

            if (brandAlreadyInDB) {
                return res.json({success: false, message: 'Brand already exists'})
            } else {
                const response = await productService.createBrand(req);
                if (!response) {
                    return res.json({success: false, message: 'Error creating brand'})
                }
                return res.json({success: true, message: 'Create brand successfully'})
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    // @desc    Delete brand product by id
    // @route   DELETE/api/brands/:idBrand
    // @access  Private/admin
    async deleteBrand (req, res) {
        const {idBrand} = req.params;
        try {
            const response = await productService.deleteBrand(idBrand);
            if (!response) {
                return res.json({success: false, message: 'Failed delete brand'});
            }
            return res.json({success: true, message: 'Success delete brand'})

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
