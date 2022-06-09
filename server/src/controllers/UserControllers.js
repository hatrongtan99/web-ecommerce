const authUser = require('../services/authUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    // @desc    login
    // @route   POST/api/login
    // @access  Private/Admin || Public
    async login(req, res, next) {
        const {userEmail, password} = req.body

        if (!userEmail || !password) {
            return res.status(400)
            .json({success: false, message: 'Data not fotmatted properly'})
        }

        try {
            const user = await authUser.getUser(userEmail)
            if (!user) {
                return res.status(401).json({success: false, message: 'Sai tên tài khoản hoặc mật khẩu!'})
            } else {
                const {id, userEmail, isAdmin, userPassword} = user[0]
    
                const match = await bcrypt.compare(password, userPassword)
    
                if (match) {
                    const tokenUser = await jwt.sign({id, userEmail, isAdmin}, process.env.ACCESS_TOKEN_SECRET)
                    return res.status(200).json({success: true, tokenUser, message: 'Đăng nhập thành công!'})
                } else {
                    return res.status(401).json({success: false, message: 'Sai tên tài khoản hoặc mật khẩu!'})
                }
            }

        } catch (error) {
            console.log(error)
            res.status(403)
        }
    }

    // @desc    verify user
    // @route   GET/verify
    // @accsess Public
    async verify(req, res, next) {
        try {
            const {userID, userEmail, ...rest} = req.user
            return res.status(200).json({
                userID,
                userEmail,
                message: 'Verify successfully',
                success: true
            })
        } catch (error) {
         console.log(error)   
        }
    }

    // @desc    create a new admin
    // @route   POST/api/...
    // @access  Public
    async createUser(req, res, next) {
        try {
            const userInfo = req.body
            const existsUser = await authUser.getUser(userInfo.userEmail)
            if (existsUser[0]) {
                return res.status(400).json({success: false, message: 'User already exited!'})
            }
            // save user
            const response = await authUser.saveUser(userInfo)
            if (response) {
                return res.status(200)
                .json({success: true, message: 'Tạo tài khoản thành công.'})
            } else {
                return res.status(400).json({success: false, message: 'Tạo tài khoản thất bại.'})
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    // @desc change password
    // @router PATCH/api/change-password
    // @access Public
    async changePassword(req, res, next) {
        try {
            const {userEmail, prevPassword, newPassword} = req.body
            const existUser = await authUser.getUser(userEmail)
            if (!existUser[0]) {
                return res.status(400).json({success: false, message: 'Sai tên tài khoản hoặc mật khẩu!'})
            }
            const match = await bcrypt.compare(prevPassword, existUser[0].userPassword)
            if (match) {
                const response = await authUser.changePassword(userEmail, newPassword)
                if (response) {
                    return res.json({
                        success: true,
                        message: 'Đổi mật khẩu thành công.'
                    })
                }
            } else {
                return res.status(400).json({success: false, message: 'Sai tên tài khoản hoặc mật khẩu!'})
            }
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = new UserController();