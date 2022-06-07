const multer = require('multer');
const imageSevice = require('../services/img');
const storeImageMiddleware = require('../middlewares/storeImg');

class ImageController {
    // @desc store avatar production
    // @route
    // @access Private
    storeSingleImage(req, res) {
        const upload = storeImageMiddleware.single('image')
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                res.json({success: false})
            } else if (err) {
                res.json({success: false})
            } else {
                try {
                    // respone the url of image 
                    return res.json({success: true, message: 'upload successful', imageURL: req.file.originalname})
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }

    async storeMultipleImage(req, res) {
        const upload = storeImageMiddleware.array('image', 5);
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.json({success: false});
            } else if (err) {
                return res.json({success: false});
            } else {
                const images = req.files.map(file => {
                    return file.originalname
                })
                res.json({success: true, images });
            }
        })
    }
}

module.exports = new ImageController()