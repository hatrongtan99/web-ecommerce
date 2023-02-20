const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const auth = require("../middleware/auth");

//get all order user
router.route("/me").get(auth.protectRoute, orderController.getOrderByUser);

//get detail order by user
router
    .route("/me/:id")
    .get(auth.protectRoute, orderController.getDetailOrderByUser);

// create new order
router.route("/add").post(auth.protectRoute, orderController.createNewOrder);

// get all order by admin
router
    .route("/admin/all")
    .get(
        auth.protectRoute,
        auth.authAdmin(["Admin"]),
        orderController.getOrderByAdmin
    );

// get detail order by admin
router
    .route("/admin/:id")
    .get(
        auth.protectRoute,
        auth.authAdmin(["Admin"]),
        orderController.getDetailOrderByAdmin
    );

// update
router
    .route("/update/:id")
    .patch(auth.protectRoute, orderController.changeStatusOrder);
module.exports = router;
