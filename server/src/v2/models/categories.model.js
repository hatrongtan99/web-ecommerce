const { Schema, ObjectId, model } = require('mongoose');

const categoriesSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        image: String,
        description: String,
        isActive: {
            type: Boolean,
            default: true,
        },
        products: [{ type: ObjectId, ref: 'Products' }],
        updated: Date,
        created: {
            type: Date,
            default: Date.now(),
        },
    },
    { collection: 'Categories' }
);

categoriesSchema.pre('save', function (next) {
    this.slug = slugify(this.brand_name, { lower: true });
    next();
});

const Categories = model('Categories', categoriesSchema);

module.exports = Categories;
