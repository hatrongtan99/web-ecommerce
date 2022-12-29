const { Schema, model, ObjectId } = require('mongoose');

const ordersSchema = new Schema(
    {
        user: { type: ObjectId, ref: 'Users' },
        carts: { type: ObjectId, ref: 'Carts' },
        totalPrice: { type: Number, default: 0 },
        created: { type: Date, default: Date.now() },
        updated: Date,
    },
    { collection: 'Orders' }
);
const Orders = model('Orders', ordersSchema);

module.exports = { Orders };
