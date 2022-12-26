const { Schema, model, ObjectId } = require('mongoose');
const slugify = require('slugify');

const brandSchema = new Schema(
    {
        brand_name: {
            type: String,
            required: true,
            unique: true,
        },
        brand_thumb: {
            type: String,
            required: true,
        },
    },
    { collection: 'Brands' }
);
const Brands = model('Brands', brandSchema);

const productsSchema = new Schema(
    {
        name_product: {
            type: String,
            required: true,
            unique: true,
        },
        brand: {
            type: ObjectId,
            ref: 'Brands',
        },
        price: {
            type: Number,
            required: true,
        },
        ratings: {
            type: Number,
            default: 0,
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
        slug: String,
        reviews: [{ type: ObjectId, ref: 'Reviews' }],
    },
    { collection: 'Products', timestamps: true }
);

productsSchema.pre('save', function (next) {
    this.slug = slugify(this.name_product, { lower: true });
    next();
});
const Products = model('Products', productsSchema);

// review model;
const reviewsSchema = new Schema(
    {
        user: { type: ObjectId, ref: 'Users' },
        rating: { type: Number, required: true },
        content: { type: String },
    },
    { collection: 'Reviews' }
);
const Reviews = model('Reviews', reviewsSchema);

// description model
const descriptionSchema = new Schema({}, { collection: 'Descriptions' });
const Descriptions = model('Descriptions', descriptionSchema);

module.exports = {
    Products,
    Descriptions,
    Brands,
    Reviews,
};
