const catchSyncErr = require('../utils/catchSyncErr');
const ThrowError = require('../utils/throwError');

class ReviewController {
    //@desc: create new review
    //@route: [POST]/v2/api/products/reviews/:id
    //@access: public
    createNewReview = catchSyncErr(async (req, res, next) => {
        const { rating, content } = req.body;
        if (!rating || !content) {
            return next(new ThrowError('Invalid reviews!', 400));
        }
        const { id } = req.params;
        const userId = req.user._id;
        let product = await Products.findOne({ _id: id, deleted: false });
        if (!product) {
            return next(new ThrowError('Product not found!', 400));
        }
        const existReview = (await product.populate('reviews')).reviews.find(
            (i) => i.user.toString() == userId
        );
        if (existReview) {
            await Reviews.findOneAndUpdate(
                { _id: existReview._id },
                { $set: { rating, content } }
            );
            return res.json({ success: true });
        }
        const newReview = await Reviews.create({
            user: userId,
            rating,
            content,
        });
        product.reviews.push(newReview._id);
        product = await product.save();
        res.json({ success: true });
    });
}

module.exports = new ReviewController();
