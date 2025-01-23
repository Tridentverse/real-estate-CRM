const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    propertyId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

// Create a compound unique index on userId and propertyId fields
wishlistSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
