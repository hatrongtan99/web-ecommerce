const router = require("express").Router();
const categoriesController = require("../controllers/categories.controller");
const auth = require("../middleware/auth");

// create new category
router
  .route("/add")
  .post(
    auth.protectRoute,
    auth.authAdmin(["Admin"]),
    categoriesController.createCategory
  );

//get all category
router.route("/all").get(categoriesController.getAllCategories);

module.exports = router;
