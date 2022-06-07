const express = require('express');
const router = express.Router();
const imageController = require('../controllers/ImageController');

router.post('/admin/upload-single', imageController.storeSingleImage)
router.post('/admin/upload-multiple', imageController.storeMultipleImage)

module.exports = router