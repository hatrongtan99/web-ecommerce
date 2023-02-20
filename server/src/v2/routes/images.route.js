const router = require("express").Router();
const auth = require("../middleware/auth");
const imagesController = require("../controllers/images.controller");

router
    .route("/upload")
    .post(
        auth.protectRoute,
        auth.authAdmin(["Admin"]),
        imagesController.uploadImage
    );

module.exports = router;
