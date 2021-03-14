import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router";
import { Globalcontext } from "../context/GlobalState";
import "./WeekPin.css";

function WeekPin({ id, Icon, title, date, time, pinned, detail }) {
  const { setViewtodo } = useContext(Globalcontext);
  let history = useHistory();
  const handleViewTodo = () => {
    setViewtodo(id);
    history.push("/todoDetail");
  };

  return (
    <div className="weekPin">
      <div className="weekPin__icon">
        <Icon className="weekPin__icon--add" />
      </div>
      <div className="weekPin__detail" onClick={handleViewTodo}>
        <div className="weekPin__detail--title">
          <p>{title}</p>
        </div>
        <div className="weekPin__detail--dateTime">
          <p>
            {date} {date && time ? "-" : ""} {time}
          </p>
        </div>
        {pinned ? (
          <div className="weekPin__detail--pin">
            <p>Pinned</p>
          </div>
        ) : (
          ""
        )}
        <p className="weekPin__detail--discibtion">
          <p>{detail}</p>
        </p>
      </div>
    </div>
  );
}

export default WeekPin;
