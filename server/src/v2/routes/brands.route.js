const brandsController = require("../controllers/brands.controller");
const router = require("express").Router();
const auth = require("../middleware/auth");

// get all brand / create new brand
router
    .route("/")
    .get(brandsController.getAllBrands)
    .post(
        auth.protectRoute,
        auth.authAdmin(["Admin"]),
        brandsController.createNewBrand
    );

module.exports = router;
