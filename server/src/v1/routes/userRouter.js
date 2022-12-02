const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middlewares/auth');
const userController = require('../controllers/UserControllers');

//Public router
router.post('/login', userController.login);
router.get('/verify', protect, userController.verify);
router.post('/create', userController.createUser);
router.patch('/change-password', userController.changePassword);
//Private router
router.post('/admin/login', userController.login);
router.get('/admin/verify', protect, admin, userController.verify);

module.exports = router;
