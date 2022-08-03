const multer = require('multer');
const storeImageMiddleware = require('../middlewares/storeImg');

class ImageController {
    // @desc   store avatar production
    // @route  POST/api/admin/upload-single
    // @access Private/Admin
    storeSingleImage(req, res) {
        const upload = storeImageMiddleware.single('image')
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                res.json({success: false, message: 'Upload failed'})
            } else if (err) {
                res.json({success: false,  message: 'Upload failed'})
            } else {
                try {
                    // respone the url of image 
                    return res.json({success: true, message: 'upload successful', data: req.file.originalname})
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    // @Desc   update multiple image
    // @route  POST/api/admin/update-multiple
    // @access Private/Admin
    async storeMultipleImage(req, res) {
        const upload = storeImageMiddleware.array('images', 5);
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.json({success: false,  message: 'Upload failed'});
            } else if (err) {
                return res.json({success: false,  message: 'Upload failed'});
            } else {
                const images = req.files.map(file => {
                    return file.originalname
                })
                res.json({success: true, message: 'upload successful', data: images });
            }
        })
    }
}

module.exports = new ImageController()