// routes/languageRoutes.js

const express = require('express');
const { getTranslations, addTranslation } = require('../Controllers/LanguageController');
const router = express.Router();

// Route to get translations by language
router.get('/translations/:lang', getTranslations);

// Route to add a new translation
router.post('/translations', addTranslation);

module.exports = router;
