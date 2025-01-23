const express = require('express');
const router = express.Router();
const 
{createFeedback,
    getFeedbacksForProperty,
    getFeedbacksByUser,
    updateFeedback,
    deleteFeedback,}= require('../Controllers/FeedbackController');

// Route to create new feedback
router.post('/postFeedback', createFeedback);

// Route to get all feedbacks for a property
router.get('/property/:propertyId', getFeedbacksForProperty);

// Route to get all feedbacks by a user
router.get('/user/:userId', getFeedbacksByUser);

// Route to update feedback by ID (update message or rating)
router.put('/:id', updateFeedback);

// Route to delete feedback by ID
router.delete('/:id', deleteFeedback);

module.exports = router;
