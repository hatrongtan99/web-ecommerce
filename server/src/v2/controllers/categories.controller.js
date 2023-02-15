const Categories = require("../models/categories.model");
const catchSyncErr = require("../utils/catchSyncErr");
const ThrowError = require("../utils/throwError");

class CategoriesController {
  //@desc: create new category
  //@route: [POST]/v2/api/category/add
  //@access: Admin
  createCategory = catchSyncErr(async (req, res, next) => {
    const { name, image } = req.body;
    if (!name) {
      return next(new ThrowError("Info invalid!", 400));
    }
    if (image) {
      req.body.image =
        process.env.PROTOCOL +
        req.headers.host +
        process.env.FOLDER_ACCESS +
        image;
    }

    const category = await Categories.create(req.body);

    res.json({ success: true, category });
  });

  //@desc: update category
  //@route: [PUT]/v2/api/category/:id
  //@access: Admin
  updateCategory = catchSyncErr(async (req, res, next) => {
    const { id } = req.params;

    const newCate = await Categories.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      upsert: false,
    });

    if (!newCate) {
      return next(new ThrowError("Category not found!", 400));
    }

    res.json({ success: true, category: newCate });
  });

  //@desc: delete cate
  //@route: [DELETE]/v2/api/category/:id
  //@access: Admin

  //@desc: get all categories
  //@route: [GET]/v2/api/category/all
  //@access: public
  getAllCategories = catchSyncErr(async (req, res, next) => {
    res.json({
      success: true,
      lists: await Categories.find({ isActive: true }, "-products"),
    });
  });
}

module.exports = new CategoriesController();
