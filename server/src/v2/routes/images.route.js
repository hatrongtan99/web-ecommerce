const router = require('express').Router();
const imagesController = require('../controllers/images.controller');

router.route('/upload').post(imagesController.uploadImage);

module.exports = router;
