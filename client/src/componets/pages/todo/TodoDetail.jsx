import React from "react";
import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { Button } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import "./TodoDetail.css";
import { useContext } from "react";
import { Globalcontext } from "../../../context/GlobalState";
import { deleteTodos } from "../../../services/todos";
import { Redirect, useHistory } from "react-router";
import moment from "moment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function TodoDetail() {
  const { viewTodo, updateTodo } = useContext(Globalcontext);
  const [value, onChange] = useState(new Date());
  const token = localStorage.getItem("token");
  let history = useHistory();

  const {
    _id: id,
    title,
    startDate,
    endDate,
    completed: done,
    detail,
    pinned,
    userId,
  } = viewTodo;
  const [completed, setcompleted] = useState(done);
  const [todoPinned, setTodoPinned] = useState(pinned);
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDetail, setTodoDetail] = useState(detail);

  const handleCompleted = async () => {
    setcompleted(!completed);
  };
  const handlePinned = async () => {
    setTodoPinned(!todoPinned);
  };
  const handleSubmit = async () => {
    const newTodo = {
      _id: id,
      startDate,
      title: todoTitle,
      detail: todoDetail,
      endDate: value,
      pinned: todoPinned,
      completed,
      userId,
    };
    updateTodo(newTodo);
    history.push("/home");
  };

  const handleDelete = async () => {
    const res = await deleteTodos(id, token);
    if (res["request"]["status"] !== 200) {
      alert("Something went wrong!");
    } else {
      history.push("/home");
    }
  };

  if (Object.keys(viewTodo).length === 0) return <Redirect to="/home" />;
  return (
    <div className="main">
      <div className="main__top">
        <div className="todoTitle">
          <div className="main__top--leftIcon">
            <ArrowBackIcon onClick={() => history.goBack()} />
          </div>
          <h2 className="todoTitle--title">{title}</h2>
          {completed ? (
            <div className="icon icon--completed" onClick={handleCompleted}>
              <DoneOutlineIcon />
              <p>DONE</p>
            </div>
          ) : (
            <div className="icon icon--notCompleted" onClick={handleCompleted}>
              <DoneOutlineIcon />
              <p>DONE</p>
            </div>
          )}
        </div>
      </div>
      <div className="todoDetail">
        <input
          onChange={(e) => setTodoTitle(e.target.value)}
          value={todoTitle}
          //   label="Todo"
          variant="outlined"
          className="todoDetail__input"
        />
        <input
          onChange={(e) => setTodoDetail(e.target.value)}
          value={todoDetail}
          //   label="Detail"
          variant="outlined"
          className="todoDetail__input"
        />
        <div className="todoDetail__date">
          <h3>Start Time:</h3>
          <div className="todoDetail__pin--pinned">
            <p>{moment(startDate).format("dddd,  h:mm:ss A")}</p>
          </div>
        </div>
        <div className="todoDetail__date">
          <h3>End Time:</h3>
          <div className="todoDetail__pin--pinned">
            {endDate ? <p>{endDate}</p> : <p>You have not set Due date</p>}
          </div>
        </div>
        <div className="todoDetail__date">
          <h3>Due Date:</h3>
          <DateTimePicker
            className="todoDetail__pin--pinned"
            onChange={(e) => onChange(e)}
            value={value}
          />
        </div>
        <div className="todoDetail__date">
          <h3>Pin As Weekly Todo:</h3>
          {todoPinned ? (
            <div
              onClick={handlePinned}
              className="todoDetail__pin--pinned pinned__color"
            >
              <p>Todo Pinned</p>
            </div>
          ) : (
            <div onClick={handlePinned} className="todoDetail__pin--notpinned">
              <p>Pin Todo</p>
            </div>
          )}
          {/* <div
            onClick={handlePinned}
            className={
              todoPinned
                ? "todoDetail__pin--pinned pinned__color"
                : "todoDetail__pin--notpinned"
            }
          >
            <p>Pin Todo</p>
          </div> */}
        </div>
        <div>
          <Button
            className="btn--delete"
            variant="contained"
            onClick={(e) => {
              handleDelete(e);
            }}
          >
            <DeleteOutlineIcon />
            Delete
          </Button>
          <Button
            className="btn--update"
            variant="contained"
            onClick={(e) => {
              handleSubmit();
            }}
          >
            Update Todo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TodoDetail;
