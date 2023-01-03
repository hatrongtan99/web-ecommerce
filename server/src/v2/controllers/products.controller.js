const catchSyncErr = require('../utils/catchSyncErr');
const ThrowError = require('../utils/throwError');
const Products = require('../models/products.model');
const Categories = require('../models/categories.model');

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
        let {
            name_product,
            brand,
            price,
            images,
            insurance,
            sku,
            catalog,
            category,
        } = req.body;
        if (
            !name_product ||
            !brand ||
            !price ||
            !images ||
            !insurance ||
            !sku ||
            !catalog ||
            !category
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

        const pushProductToCategory = category.map((i) => {
            return {
                updateOne: {
                    filter: { _id: i, isActive: true },
                    update: { $push: { products: newProduct._id } },
                },
            };
        });
        await Categories.bulkWrite(pushProductToCategory);
        res.json({ success: true, product: newProduct });
    });

    //@desc: get detailsProduct
    //@route: [GET]/v2/api/products/:id
    //@access: public
    getDetailsProduct = catchSyncErr(async (req, res, next) => {
        const product = await Products.find({
            _id: req.params.id,
            deleted: false,
        }).populate('brand');
        if (!product) {
            return next(new ThrowError('Product not found!', 400));
        }
        res.json({ success: true, product: product[0] });
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
        res.json({ success: true, message: 'Delete product successfully!' });
    });
}

module.exports = new ProductsController();
