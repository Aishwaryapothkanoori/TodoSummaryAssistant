const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// GET /todos - Fetch all todos
app.get("/todos", async (req, res) => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// POST /todos - Add a new todo
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const { data, error } = await supabase.from("todos").insert([{ title }]).select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

// DELETE /todos/:id - Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: `Todo with id ${id} deleted successfully` });
});

// POST /summarize - Send a summary message via Slack webhook
app.post("/summarize", async (req, res) => {
  try {
    // Fetch all todos
    const { data, error } = await supabase.from("todos").select("*");
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const messageText = data.length
      ? `📝 *Todo Summary:*\n${data.map(todo => `• ${todo.title}`).join("\n")}`
      : "No todos found.";

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (webhookUrl) {
      await axios.post(webhookUrl, { text: messageText });
    }

    res.json({ message: "Summary sent successfully" });
  } catch (error) {
    console.error("Error sending summary:", error);
    res.status(500).json({ error: "Failed to send summary" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
