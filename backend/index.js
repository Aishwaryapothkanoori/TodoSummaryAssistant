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
  const { text } = req.body; // <-- use text instead of title
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const { data, error } = await supabase.from("todos").insert([{ text }]).select();
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
    const { data: todos, error } = await supabase.from("todos").select("*");
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const todoListString = todos.length
      ? todos.map(todo => `• ${todo.text}`).join("\n")
      : "No todos found.";

    // Temporarily bypass OpenAI call
    const summaryText = todoListString;

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      await axios.post(webhookUrl, { text: `📝 *Todo Summary:*\n${summaryText}` });
    }

    res.json({ message: "Summary sent successfully", summary: summaryText });
  } catch (error) {
  console.error("Error generating summary:", error);
  res.status(500).json({ error: error.toString() }); // send real error to client
}

});


app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
