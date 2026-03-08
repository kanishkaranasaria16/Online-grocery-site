const mongoose = require('mongoose');

const productListSchema = mongoose.Schema({
    productTitle: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    rating: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    stock: {
        type: Number,
        required: true
    }
});

productListSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productListSchema.set('toJSON', {
    virtuals: true
});

exports.ProductList = mongoose.model('ProductList', productListSchema);
