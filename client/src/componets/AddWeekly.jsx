/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { useContext } from "react";
// import WeekPin from "./WeekPin";
import moment from "moment";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import { Globalcontext } from "../context/GlobalState";
import "./pages/common/Popup.css";
import { useEffect } from "react";
import Todo from "./Todo";

function AddWeekly() {
  const { todos } = useContext(Globalcontext);
  const [notPinnedTodos, setNotPinnedTodos] = useState([]);

  useEffect(() => {
    const fTodos = todos.filter((el) => el.pinned === false);
    setNotPinnedTodos(fTodos);
  }, [todos]);
  return (
    <Popup
      trigger={
        //   <WeekPin Icon={AddIcon} title="Add weekly pin" />
        <div className="weekPin">
          <div className="weekPin__icon">
            <AddIcon className="weekPin__icon--add" />
          </div>
          <div className="weekPin__detail">
            <div className="weekPin__detail--title">
              <p>Add weekly pin</p>
            </div>
          </div>
        </div>
      }
      modal
      nested
      className="modal"
    >
      {(close) => (
        <div className="modal">
          <CloseIcon onClick={close} className="modal__close" />
          <div className="modal__content">
            <h2 className="modal__header"> Add Todo To Pinned Todos </h2>

            {notPinnedTodos.map((todo) => (
              <Todo
                key={todo._id}
                id={todo._id}
                Icon={DoneOutlineIcon}
                title={todo.title}
                completed={todo.completed}
                startTime={moment(todo.startDate).format("h:mm A")}
                endTime={moment(todo.endDate).format("h:mm A")}
                detail={todo.detail}
                pinned={todo.pinned}
              />
            ))}
            <Button
              variant="contained"
              onClick={(e) => {
                close();
              }}
            >
              Cancel
            </Button>
          </div>
          {/* <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div> */}
        </div>
      )}
    </Popup>
  );
}
export default AddWeekly;
