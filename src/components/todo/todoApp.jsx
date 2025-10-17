import "./todo.css";
import TodoNew from "./todoNew";
import TodoData from "./todoData";
import { useState, useEffect } from "react";

const TodoApp = () => {
  const [todoList, setTodoList] = useState([]);

  // 🟢 Khi load lần đầu -> lấy dữ liệu từ localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todoList");
    if (savedTodos) {
      setTodoList(JSON.parse(savedTodos));
    }
  }, []);

  // 🟢 Mỗi khi todoList thay đổi -> lưu vào localStorage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addNewTodo = (name) => {
    if (!name.trim()) return; // không thêm todo rỗng
    const newTodo = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
  };

  const toggleTodo = (id) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(updatedList);
  };

  const deleteTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo} />
      {todoList.length > 0 && (
        <TodoData
          todoList={todoList}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      )}
    </div>
  );
};

export default TodoApp;
