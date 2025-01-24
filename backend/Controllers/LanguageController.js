// controllers/LanguageController.js
 // controllers/LanguageController.js

 const Language = require('../Models/Language');


const addTranslation = async (req, res) => {
    try {
      const { languageCode, translations } = req.body;
  
      if (!languageCode || !translations) {
        return res.status(400).json({ message: 'Language code and translations are required' });
      }
  
      const language = new Language({ languageCode, translations });
  
      await language.save();
  
      res.status(201).json({ message: 'Language added successfully', language });
    } catch (error) {
      console.error('Error adding translation:', error);
      res.status(500).json({ message: 'Error adding translation', error: error.message });
    }
  };
 
const getTranslations = async (req, res) => {
  try {
    const { lang } = req.params; // 'lang' will hold the language code

    // Find the translations for the specified language
    const language = await Language.findOne({ languageCode: lang });

    if (!language) {
      return res.status(404).json({ message: `Language ${lang} not supported` });
    }

    res.status(200).json(language.translations); 
  } catch (error) {
    console.error('Error fetching translations:', error);
    res.status(500).json({ message: 'Error fetching translations', error: error.message });
  }
};

module.exports = { addTranslation,getTranslations };

  
  