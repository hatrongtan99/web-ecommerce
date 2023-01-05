const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middleware/auth');

//get all order user
router.route('/me').get(auth.protectRoute, orderController.getOrderByUser);

//get detail order user
router
    .route('/me/:id')
    .get(auth.protectRoute, orderController.getDetailOrderByUser);

// get all order by admin
router
    .route('/all')
    .get(
        auth.protectRoute,
        auth.authAdmin(['Admin']),
        orderController.getOrderByAdmin
    );

// get detail order by admin
router
    .route('/admin/:id')
    .get(
        auth.protectRoute,
        auth.authAdmin(['Admin']),
        orderController.getDetailOrderByAdmin
    );
// create new order
router.route('/add').post(auth.protectRoute, orderController.createNewOrder);

module.exports = router;
