const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const auth = require("../middleware/auth");
const passport = require("passport");
const ThrowError = require("../utils/throwError");

router.route("/facebook").get(
  passport.authenticate("facebook", {
    session: true,
  })
);

router.route("/google").get(
  passport.authenticate("google", {
    session: true,
  })
);

// login by facebook
router.route("/facebook/callback").get(
  passport.authenticate("facebook", {
    failureRedirect: process.env.URL_CLIENT + "/auth/login",
    successRedirect: process.env.URL_CLIENT + "/auth/success",
  })
);

// login by goole
router.route("/google/callback").get(
  passport.authenticate("google", {
    failureRedirect: process.env.URL_CLIENT + "/auth/login",
    successRedirect: process.env.URL_CLIENT + "/auth/success",
  })
);

router.route("/social-login/success").get((req, res, next) => {
  if (!req.user) {
    return next(new ThrowError("Please login first!", 401));
  }
  next();
}, usersController.loginSocialSuccess);

// register
router.route("/register").post(usersController.register);

// login
router.route("/login").post(usersController.login);

//login success
router.route("/success").get(auth.protectRoute, usersController.loginSuccess);

// refresh token
router.route("/refresh-token").get(usersController.refreshToken);

// logout
router.route("/logout").get(auth.protectRoute, usersController.logout);

// get all users
router
  .route("/all-users")
  .get(
    auth.protectRoute,
    auth.authAdmin(["Admin"]),
    usersController.getAllUsers
  );

// get user profile
router.route("/:id").get(auth.protectRoute, usersController.getUserProfile);
module.exports = router;
