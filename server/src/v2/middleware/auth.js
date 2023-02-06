const JWT = require("jsonwebtoken");
const ThrowError = require("../utils/throwError");
const catchSyncErr = require("../utils/catchSyncErr");

const protectRoute = catchSyncErr(async (req, res, next) => {
  const authenToken =
    req.header("Authorization") || "Bearer " + req.signedCookies.accessToken;

  const token = authenToken && authenToken.split(" ")[1];
  if (token) {
    const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } else {
    next(new ThrowError("Please Login to access this resource.", 401));
  }
});

const authAdmin = (roleRequire) => {
  return catchSyncErr((req, res, next) => {
    if (!roleRequire.includes(req.user.role)) {
      next(
        new ThrowError(
          `Role: ${req.user.role} is not allowed access this resource`,
          403
        )
      );
    }
    next();
  });
};

module.exports = {
  protectRoute,
  authAdmin,
};
