const { Schema, ObjectId, model } = require("mongoose");

const FeedbackSchema = new Schema(
    {
        product: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            default: 0,
        },
        feedbacks: [
            {
                user: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
                content: { type: String, default: "" },
                phoneNumber: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                created: { type: Date, default: Date.now() },
                updated: Date,
            },
        ],
    },
    { collection: "Feedbacks" }
);

const Feedbacks = model("Feedbacks", FeedbackSchema);

module.exports = Feedbacks;
