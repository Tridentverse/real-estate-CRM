// wishlistController.js
const Wishlist = require('../Models/Wishlist');

const addWishlist = async (req, res) => {
    try {
        const { propertyId, userId, status } = req.body;

        // Check if the property already exists in the user's wishlist
        const existingWishlistItem = await Wishlist.findOne({ userId, propertyId });

        if (existingWishlistItem) {
            return res.status(400).json({ error: "Property already exists in the user's wishlist" });
        }

        // Create a new wishlist item
        const newWishlistItem = new Wishlist({
            userId,
            propertyId,
            status
        });

        const savedWishlistItem = await newWishlistItem.save();
        return res.status(201).json(savedWishlistItem);
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ error: "Property already exists in the user's wishlist" });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const addWishlist12 = async (req, res) => {
    try {
        const { propertyId, userId } = req.body;

        const newWishlistItem = new Wishlist({
            propertyId,
            userId
        });

        const savedWishlistItem = await newWishlistItem.save();
        return res.status(201).json(savedWishlistItem);
    } catch (error) {
        console.error("Error creating wishlist item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getWishlistById = async (req, res) => {
    try {
        const wishlistId = req.params.wishlistId;
        const wishlistItem = await Wishlist.findById(wishlistId);

        if (wishlistItem) {
            return res.status(200).json({
                message: "Wishlist item retrieved successfully",
                status: true,
                wishlistItem
            });
        } else {
            return res.status(404).json({
                message: "Wishlist item not found",
                status: false
            });
        }
    } catch (error) {
        console.error("Error retrieving wishlist item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getWishlistByUserAndProperty = async (req, res) => {
    try {
        const { userId, propertyId } = req.body;

        if (!userId || !propertyId) {
            return res.status(400).json({ error: "userId and propertyId are required" });
        }

        const wishlistItem = await Wishlist.findOne({ userId, propertyId }).populate('propertyId');

        if (wishlistItem) {
            return res.status(200).json({
                message: "Wishlist item retrieved successfully",
                status: true,
                wishlistItem
            });
        } else {
            return res.status(404).json({
                message: "Wishlist item not found for this user and property",
                status: false
            });
        }
    } catch (error) {
        console.error("Error retrieving wishlist item:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getWishlistByUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        const wishlistItems = await Wishlist.find({ userId }).populate('propertyId');

        if (wishlistItems.length > 0) {
            return res.status(200).json({
                message: "Wishlist items retrieved successfully",
                status: true,
                wishlistItems
            });
        } else {
            return res.status(404).json({
                message: "No wishlist items found for this user",
                status: false
            });
        }
    } catch (error) {
        console.error("Error retrieving wishlist items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    addWishlist,
    addWishlist12,
    getWishlistById,
    getWishlistByUserAndProperty,
    getWishlistByUser
};
