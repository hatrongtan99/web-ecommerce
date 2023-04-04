const router = require("express").Router();
const FeedbacksController = require("../controllers/feedbacksController");
const { protectRoute, authAdmin } = require("../middleware/auth");

// get feedback // new feedback
router
    .route("/:id")
    .get(FeedbacksController.getFeedbackProduct)
    .post(FeedbacksController.newFeedback);

module.exports = router;
