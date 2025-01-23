const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    status: { type: String, default: 'Available' }, // Property status: Available, Sold, etc.
  },
  { timestamps: true } // This will add createdAt and updatedAt automatically
);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
