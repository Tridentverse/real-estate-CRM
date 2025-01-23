const mongoose = require('mongoose');

const userEnquirySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',  // Assuming you have a User model
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',  // The Property being enquired about
      required: true,
    },
    enquiryMessage: {
      type: String,
      required: true,
      maxlength: 500,  // You can set a max length for the message if necessary
    },
    status: {
      type: String,
      enum: ['Pending', 'Resolved', 'Answered'],  // Different stages of an enquiry
      default: 'Pending',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserEnquiry', userEnquirySchema);
