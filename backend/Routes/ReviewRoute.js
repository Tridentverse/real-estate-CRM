const express = require('express');
const router = express.Router();
const {createReview,getReviewsByProperty}=require("../Controllers/PropertyReviewController");

router.post('/reviews', createReview);
router.get('/reviews/:propertyId', getReviewsByProperty);

module.exports = router;