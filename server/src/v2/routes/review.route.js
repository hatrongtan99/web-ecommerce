const router = require('express').Router();
const reviewController = require('../controllers/review.controller');
const auth = require('../middleware/auth');

// create new review
router.route('/:id').post(auth.protectRoute, reviewController.createNewReview);

module.exports = router;
