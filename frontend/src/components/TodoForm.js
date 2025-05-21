import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <div >
      <form
  onSubmit={handleSubmit}
  style={{
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <input
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Enter a to-do"
    style={{
      border: '1px solid #ccc',
      padding: '0.5rem',
      borderRadius: '6px',
      width: '35%',
      marginRight: '0.5rem',
      fontSize: '1rem',
    }}
  />
  <button
    type="submit"
    style={{
      backgroundColor: 'rgba(33, 132, 231, 0.55)', 
      color: '#ffffff',
      padding: '0.5rem 1rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(33, 132, 231, 0.55)')} // blue-700
    onMouseLeave={(e) => (e.target.style.backgroundColor = '#1e40af')}
  >
    Add
  </button>
</form>

    </div>
  );
};

export default TodoForm;
