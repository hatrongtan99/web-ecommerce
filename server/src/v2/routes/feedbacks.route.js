const router = require("express").Router();
const FeedbacksController = require("../controllers/feedbacksController");
const { protectRoute, authAdmin } = require("../middleware/auth");

module.exports = router;
