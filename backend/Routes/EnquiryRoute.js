const express = require('express');
const { 
  createEnquiry, 
  getEnquiries, 
  getEnquiry, 
  updateEnquiryStatus, 
  deleteEnquiry 
} = require('../Controllers/EnquiryController');

const router = express.Router();

// Route to create a new enquiry
router.post('/enquiries', createEnquiry);

// Route to get all enquiries (admin use)
router.get('/getAllEnquiries', getEnquiries);

// Route to get a specific enquiry by ID
router.get('/enquiries/:id', getEnquiry);

// Route to update the status of an enquiry (admin only)
router.put('/enquiries/:id', updateEnquiryStatus);

// Route to delete an enquiry (admin only)
router.delete('/enquiries/:id', deleteEnquiry);

module.exports = router;
