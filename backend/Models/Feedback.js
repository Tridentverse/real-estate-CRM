const mongoose = require('mongoose');

const userFeedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',  // Assuming you have a User model
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',  // The Property for which the feedback is given
      required: true,
    },
    feedbackMessage: {
      type: String,
      required: true,
      maxlength: 500,  // You can set a max length for the message if necessary
    },
    rating: {
      type: Number,
      required: true,
      min: 1,  // Minimum rating (1 out of 5)
      max: 5,  // Maximum rating (5 out of 5)
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

module.exports = mongoose.model('UserFeedback', userFeedbackSchema);
