const { Schema, model, ObjectId } = require('mongoose');

const ordersSchema = new Schema(
    {
        user: { type: ObjectId, ref: 'Users' },
        cart: { type: ObjectId, ref: 'Cart' },
        totalPrice: { type: Number, default: 0 },
        status: {
            type: String,
            enum: [
                'pending',
                'not processed',
                'processed',
                'shipping',
                'delivered',
                'cancelled',
            ],
            default: 'pending',
        },
        created: { type: Date, default: Date.now() },
        updated: Date,
    },
    { collection: 'Order' }
);
const Order = model('Order', ordersSchema);

module.exports = Order;
