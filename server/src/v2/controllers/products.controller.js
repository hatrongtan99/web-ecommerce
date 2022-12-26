const catchSyncErr = require('../utils/catchSyncErr');
const ThrowError = require('../utils/throwError');
const {
    Products,
    Brands,
    Reviews,
    Descriptions,
} = require('../models/products.model');

class ProductsController {
    //@desc: get all products
    //@route: [GET]/v2/api/products
    //@access: public
    getAllProducts = catchSyncErr(async (req, res, next) => {
        const products = await Products.find({})
            .populate('brands')
            .select('name_product brand product_thumb price in_stock');
        res.json({ success: true, products });
    });

    //@desc: create product
    //@route: [POST]/v2/api/products
    //@access: Admin
    createProduct = catchSyncErr(async (req, res, next) => {
        let { name_product, brand, price, images, insurance, sku, catalog } =
            req.body;
        if (
            !name_product ||
            !brand ||
            !price ||
            !images ||
            !insurance ||
            !sku ||
            !catalog
        ) {
            return next(
                new ThrowError('Invalid infomation create product!', 400)
            );
        }
        images = images.map(
            (i) => req.headers.host + process.env.FOLDER_ACCESS + i
        );
        req.body.images = images;
        const newProduct = await Products.create(req.body);
        res.json({ success: true, product: newProduct });
    });

    //@desc: get detailsProduct
    //@route: [GET]/v2/api/products/:id
    //@access: public
    getDetailsProduct = catchSyncErr(async (req, res, next) => {
        const product = await Products.find({
            _id: req.params.id,
            deleted: false,
        })
            .populate('brand')
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'user.avatar user_name email',
                },
            });
        if (!product) {
            return next(new ThrowError('Product not found!', 400));
        }
        res.json({ success: true, product });
    });

    //@desc: update product
    //@route: [PATCH]/v2/api/products/:id
    //@access: Admin
    updateProduct = catchSyncErr(async (req, res, next) => {});

    //@desc: delete product
    //@route: [DELETE]/v2/api/products/:id
    //@access: Admin
    deleteProduct = catchSyncErr(async (req, res, next) => {
        const { id } = req.params;
        const product = await Products.findOneAndUpdate(
            { _id: id },
            { $set: { deleted: true } },
            { new: true, upsert: false }
        );
        if (!product) {
            return next(new ThrowError('Product not found!', 400));
        }
        res.json({ success: true, product });
    });

    //@desc: create new review
    //@route: [POST]/v2/api/products/reviews/:id
    //@access: public
    createNewReview = catchSyncErr(async (req, res, next) => {
        const { rating, content } = req.body;
        if (!rating || !content) {
            return next(new ThrowError('Invalid reviews!', 400));
        }
        const { id } = req.params;
        const userId = req.user._id;
        let product = await Products.findOne({ _id: id, deleted: false });
        if (!product) {
            return next(new ThrowError('Product not found!', 400));
        }
        const existReview = (await product.populate('reviews')).reviews.find(
            (i) => i.user.toString() == userId
        );
        if (existReview) {
            await Reviews.findOneAndUpdate(
                { _id: existReview._id },
                { $set: { rating, content } }
            );
            return res.json({ success: true });
        }
        const newReview = await Reviews.create({
            user: userId,
            rating,
            content,
        });
        product.reviews.push(newReview._id);
        product = await product.save();
        res.json({ success: true });
    });

    //@desc: get all brands
    //@route: [GET]/v2/api/products/brands
    //@access: public
    getAllBrands = catchSyncErr(async (req, res, next) => {
        const brands = await Brands.find();
        res.json({ success: true, brands });
    });

    //@desc: create new brand
    //@route: [POST]/v2/api/products/brands
    //@access: Admin
    createNewBrand = catchSyncErr(async (req, res, next) => {
        let { brand_name, brand_thumb } = req.body;
        if (!brand_name || !brand_thumb) {
            return next(new ThrowError('Invalid information!', 400));
        }
        brand_thumb =
            req.headers.host + process.env.FOLDER_ACCESS + brand_thumb;
        const newBrand = await Brands.create({ brand_name, brand_thumb });
        res.json({ success: true, result: newBrand });
    });
}

module.exports = new ProductsController();
