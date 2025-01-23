// wishlistRoutes.js
const express = require('express');
const router = express.Router();
const wishlistController = require('../Controllers/WishlistController');

// Add Wishlist
router.post('/addWishlist', wishlistController.addWishlist);

// Add Wishlist v2 (example of another similar function)
router.post('/addWishlist12', wishlistController.addWishlist12);

// Get Wishlist by ID
router.get('/getWishlistById/:wishlistId', wishlistController.getWishlistById);

// Get Wishlist by User and Property
router.get('/getWishlistByUserAndProperty', wishlistController.getWishlistByUserAndProperty);

// Get Wishlist by User
router.get('/getWishlistByUser', wishlistController.getWishlistByUser);

module.exports = router;
