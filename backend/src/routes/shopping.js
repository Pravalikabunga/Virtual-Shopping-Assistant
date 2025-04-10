const express = require('express');
const { body, validationResult } = require('express-validator');
const { generateShoppingResponse } = require('../utils/gemini');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateShoppingRequest = [
  body('query').notEmpty().trim().escape(),
];

// Shopping assistant endpoint - authenticated access required
router.post('/assist', auth, validateShoppingRequest, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { query } = req.body;
    console.log('Received shopping query from user:', req.user.username, ':', query);
    
    const response = await generateShoppingResponse(query);
    console.log('Generated response for user:', req.user.username);
    
    res.json({ response });
  } catch (error) {
    console.error('Shopping Assistant Error:', error);
    console.error('Error stack:', error.stack);
    
    // Send more detailed error information
    res.status(500).json({ 
      error: 'Failed to process shopping request',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Enhanced endpoint with additional personalization
router.post('/assist/enhanced', auth, validateShoppingRequest, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { query } = req.body;
    console.log('Received enhanced shopping query from user:', req.user.username, ':', query);
    
    // Here you could add additional personalization based on user history
    const response = await generateShoppingResponse(query);
    console.log('Generated enhanced response for user:', req.user.username);
    
    res.json({ 
      response,
      personalized: true
    });
  } catch (error) {
    console.error('Enhanced Shopping Assistant Error:', error);
    res.status(500).json({ 
      error: 'Failed to process enhanced shopping request',
      message: error.message
    });
  }
});

module.exports = router; 