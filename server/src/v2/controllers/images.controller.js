const multer = require('multer');
const imageMiddleware = require('../middleware/image.middleware');
const ThrowError = require('../utils/throwError');

//@desc: upload images
//@route: [POST]/v2/api/images/upload
//@access: Admin
const uploadImage = (req, res, next) => {
    const upload = imageMiddleware.fields([
        { name: 'thumbProduct', maxCount: 1 },
        { name: 'images', maxCount: 5 },
    ]);
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return next(new ThrowError('Upload failed', 400));
        } else if (err) {
            return next(new ThrowError('Upload failed', 400));
        } else {
            const { thumbProduct, images } = req.files;

            let listImages = [],
                thumb = '';
            if (thumbProduct && thumbProduct[0]) {
                thumb = thumbProduct[0].originalname;
            }

            if (images) {
                listImages = images.map((image) => image.originalname);
            }

            res.json({
                success: true,
                thumbProduct: thumb,
                images: listImages,
            });
        }
    });
};

module.exports = {
    uploadImage,
};
