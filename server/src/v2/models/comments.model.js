const { Schema, ObjectId, model } = require("mongoose");

const CommentsScehma = new Schema(
    {
        product: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        comments: [
            {
                user: {
                    type: String,
                    default: "",
                },
                email: {
                    type: String,
                },
                content: {
                    type: String,
                    default: "",
                },
                reply: [
                    {
                        user: {
                            type: String,
                            default: "",
                        },
                        email: {
                            type: String,
                        },
                        content: {
                            type: String,
                            default: "",
                        },
                    },
                ],
                created: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
    },
    { collection: "Comments" }
);

const Comments = model("Comments", CommentsScehma);

module.exports = Comments;
