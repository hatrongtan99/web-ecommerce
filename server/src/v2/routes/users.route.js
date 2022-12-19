const router = require('express').Router();
const catchSyncErr = require('../utils/catchSyncErr');
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');

// register
router.route('/register').post(catchSyncErr(usersController.register));

// login
router.route('/login').post(catchSyncErr(usersController.login));

// refresh token
router
    .route('/refresh-token')
    .get(
        catchSyncErr(auth.protectRoute),
        catchSyncErr(usersController.refreshToken)
    );

// logout
router
    .route('/logout')
    .get(catchSyncErr(auth.protectRoute), catchSyncErr(usersController.logout));

// get all users
router
    .route('/all-users')
    .get(
        catchSyncErr(auth.protectRoute),
        catchSyncErr(auth.authAdmin(['Admin'])),
        catchSyncErr(usersController.getAllUsers)
    );

// get user profile
router
    .route('/:id')
    .get(
        catchSyncErr(auth.protectRoute),
        catchSyncErr(usersController.getUserProfile)
    );
module.exports = router;
