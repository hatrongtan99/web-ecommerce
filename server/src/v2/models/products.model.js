const { Schema, model } = require('mongoose');

const productsSchema = new Schema(
    {
        name_product: {
            type: String,
            required: true,
        },
        product_thumb: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        images: [],
        in_stock: {
            type: Boolean,
            default: true,
        },
        insurance: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
        },
        catalog: [
            {
                title: { type: String, required: true },
                content: { type: String, required: true },
            },
        ],
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { collection: 'Products', timestamps: true }
);

const Products = model('Products', productsSchema);

const descriptionSchema = new Schema({}, { collection: 'Descriptions' });

const Descriptions = model('Descriptions', descriptionSchema);

module.exports = {
    Products,
    Descriptions,
};
