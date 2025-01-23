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

const getWishlistByPropertyId = async (req, res) => {
    try {
        const { propertyId } = req.params;

        if (!propertyId) {
            return res.status(400).json({ error: "propertyId is required" });
        }

        const wishlistItems = await Wishlist.find({ propertyId }).populate('propertyId');

        if (wishlistItems.length > 0) {
            return res.status(200).json({
                message: "Wishlist items retrieved successfully",
                status: true,
                wishlistItems
            });
        } else {
            return res.status(404).json({
                message: "No wishlist items found for this property",
                status: false
            });
        }
    } catch (error) {
        console.error("Error retrieving wishlist items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getPropertiesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }

        // Find wishlist items by userId and populate property details
        const wishlistItems = await Wishlist.find({ userId }).populate('propertyId');

        if (wishlistItems.length > 0) {
            // Extract property details from the populated wishlist items
            const properties = wishlistItems.map((item) => item.propertyId);

            return res.status(200).json({
                message: "Properties retrieved successfully",
                status: true,
                properties
            });
        } else {
            return res.status(404).json({
                message: "No wishlist items found for this user",
                status: false
            });
        }
    } catch (error) {
        console.error("Error retrieving properties:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    addWishlist,
    getWishlistById,
    getWishlistByPropertyId,
    getPropertiesByUserId
};
