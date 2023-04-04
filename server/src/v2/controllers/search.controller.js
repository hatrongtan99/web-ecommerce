const Products = require("../models/products.model");
const Categories = require("../models/categories.model");
const catchSyncErr = require("../utils/catchSyncErr");
const { search } = require("../utils/queryFeature");

class Search {
    //@desc: get all products
    //@route: [GET]/v2/api/search?_q
    //@access: public
    searchProductOrCategory = catchSyncErr(async (req, res, next) => {
        const products = await Products.find({
            ...search(req.query, "name_product"),
        }).select({});

        const categories = await Categories.find({
            ...search(req.query, "name"),
        });

        res.json({
            success: true,
            products,
            categories,
        });
    });
}

module.exports = new Search();
