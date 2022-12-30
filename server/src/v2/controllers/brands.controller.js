const catchSyncErr = require('../utils/catchSyncErr');
const ThrowError = require('../utils/throwError');
const Brands = require('../models/brands.model');

class BrandsController {
    //@desc: get all brands
    //@route: [GET]/v2/api/brands
    //@access: public
    getAllBrands = catchSyncErr(async (req, res, next) => {
        const brands = await Brands.find({ isActive: true });
        res.json({ success: true, brands: brands });
    });

    //@desc: create new brand
    //@route: [POST]/v2/api/brands
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

module.exports = new BrandsController();
