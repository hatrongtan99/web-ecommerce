const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const auth = require("../middleware/auth");

// get cart user // add product to cart // delete product
router
    .route("/")
    .get(auth.protectRoute, cartController.getCartUser)
    .post(auth.protectRoute, cartController.addProduct)
    .delete(auth.protectRoute, cartController.deleteProduct);

module.exports = router;
