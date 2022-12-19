const sendToken = async function (res, user) {
    const { _id, avatar, user_name, createAt, email } = user;
    const token = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res.cookie('refreshToken', refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
    });
    res.json({
        success: true,
        user: { _id, avatar, user_name, createAt, email },
        token,
    });
};

module.exports = sendToken;
