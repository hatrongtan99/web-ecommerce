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
            return next(new ThrowError('Info invalid!', 400));
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
}

module.exports = new CategoriesController();
