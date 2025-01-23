const express = require('express');
const { 
  createProperty, 
  getProperties, 
  getProperty, 
  updateProperty, 
  deleteProperty ,
  searchProperties
} = require('../Controllers/PropertyController'); // Adjust path as necessary
const router = express.Router();

// Route to create a new property
router.post('/createProperty', createProperty);

// Route to get all properties
router.get('/getAllProperties', getProperties);

// Route to get a property by ID
router.get('/getProperty/:id', getProperty);

// Route to update a property by ID
router.put('/update/:id', updateProperty);

// Route to delete a property by ID
router.delete('/delete/:id', deleteProperty);
router.get('/search', searchProperties);

module.exports = router;
