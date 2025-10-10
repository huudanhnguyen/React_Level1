import { useState } from "react";
const TodoNew = (props) => {
  const { addNewTodo } = props;
  const [myInput, setMyInput] = useState("");
  const handleClick = () => {
    addNewTodo(myInput);
    setMyInput("");
  };
  const handleOnChange = (name) => {
    setMyInput(name);
  };
  return (
    <div>
      <input
        type="text"
        className="todo-input"
        value={myInput}
        onChange={(event) => {
          handleOnChange(event.target.value);
        }}
      />
      <button
        className="add-btn"
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        Add
      </button>
      <div className="">my input is: {myInput}</div>
    </div>
  );
};
export default TodoNew;
