const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per minute
  message: 'Too many requests, please try again later.',
});
app.use('/random-message', limiter);

// Endpoint
app.get('/random-message', async (req, res) => {
  console.log("API Key Loaded: ", !!process.env.OPENAI_API_KEY);

  try {
    console.log("Making OpenAI API request...");
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing API key. Ensure OPENAI_API_KEY is set in your .env file.");
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Give me a random encouraging message for a new user.' },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("API request successful:", response.data);
    const message = response.data.choices[0].message.content.trim();
    res.json({ message });
  } catch (error) {
    console.error("Error during API request:");
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Message: ${error.response.data.error?.message}`);
    } else {
      console.error(`Error: ${error.message}`);
    }
    res.status(500).json({
      message: error.response?.data?.error?.message || 'Error fetching message from OpenAI',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
