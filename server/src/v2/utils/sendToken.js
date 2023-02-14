const sendToken = async function (res, user) {
  const { password, ...rest } = user._doc;
  const token = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  res.cookie("refreshToken", refreshToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    signed: true,
  });
  res.cookie("accessToken", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    signed: true,
  });

  res.json({
    success: true,
    user: {
      ...rest,
    },
    token,
  });
};

module.exports = sendToken;
