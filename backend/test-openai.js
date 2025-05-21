const axios = require("axios");
require("dotenv").config();

axios.post(
  "https://api.openai.com/v1/chat/completions",
  {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello! Can you reply to this message?" }],
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
)
.then(res => console.log("✅ Success:", res.data.choices[0].message.content))
.catch(err => console.error("❌ Error:", err.response?.data || err.message));
