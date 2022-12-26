const { Schema, model, ObjectId } = require('mongoose');

// cart
const cartsSchema = new Schema(
    {
        user: { type: ObjectId, ref: 'Users' },
        status: { type: String, default: 'active', enum: ['active', 'expire'] },
        modifiOn: { type: Date, default: Date.now() },
        products: [
            {
                productId: { type: ObjectId, ref: 'Products', required: true },
                quantity: { type: Number },
            },
        ],
    },
    { collection: 'Carts', timestamps: true }
);
const Carts = model('Carts', cartsSchema);

// order
const ordersSchema = new Schema(
    {
        user: { type: ObjectId, ref: 'Users' },
        cartId: { type: ObjectId, ref: 'Carts' },
        totalPrice: { type: Number, required: true },
        status: {
            type: String,
            enum: [''],
        },
    },
    { collection: 'Orders', timestamps: true }
);
const Orders = model('Orders', ordersSchema);

module.exports = { Carts, Orders };
