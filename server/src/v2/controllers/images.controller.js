const multer = require("multer");
const imageMiddleware = require("../middleware/image.middleware");
const ThrowError = require("../utils/throwError");

//@desc: upload images
//@route: [POST]/v2/api/images/upload
//@access: Admin
const uploadImage = (req, res, next) => {
    const upload = imageMiddleware.fields([
        { name: "thumb", maxCount: 1 },
        { name: "images", maxCount: 5 },
    ]);
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return next(new ThrowError("Upload failed", 400));
        } else if (err) {
            return next(new ThrowError("Upload failed", 400));
        } else {
            const { thumb, images } = req.files;

            let listImages = [],
                image = "";
            if (thumb && thumb[0]) {
                image = thumb[0].originalname;
            }
            if (images) {
                listImages = images.map((image) => image.originalname);
            }
            res.json({
                success: true,
                thumb: image,
                images: listImages,
            });
        }
    });
};

module.exports = {
    uploadImage,
};
