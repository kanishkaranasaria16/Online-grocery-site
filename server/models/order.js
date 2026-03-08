const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    paymentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Shipped', 'Cancelled'],
        default: 'Pending'
    },
    products: [{
        name: { type: String, required: true },
        quantity: { type: Number, required: true }
    }]
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
