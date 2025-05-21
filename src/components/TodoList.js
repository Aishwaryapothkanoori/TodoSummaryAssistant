import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TodoList.css"; // 👈 Import your CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/todos")
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="todo-title">Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
