// CREATE a new property
const Property = require('../Models/Property'); // Import Property model
const User = require('../Models/User'); // Import User model
const Admin = require('../Models/Admin'); // Import Admin model



const createProperty = async (req, res) => {
  try {
    console.log("Received data:", req.body);  // Log the received request body

    const { role, userId, adminId, name, description, price, location, status, wishlist, realEstateType, lookingTo } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }
    if (!wishlist) {
      return res.status(400).json({ message: "Wishlist is required" });
    }

    if (role === "user" && !userId) {
      return res.status(400).json({ message: "userId is required for user role" });
    }

    if (role === "admin" && !adminId) {
      return res.status(400).json({ message: "adminId is required for admin role" });
    }

    // Validate the lookingTo object
    if (!lookingTo || !lookingTo.city || !lookingTo.society || !lookingTo.locality) {
      return res.status(400).json({ message: "LookingTo must include city, society, and locality" });
    }

    // Create the property
    const newProperty = new Property({
      role,
      userId: role === "user" ? userId : null,
      adminId: role === "admin" ? adminId : null,
      name,
      description,
      price,
      location,
      status,
      wishlist,
      realEstateType,
      lookingTo
    });

    // Save the property to the database
    await newProperty.save();

    return res.status(201).json({ message: "Property created successfully", property: newProperty });
  } catch (error) {
    console.error("Error creating property:", error.message);  // Log the error message
    return res.status(500).json({ message: "Error adding the property", error: error.message });
  }
};




// READ all properties (populate wishlist)
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('wishlist', 'userId propertyId');
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching properties' });
  }
};

// READ a single property by ID (populate wishlist)
const getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id).populate('wishlist', 'userId propertyId');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching property' });
  }
};

// UPDATE a property by ID
const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, location, status, wishlist, realEstateType, lookingTo } = req.body;

    // Validate lookingTo object if provided
    if (lookingTo && (!lookingTo.city || !lookingTo.society || !lookingTo.locality)) {
      return res.status(400).json({ message: "Incomplete lookingTo object. Please provide city, society, and locality." });
    }

    const property = await Property.findByIdAndUpdate(
      id,
      { name, description, price, location, status, wishlist, realEstateType, lookingTo },
      { new: true } // Return the updated document
    );

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating property' });
  }
};

// DELETE a property by ID
const deleteProperty = async (id) => {
  try {
    // Send DELETE request to the backend API to delete the property by ID
    const response = await axios.delete(`http://localhost:5000/api/deleteProperty/${id}`);
    
    if (response.status === 200) {
      // If successful, filter the properties array to remove the deleted property
      setProperties(properties.filter((property) => property._id !== id));
      alert("Property deleted successfully!");
    } else {
      alert("Something went wrong with deleting the property.");
    }
  } catch (err) {
    console.error("Failed to delete property:", err.message);
    alert("Error deleting the property.");
  }
};


const searchProperties = async (req, res) => {
  try {
    // Destructure search fields from the query params
    const { name, location, realEstateType, priceMin, priceMax, city, society, locality } = req.query;

    // Building the search query object
    let searchQuery = {};

    if (name) searchQuery.name = { $regex: name, $options: 'i' }; // Case-insensitive search by name
    if (location) searchQuery.location = { $regex: location, $options: 'i' };
    if (realEstateType) searchQuery.realEstateType = realEstateType;

    if (priceMin && priceMax) {
      searchQuery.price = { $gte: priceMin, $lte: priceMax };
    } else if (priceMin) {
      searchQuery.price = { $gte: priceMin };
    } else if (priceMax) {
      searchQuery.price = { $lte: priceMax };
    }

    if (city || society || locality) {
      searchQuery['lookingTo'] = {};
      if (city) searchQuery['lookingTo.city'] = { $regex: city, $options: 'i' };
      if (society) searchQuery['lookingTo.society'] = { $regex: society, $options: 'i' };
      if (locality) searchQuery['lookingTo.locality'] = { $regex: locality, $options: 'i' };
    }

    // Fetch properties matching the search query
    const properties = await Property.find(searchQuery).populate('wishlist', 'userId propertyId');

    if (properties.length === 0) {
      return res.status(404).json({ message: 'No properties found for the given search criteria' });
    }

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching properties' });
  }
};


const getAdminProperties = async (req, res) => {
  try {
    const { adminId } = req.params; // Get adminId from request parameters

    if (!adminId) {
      return res.status(400).json({ message: "adminId is required" });
    }

    // Fetch properties where role is 'admin' and adminId matches
    const properties = await Property.find({ role: 'admin', adminId })
      .populate('adminId', 'name'); // Optionally, populate the admin details

    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found for this admin" });
    }

    // Respond with the fetched properties
    res.status(200).json(properties);

  } catch (error) {
    console.error('Error fetching admin properties:', error);
    res.status(500).json({ message: 'Error fetching admin properties', error: error.message });
  }
};


// Fetch properties posted by the user
const getUserProperties = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from request parameters

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Fetch properties where role is 'user' and userId matches
    const properties = await Property.find({ role: 'user', userId })
      .populate('userId', 'name'); // Optionally, populate the user details

    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found for this user" });
    }

    // Respond with the fetched properties
    res.status(200).json(properties);

  } catch (error) {
    console.error('Error fetching user properties:', error);
    res.status(500).json({ message: 'Error fetching user properties', error: error.message });
  }
};



module.exports = {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
  getAdminProperties,
  getUserProperties
};
