const Property = require('../Models/Property'); // Import the Property model

// CREATE a new property
const createProperty = async (req, res) => {
  try {
    const { name, description, price, location, status, wishlist, realEstateType, lookingTo } = req.body;

    // Validate lookingTo object
    if (!lookingTo || !lookingTo.city || !lookingTo.society || !lookingTo.locality) {
      return res.status(400).json({ message: "lookingTo object with city, society, and locality is required." });
    }

    const newProperty = new Property({
      name,
      description,
      price,
      location,
      status,
      wishlist,
      realEstateType,
      lookingTo
    });

    await newProperty.save();
    console.log(newProperty);
    res.status(201).json({ message: 'Property created successfully', property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating property' });
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
const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting property' });
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


module.exports = {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
  searchProperties
};
