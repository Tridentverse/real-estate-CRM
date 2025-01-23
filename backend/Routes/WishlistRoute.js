// wishlistRoutes.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../Controllers/WishlistController');

// Add Wishlist
router.post('/addWishlist', wishlistController.addWishlist);

// Get Wishlist by ID
router.get('/getWishlistById/:wishlistId', wishlistController.getWishlistById);

// Get Wishlist by User and Property
router.get('/wishlist/property/:propertyId',wishlistController. getWishlistByPropertyId);
// Get Wishlist by User
router.get('/properties/user/:userId', wishlistController.getPropertiesByUserId);
module.exports = router;
