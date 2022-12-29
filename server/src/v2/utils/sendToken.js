const sendToken = async function (res, user) {
    const {
        id,
        avatar,
        user_name,
        email,
        provider,
        facebookId,
        googleId,
        role,
    } = user;
    const token = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res.cookie('refreshToken', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.json({
        success: true,
        user: {
            id,
            avatar,
            user_name,
            email,
            provider,
            facebookId,
            googleId,
            role,
        },
        token,
    });
};

module.exports = sendToken;
