const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      productName: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  paymentStatus: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CartItem', CartItemSchema);
