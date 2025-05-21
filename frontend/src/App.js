import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SummaryButton from "./components/SummaryButton";
import "./App.css";

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
    setMessage("Todo added successfully!");
    fetchTodos();
  } catch (error) {
    console.error(error);
    setMessage("Failed to add todo.");
  } finally {
    setTimeout(() => setMessage(""), 3000);
  }
};


  const deleteTodo = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setMessage("Todo deleted successfully!");
    fetchTodos();
  } catch (error) {
    console.error(error);
    setMessage("Failed to delete todo.");
  } finally {
    setTimeout(() => setMessage(""), 3000);
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
      <h1 className="text-3xl font-bold mb-4 " 
      style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(84, 11, 134, 0.8)',
          backgroundColor: 'rgba(86, 226, 242, 0.41)',
          padding: '0.5rem 1rem',
          fontSize: '2rem',
          fontWeight: 'bold',
          zIndex: 100,
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          
        }}
        >Todo Summary Assistant</h1>
     <div className="container">
      
      <div className="card">
         
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <SummaryButton onSummaryComplete={handleSummaryComplete} />
      {message && <p style={{color:'rgb(18, 228, 57)',}} className="mt-2 text-lg">{message}</p>}
      </div>
     </div>

    </div>
  );
}

export default App;
