const Categories = require('../models/categories.model');
const catchSyncErr = require('../utils/catchSyncErr');
const ThrowError = require('../utils/throwError');

class CategoriesController {
    //@desc: create new category
    //@route: [POST]/v2/api/category/add
    //@access: Admin
    createCategory = catchSyncErr(async (req, res, next) => {
        const { name, image } = req.body;
        if (!name) {
            return next(new ThrowError('info invalid!', 400));
        }
        if (image) {
            req.body.image =
                req.headers.host + process.env.FOLDER_ACCESS + image;
        }

        const category = await Categories.create(req.body);

        res.json({ success: true, category });
    });

    //@desc: get all categories
    //@route: [GET]/v2/api/category/all
    //@access: public
    getAllCategories = catchSyncErr(async (req, res, next) => {
        res.json({
            success: true,
            lists: await Categories.find({ isActive: true }, '-products'),
        });
    });

    //@desc: get product by category
    //@route: [GET]/v2/api/category/:name
    //@access: public
    getProductsByCategory = catchSyncErr(async (req, res, next) => {
        const { slug } = req.params;
        const lists = await Categories.find({ isActive: true, slug }).populate({
            path: 'products',
            select: 'name_product discount price slug',
            populate: {
                path: 'brand',
                select: 'brand_name brand_thumb slug',
            },
        });
        res.json({ success: true, lists });
    });
}

module.exports = new CategoriesController();
