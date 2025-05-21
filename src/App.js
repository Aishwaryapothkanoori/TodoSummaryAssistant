import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SummaryButton from "./components/SummaryButton";

function App() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (text) => {
    try {
      await axios.post("http://localhost:5000/todos", { text });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSummaryComplete = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Todo Summary Assistant</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <SummaryButton onSummaryComplete={handleSummaryComplete} />
      {message && <p className="mt-2 text-lg">{message}</p>}
    </div>
  );
}

export default App;
