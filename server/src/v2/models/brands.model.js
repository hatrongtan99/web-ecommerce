const { Schema, model } = require('mongoose');
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
        isActive: {
            type: Boolean,
            default: true,
        },
        created: {
            type: Date,
            default: Date.now(),
        },
        updated: Date,
        slug: {
            type: String,
            unique: true,
        },
    },
    { collection: 'Brands' }
);
brandSchema.prev('save', function (next) {
    this.slug = slugify(this.brand_name, { lower: true });
    next();
});
const Brands = model('Brands', brandSchema);

module.exports = Brands;
