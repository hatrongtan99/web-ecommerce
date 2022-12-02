const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const authToken = req.header('Authorization');

    const token = authToken && authToken.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}

exports.admin = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            return next()
        } else {
            return res.status(401).json({success: false, message: 'Not authorized as an admin'})
        }
    } catch (error) {
        console.log(error)
    }
}