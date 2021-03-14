import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Globalcontext } from "../context/GlobalState";
import "./Todo.css";

function Todo({
  Icon,
  id,
  title,
  startTime,
  endTime,
  completed,
  detail,
  pinned,
}) {
  const { setViewtodo, changeComplete } = useContext(Globalcontext);
  let history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    await changeComplete(id);
  };

  const handleViewTodo = () => {
    setViewtodo(id);
    history.push("/todoDetail");
  };

  return (
    <div className={completed ? "todoDone" : "todo"}>
      <div
        className={completed ? "todoDone__icon" : "todo__icon"}
        onClick={(e) => handleClick(e)}
      >
        <Icon />
      </div>
      <div className="todo__detail" onClick={handleViewTodo}>
        <div className="todo__detail--top">
          <div className="todo__detail--title">
            <p>{title}</p>
          </div>
          <div className="todo__detail--dateTime">
            <p>{startTime}</p>
            <p>{endTime}</p>
          </div>
        </div>
        <p className="todo__detail--discibtion">
          <p>{detail}</p>
        </p>
      </div>
    </div>
  );
}

export default Todo;
