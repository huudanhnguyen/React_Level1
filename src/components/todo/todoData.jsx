const TodoData = ({ todoList, deleteTodo, toggleTodo }) => {
  return (
    <div className="todo-data">
      {todoList.map((todo) => (
        <div
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <span className="todo-name" onClick={() => toggleTodo(todo.id)}>
            {todo.name}
          </span>

          <div className="todo-actions">
            {!todo.completed ? (
              <button
                className="delete-btn"
                onClick={() => toggleTodo(todo.id)}
              >
                ✓
              </button>
            ) : (
              <button
                className="restore-btn"
                onClick={() => toggleTodo(todo.id)}
              >
                ↺
              </button>
            )}
            <button
              className="delete-btn"
              style={{ backgroundColor: "#ef4444" }}
              onClick={() => deleteTodo(todo.id)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoData;
