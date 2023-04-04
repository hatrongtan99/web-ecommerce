const { Schema, ObjectId, model } = require("mongoose");

const DescProductSchema = new Schema(
    {
        product: {
            type: ObjectId,
            ref: "Products",
        },
        desc: {
            type: String,
        },
        created: { type: Date, default: Date.now() },
        updated: Date,
    },
    {
        collection: "Description",
    }
);

const Description = model("Description", DescProductSchema);

module.exports = Description;
