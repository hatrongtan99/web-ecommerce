const { Schema, ObjectId, model } = require('mongoose');

const cartItemSchema = new Schema({
    product: {
        type: ObjectId,
        ref: 'Products',
    },
    quantity: Number,
    perchasePrice: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
});

const cartsSchema = new Schema(
    {
        products: [cartItemSchema],
        user: {
            type: ObjectId,
            ref: 'Users',
        },
        created: {
            type: Date,
            default: Date.now(),
        },
        updated: Date,
    },
    { collection: 'Carts' }
);

const CartItem = model('CartItem', cartItemSchema);
const Carts = model('Carts', cartsSchema);

module.exports = {
    CartItem,
    Carts,
};
