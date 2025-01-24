const mongoose = require('mongoose');

// Property Schema
const PropertySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user', // Reference to the User model
      required: function() {
        return this.role === 'user'; // userId is required if the role is 'user'
      }
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin', // Reference to the Admin model
      required: function() {
        return this.role === 'admin'; // adminId is required if the role is 'admin'
      }
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true },
    wishlist: { type: String, required: true },
    realEstateType: { type: String, required: true },
    lookingTo: {
      city: String,
      society: String,
      locality: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', PropertySchema);
