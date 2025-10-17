import { useState } from "react";

const TodoNew = ({ addNewTodo }) => {
  const [myInput, setMyInput] = useState("");

  const handleAddTodo = () => {
    if (!myInput.trim()) return; // Không cho thêm todo trống
    addNewTodo(myInput.trim());
    setMyInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-new">
      <div className="todo-input">
        <input
          type="text"
          placeholder="Nhập công việc cần làm..."
          value={myInput}
          onChange={(e) => setMyInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="add-btn" onClick={handleAddTodo}>
          + Thêm
        </button>
      </div>
      {myInput && (
        <div className="todo-preview">
          ✏️ Đang nhập: <span>{myInput}</span>
        </div>
      )}
    </div>
  );
};

export default TodoNew;
