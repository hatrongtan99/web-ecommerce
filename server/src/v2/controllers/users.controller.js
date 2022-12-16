const userService = require('../services/users.service');
const sendToken = require('../utils/sendToken');
const cloudinary = require('cloudinary').v2;
const catchSyncErr = require('../utils/catchSyncErr');

class Users {
    //@desc: register user
    //@route: [POST]/v2/api/users/register
    //@access: public
    async register(req, res, next) {
        let { fistname, lastname, email, password, avatar } = req.body;
        if (!fistname || !lastname || !email || !password || !avatar) {
            throw new Error('User info invalid');
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
        res.json({ success: true, user });
    }

    //@desc: login
    //@route: [POST]/v2/api/users/login
    //@access: public
    async login(req, res, next) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('Please Enter Email & Password');
        }
        const user = await userService.findUserByEmail({ email });
        if (!user) {
            throw new Error('Invalid Email & Password');
        }
        const matchPassword = await userService.comparePass({
            user,
            password,
        });

        if (!matchPassword) {
            throw new Error('Invalid Email & Password');
        }

        sendToken(res, user);
    }

    //@desc: refresh token
    //@route: [GET]/v2/api/users/refreshToken
    //@access: public
    async refreshToken(req, res, next) {
        const { email } = req.user;
        const user = await userService.findUserByEmail({ email });
        if (!user) {
            throw new Error('User not found!');
        }
        sendToken(res, user);
    }

    //@desc: get user profile
    //@route: [GET]/v2/api/users/:id
    //@access: public
    async getUserProfile(req, res, next) {
        const { id } = req.params;
        const profile = await userService.findUserById(id);
        if (profile) {
            res.json({ success: true, user: profile });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    }

    //@desc: logout
    //@route: [GET]/v2/api/users/logout
    //@access: public
    async logout(req, res, next) {
        // req.coo
        res.cookie('refreshToken', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
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
