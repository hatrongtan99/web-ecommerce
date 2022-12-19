const userService = require('../services/users.service');
const sendToken = require('../utils/sendToken');
const cloudinary = require('cloudinary').v2;
const JWT = require('jsonwebtoken');
const ThrowError = require('../utils/throwError');

class Users {
    //@desc: register user
    //@route: [POST]/v2/api/users/register
    //@access: public
    async register(req, res, next) {
        let { fistname, lastname, email, password, avatar } = req.body;
        if (!fistname || !lastname || !email || !password || !avatar) {
            return next(new ThrowError('Invalid infomation user!', 400));
        }

        const userCloud = await cloudinary.uploader.upload(avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale',
        });

        avatar = {
            public_id: userCloud.public_id,
            url: userCloud.secure_url,
        };

        const user = await userService.register({
            fistname,
            lastname,
            email,
            password,
            avatar,
        });
        res.status(201).json({ success: true, user });
    }

    //@desc: login
    //@route: [POST]/v2/api/users/login
    //@access: public
    async login(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ThrowError('Please Enter Email & Pasword', 400));
        }
        const user = await userService.findUserByEmail({ email });
        if (!user) {
            return next(new ThrowError('Invalid Email & Password', 401));
        }
        const matchPassword = await userService.comparePass({
            user,
            password,
        });

        if (!matchPassword) {
            return next(new ThrowError('Invalid Email & Password', 401));
        }
        sendToken(res, user);
    }

    //@desc: refresh token
    //@route: [GET]/v2/api/users/refreshToken
    //@access: public
    async refreshToken(req, res, next) {
        const { email } = req.user;
        const refreshToken = req.cookies['refreshToken'];
        const decode = JWT.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
        if (decode.email === email) {
            const user = await userService.findUserByEmail({ email });
            if (!user) {
                return next(new ThrowError('User not found!', 401));
            }
            sendToken(res, user);
        } else {
            return next(new ThrowError('User not found!', 403));
        }
    }

    //@desc: get user profile
    //@route: [GET]/v2/api/users/:id
    //@access: public
    async getUserProfile(req, res, next) {
        const { id } = req.params;
        const profile = await userService.findUserById(id);
        res.json({ success: true, user: profile });
    }

    //@desc: logout
    //@route: [GET]/v2/api/users/logout
    //@access: public
    async logout(req, res, next) {
        res.clearCookie('refreshToken');
        res.json({ success: true, message: 'Logged Out' });
    }

    //@desc: get all users
    //@route: [GET]/v2/api/users/all-users
    //@access: private/Admin
    async getAllUsers(req, res, next) {
        res.json({ success: true, lists: await userService.getAllUsers() });
    }
}

module.exports = new Users();
