const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String ,required:true},
  status: { type: String, required: true },
  wishlist: { type: String, required: true },
   

  // New fields
  realEstateType: { type: String, required: true }, // Example: 'Apartment', 'Villa', etc.
  lookingTo: { 
    city: { type: String, required: true }, 
    society: { type: String, required: true },
    locality: { type: String, required: true } 
  }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
