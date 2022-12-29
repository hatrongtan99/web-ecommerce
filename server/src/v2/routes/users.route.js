const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth');
const passport = require('passport');

router.route('/facebook').get(
    passport.authenticate('facebook', {
        session: false,
    })
);

router.route('/google').get(
    passport.authenticate('google', {
        session: false,
    })
);

// login by facebook
router.route('/facebook/callback').get(
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        session: false,
    }),
    usersController.loginByFacebook
);

// login by goole
router.route('/google/callback').get(
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false,
    }),
    usersController.loginByGoogle
);

// register
router.route('/register').post(usersController.register);

// login
router.route('/login').post(usersController.login);

// refresh token
router.route('/refresh-token').get(usersController.refreshToken);

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
