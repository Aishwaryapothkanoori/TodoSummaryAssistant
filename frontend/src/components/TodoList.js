const TodoList = ({ todos, deleteTodo }) => {
  return (
    <div>
      <h1 className="todo-title">Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="todo-item flex justify-between items-center">
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
