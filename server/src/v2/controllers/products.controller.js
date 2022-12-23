const catchSyncErr = require('../utils/catchSyncErr');
const { Products } = require('../models/products.model');

//@desc: get all products
//@route: [GET]/v2/api/products
//@access: public
exports.getAllProducts = catchSyncErr(async (req, res, next) => {
    const products = await Products.find({});
    res.json({ success: true, products });
});

//@desc: create product
//@route: [POST]/v2/api/products/create
//@access: Admin
exports.createProduct = catchSyncErr(async (req, res, next) => {
    res.json({ success: true });
});
