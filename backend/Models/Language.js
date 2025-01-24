// models/Language.js

const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
  languageCode: {
    type: String,
    required: true,
    unique: true
  },
  translations: {
    type: Map,
    of: String,
    required: true // store key-value pairs for translations
  }
});

module.exports = mongoose.model('Language', LanguageSchema);
