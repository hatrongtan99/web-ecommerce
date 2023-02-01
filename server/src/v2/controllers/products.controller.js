const catchSyncErr = require("../utils/catchSyncErr");
const ThrowError = require("../utils/throwError");
const Products = require("../models/products.model");
const Categories = require("../models/categories.model");
const Description = require("../models/descProduct.model");
const { limit } = require("../config/key");

const { search, filter } = require("../utils/queryFeature");

const RESULT_PER_PAGE = limit;

class ProductsController {
  //@desc: get all products
  //@route: [GET]/v2/api/products
  //@access: public
  getAllProducts = catchSyncErr(async (req, res, next) => {
    const { query, sort } = filter(req.query);
    const { page = 1 } = req.query;
    const skip = (page - 1) * RESULT_PER_PAGE;
    let products = await Products.find({
      ...search(req.query, "name_product"),
      ...query,
    })
      .populate({ path: "brand", select: "brand_name brand_thumb slug" })
      .select("name_product brand discount price images in_stock slug")
      .sort(sort ? { price: sort } : {})
      .limit(RESULT_PER_PAGE)
      .skip(skip);

    res.json({ success: true, products });
  });

  //@desc: get products by category
  //@route: [GET]/v2/api/products/category/:slug
  //@access: public
  getProductsByCategory = catchSyncErr(async (req, res, next) => {
    const { slug } = req.params;
    const { sort, query } = filter(req.query);
    const { page = 1, exc } = req.query;
    if (exc) {
      const excId = exc.split(",");
      query._id = {
        $nin: [...excId],
      };
    }
    const skip = (page - 1) * RESULT_PER_PAGE;

    let products = await Categories.findOne({ slug })
      .populate({
        path: "products",
        match: { deleted: false, ...query },
        select: {
          name_product: 1,
          discount: 1,
          price: 1,
          images: { $slice: 1 },
          slug: 1,
        },
        options: { sort: sort ? { price: sort } : {} },
        populate: {
          path: "brand",
          match: {
            isActive: true,
          },
          select: "brand_thumb brand_name slug",
        },
      })
      .limit(RESULT_PER_PAGE)
      .skip(skip);
    res.json({ success: true, data: products });
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
      in_stock,
    } = req.body;
    if (
      !name_product ||
      !brand ||
      !price ||
      !images ||
      !insurance ||
      !sku ||
      !catalog ||
      !category ||
      !in_stock
    ) {
      return next(new ThrowError("Invalid infomation create product!", 400));
    }
    images = images.map(
      (i) =>
        process.env.PROTOCOL + req.headers.host + process.env.FOLDER_ACCESS + i
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
  //@route: [GET]/v2/api/products/:slug
  //@access: public
  getDetailsProduct = catchSyncErr(async (req, res, next) => {
    const product = await Products.findOne({
      slug: req.params.slug,
      deleted: false,
    })
      .populate("brand")
      .populate({ path: "desc", select: "-product -__v" })
      .populate({ path: "categories", select: "name slug -_id" });
    if (!product) {
      return next(new ThrowError("Product not found!", 400));
    }
    res.json({ success: true, product });
  });

  //@desc: update product
  //@route: [PUT]/v2/api/products/:id
  //@access: Admin
  updateProduct = catchSyncErr(async (req, res, next) => {
    const { id } = req.params;
    const product = await Products.findOneAndUpdate({ _id: id }, req.body, {
      upsert: false,
      new: true,
    });
    if (!product) {
      return next(new ThrowError("Product not found!", 400));
    }
    res.json({ success: true, product });
  });

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
      return next(new ThrowError("Product not found!", 400));
    }
    res.json({ success: true, message: "Delete product successfully!" });
  });

  //@desc: create new desc
  //@route: [POST]/v2/api/products/desc/:id
  //@access: Admin
  description = catchSyncErr(async (req, res, next) => {
    const { id } = req.params;
    const newDesc = await Description.findOneAndUpdate(
      { product: id },
      req.body,
      { new: true, upsert: true }
    );

    await Products.findOneAndUpdate(
      { _id: id },
      { $set: { desc: newDesc.id } }
    );

    res.json({ success: true, message: "Update desc successfully" });
  });

  //@desc: delete desc
  //@route: [DELETE]/v2/api/products/desc/:id
  //@access: Admin
  deleteDesc = catchSyncErr(async (req, res, next) => {
    const { id } = req.params;
    await Products.findOneAndUpdate({ _id: id }, { desc: null });

    await Description.findOneAndDelete({ product: id });

    res.json({
      success: true,
      message: `Delete description product id ${id} successfully`,
    });
  });
}

module.exports = new ProductsController();
