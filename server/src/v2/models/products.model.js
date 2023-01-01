const { Schema, model, ObjectId } = require('mongoose');
const slugify = require('slugify');

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
        specialField: [],
        discount: {
            type: Number,
            min: 0,
            max: 99,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            default: 0,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
        images: [],
        in_stock: {
            type: Number,
            default: 0,
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
        slug: { type: String, unique: true },
        created: { type: Date, default: Date.now() },
        updated: Date,
    },
    { collection: 'Products' }
);

productsSchema.pre('save', function (next) {
    this.slug = slugify(this.name_product, { lower: true });
    next();
});
const Products = model('Products', productsSchema);

module.exports = Products;
