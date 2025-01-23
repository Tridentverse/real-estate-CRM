const Property = require('../models/Property'); // Import the Property model

// CREATE a new property
const createProperty = async (req, res) => {
  try {
    const { name, description, price, location, status } = req.body;

    const newProperty = new Property({
      name,
      description,
      price,
      location,
      status,
    });

    await newProperty.save();
    console.log(newProperty);
    res.status(201).json({ message: 'Property created successfully', property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating property' });
  }
};

// READ all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching properties' });
  }
};

// READ a single property by ID
const getProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

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
    const { name, description, price, location, status } = req.body;

    const property = await Property.findByIdAndUpdate(
      id,
      { name, description, price, location, status },
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

module.exports = {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty,
};
