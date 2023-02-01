const { Schema, ObjectId, model } = require("mongoose");

const FeedbackSchema = new Schema(
  {
    product: {
      type: ObjectId,
      ref: "Products",
    },
    count: {
      type: Number,
      default: 0,
    },
    feedback: [
      {
        feedbackId: {
          type: Number,
          required: true,
        },
        user: {
          type: ObjectId,
          ref: "Users",
        },
        rating: {
          type: Number,
          required: true,
        },
        content: { type: String, default: "" },
        created: { type: Date, default: Date.now() },
        updated: Date,
      },
    ],
  },
  { collection: "Feedbacks" }
);

const Feedbacks = model("Feedbacks", FeedbackSchema);

module.exports = Feedbacks;
