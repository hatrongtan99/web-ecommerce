const CommentsController = require("../controllers/comments.controller");
const router = require("express").Router();
// get comment product
router
    .route("/:id")
    .get(CommentsController.getCommentProduct)
    .post(CommentsController.newComment);
module.exports = router;
