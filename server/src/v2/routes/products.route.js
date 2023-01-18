const router = require("express").Router();
const productsController = require("../controllers/products.controller");
const auth = require("../middleware/auth");

// get all products / create new product
router
  .route("/")
  .get(productsController.getAllProducts)
  .post(
    auth.protectRoute,
    auth.authAdmin(["Admin"]),
    productsController.createProduct
  );

// get products by categorry
router.route("/category/:slug").get(productsController.getProductsByCategory);

// get detail product
router.route("/:slug").get(productsController.getDetailsProduct);

// update product / delete product
router
  .route(":id")
  .put(
    auth.protectRoute,
    auth.authAdmin(["Admin"]),
    productsController.updateProduct
  )
  .delete(
    auth.protectRoute,
    auth.authAdmin(["Admin"]),
    productsController.deleteProduct
  );

module.exports = router;
