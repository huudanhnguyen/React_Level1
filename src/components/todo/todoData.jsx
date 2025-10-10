const TodoData = (props) => {
  const { todoList, deleteTodo } = props;
  const handleDelete = (id) => {
    deleteTodo(id);
  };
  return (
    <div className="todo-data">
      {todoList.map((todo) => {
        return (
          <div className="todo-item" key={todo.id}>
            {todo.name}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoData;
