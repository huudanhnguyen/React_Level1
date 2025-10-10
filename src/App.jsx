import "./components/todo/todo.css";
import TodoNew from "./components/todo/todoNew";
import TodoData from "./components/todo/todoData";
import { useState } from "react";
const App = () => {
  const [todoList, setTodoList] = useState([]);
  const addNewTodo = (name) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: name,
    };
    setTodoList([...todoList, newTodo]);
  };
  const deleteTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };
  return (
    <>
      <div className="todo-container">
        <div className="todo-title">Todo List</div>
        <TodoNew addNewTodo={addNewTodo} />
        {todoList.length > 0 && <TodoData todoList={todoList} deleteTodo={deleteTodo} />}
      </div>
    </>
  );
};

export default App;
