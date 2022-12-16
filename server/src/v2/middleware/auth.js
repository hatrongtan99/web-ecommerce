const JWT = require('jsonwebtoken');

const protectRoute = async (req, res, next) => {
    const authenToken = req.header('Authorization');
    const token = authenToken && authenToken.split(' ')[1];
    if (token) {
        const user = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } else {
        next(new Error('errr protec route'));
    }
};

const authAdmin = (roleRequire) => {
    return (req, res, next) => {
        if (!roleRequire.includes(req.user.role)) {
            next(
                new Error(
                    `Role: ${req.user.role} is not allowed access this resource`
                )
            );
        }
        next();
    };
};

module.exports = {
    protectRoute,
    authAdmin,
};
