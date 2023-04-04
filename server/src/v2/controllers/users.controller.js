const JWT = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const catchSyncErr = require("../utils/catchSyncErr");
const Users = require("../models/users.model");
const sendToken = require("../utils/sendToken");
const ThrowError = require("../utils/throwError");

class UsersController {
    //@desc: register user
    //@route: [POST]/v2/api/users/register
    //@access: public
    register = catchSyncErr(async (req, res, next) => {
        let { fistname, lastname, email, password, avatar } = req.body;
        if (!fistname || !lastname || !email || !password || !avatar) {
            return next(new ThrowError("Invalid infomation user!", 400));
        }

        const existUser = await Users.findOne({ email });
        if (existUser) {
            return res.json({
                success: false,
                message: "Email already exists!",
            });
        }

        const userCloud = await cloudinary.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        avatar = {
            public_id: userCloud.public_id,
            url: userCloud.secure_url,
        };
        req.body.avatar = avatar;
        let user = new Users({ email, avatar, password });
        user.fullname = lastname + " " + fistname;
        user = await user.save();
        sendToken(res, user);
    });

    //@desc: login
    //@route: [POST]/v2/api/users/login
    //@access: public
    login = catchSyncErr(async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ThrowError("Please Enter Email & Pasword", 400));
        }
        const user = await Users.findOne({
            email,
            facebookId: null,
            gooleId: null,
        });
        if (!user) {
            return next(new ThrowError("Users not found", 401));
        }
        const matchPassword = await user.comparePassword(password);

        if (!matchPassword) {
            return next(new ThrowError("Invalid Email & Password", 401));
        }
        sendToken(res, user);
    });

    //@desc: login success
    //@route: [GET]/v2/api/users/success
    //@access: public
    loginSuccess = catchSyncErr(async (req, res, next) => {
        if (req.user) {
            const { id } = req.user;
            const user = await Users.findOne({ _id: id });

            const { password, ...rest } = user._doc;

            res.json({
                success: true,
                user: { ...rest },
                token: await user.generateAccessToken(),
            });
        } else {
            return next(new ThrowError("User not found!", 401));
        }
    });

    //@desc: login by goole
    //@route: [GET]/v2/api/users/social-login/success
    //@access: public
    loginSocialSuccess = catchSyncErr(async (req, res, next) => {
        return sendToken(res, req.user);
    });

    //@desc: refresh token
    //@route: [GET]/v2/api/users/refreshToken
    //@access: public
    refreshToken = catchSyncErr(async (req, res, next) => {
        const refreshToken = req.signedCookies["refreshToken"];
        if (!refreshToken) {
            return next(
                new ThrowError("Invalid refresh token: " + refreshToken, 401)
            );
        }
        const decode = JWT.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        if (decode.id) {
            const user = await Users.findOne({ _id: decode.id });
            if (!user) {
                return next(new ThrowError("User not found!", 401));
            }
            sendToken(res, user);
        } else {
            return next(new ThrowError("User not found!", 401));
        }
    });

    //@desc: get user profile
    //@route: [GET]/v2/api/users/:id
    //@access: public
    getUserProfile = catchSyncErr(async (req, res, next) => {
        const { id } = req.params;
        const profile = await Users.findOne({ _id: id }, "-password");
        if (!profile) {
            return next(new ThrowError("Users not found", 400));
        }
        res.json({ success: true, user: profile });
    });

    //@desc: logout
    //@route: [GET]/v2/api/users/logout
    //@access: public
    logout = catchSyncErr((req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.clearCookie("refreshToken");
            res.clearCookie("accessToken");
            res.json({ success: true, message: "Logged Out" });
        });
    });

    //@desc: get all users
    //@route: [GET]/v2/api/users/all-users
    //@access: private/Admin
    getAllUsers = catchSyncErr(async (req, res, next) => {
        res.json({ success: true, lists: await Users.find({}, "-password") });
    });
}

module.exports = new UsersController();
