const { Schema, model, ObjectId } = require('mongoose');

const reviewsSchema = new Schema(
    {
        product: { type: ObjectId, ref: 'Products' },
        user: { type: ObjectId, ref: 'Users' },
        rating: {
            type: Number,
            default: 0,
        },
        content: {
            type: String,
            trim: true,
        },
        created: { type: Date, default: Date.now() },
        updated: Date,
    },
    { collection: 'Reviews' }
);

const Reviews = model('Reviews', reviewsSchema);

model.exports = Reviews;
