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

const cartSchema = new Schema(
    {
        products: [cartItemSchema],
        user: {
            type: ObjectId,
            ref: 'Users',
        },
        status: {
            type: String,
            enum: ['idle', 'processed'],
            default: 'idle',
        },
        created: {
            type: Date,
            default: Date.now(),
        },
        updated: Date,
    },
    { collection: 'Cart' }
);

const CartItem = model('CartItem', cartItemSchema);
const Cart = model('Cart', cartSchema);

module.exports = {
    CartItem,
    Cart,
};
