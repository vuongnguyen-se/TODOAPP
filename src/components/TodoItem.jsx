//import React from "react";
import "../App.css";

const TodoItem = (props) => {
  return (
    <div 
    className="todoItem" 
    onClick={() => props.handleItemClick(props.id)}>

      <div style={{ display: "flex", gap: 4 }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={() => {
            props.handleCheckBoxChange(props.id);
          }}
        />
        <p>{props.name}</p>
      </div>
      {props.isImportant && <p>✨</p>}
    </div>
  );
};
export default TodoItem;
