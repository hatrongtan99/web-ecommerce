const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');

// register
router.route('/register').post(usersController.register);

// login
router.route('/login').post(usersController.login);

// refresh token
router
    .route('/refresh-token')
    .get(auth.protectRoute, usersController.refreshToken);
// logout
router.route('/logout').get(auth.protectRoute, usersController.logout);

// get all users
router
    .route('/all-users')
    .get(
        auth.protectRoute,
        auth.authAdmin(['Admin']),
        usersController.getAllUsers
    );

// get user profile
router.route('/:id').get(auth.protectRoute, usersController.getUserProfile);
module.exports = router;
