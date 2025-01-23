const UserFeedback = require('../Models/Feedback');

// CREATE a new feedback
const createFeedback = async (req, res) => {
  try {
    const { userId, propertyId, feedbackMessage, rating } = req.body;

    if (!userId || !propertyId || !feedbackMessage || rating === undefined) {
      return res.status(400).json({ message: 'UserId, PropertyId, FeedbackMessage, and Rating are required.' });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const newFeedback = new UserFeedback({
      userId,
      propertyId,
      feedbackMessage,
      rating,
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback created successfully', feedback: newFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating feedback' });
  }
};

// READ all feedbacks for a property
const getFeedbacksForProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const feedbacks = await UserFeedback.find({ propertyId })
      .populate('userId', 'username email')
      .populate('propertyId', 'name location');

    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found for this property' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching feedbacks' });
  }
};

// READ all feedbacks by a specific user
const getFeedbacksByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const feedbacks = await UserFeedback.find({ userId })
      .populate('propertyId', 'name location');

    if (!feedbacks.length) {
      return res.status(404).json({ message: 'No feedback found from this user' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user feedbacks' });
  }
};

// UPDATE a feedback by ID (for updating rating or message)
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedbackMessage, rating } = req.body;

    // Validate rating
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const updatedFeedback = await UserFeedback.findByIdAndUpdate(
      id,
      { feedbackMessage, rating, updatedAt: Date.now() },
      { new: true } // Return the updated document
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating feedback' });
  }
};

// DELETE a feedback by ID
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await UserFeedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting feedback' });
  }
};

module.exports = {
  createFeedback,
  getFeedbacksForProperty,
  getFeedbacksByUser,
  updateFeedback,
  deleteFeedback,
};
