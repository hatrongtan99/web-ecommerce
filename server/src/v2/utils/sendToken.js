const sendToken = async function (res, user) {
    const { _id, avatar, user_name, createAt, email: e } = user;
    const token = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res.cookie('refreshToken', refreshToken);
    res.json({
        success: true,
        user: { _id, avatar, user_name, createAt, email: e },
        token,
    });
};

module.exports = sendToken;
