const Review = require('../Models/Review');

const createReview = async (req, res) => {
  try {
    const { userId, propertyId, feedbackMessage, rating } = req.body;
    const newReview = new Review({ userId, propertyId, feedbackMessage, rating });
    await newReview.save();
    res.status(201).json({ message: 'Review created successfully', review: newReview });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error });
  }
};

const getReviewsByProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const reviews = await Review.find({ propertyId }).populate('userId', 'username');

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this property' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error); // Log the error
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};
// Exporting the functions as an object
module.exports = {
  createReview,
  getReviewsByProperty,
};