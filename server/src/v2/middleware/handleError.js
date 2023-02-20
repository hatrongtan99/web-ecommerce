const handleError = function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error!";

    if (err.name === "JsonWebTokenError") {
        err.statusCode = 401;
        err.message = "Invalid JSON Web Token";
    }
    if (err.name === "TokenExpiredError") {
        err.statusCode = 403;
        err.message = "Token expired";
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

module.exports = handleError;
