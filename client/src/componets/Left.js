/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
// import Calender from "./Calender";
import WeekPin from "./WeekPin";
import { useHistory } from "react-router-dom";
import ToysIcon from "@material-ui/icons/Toys";
import moment from "moment";
import { Globalcontext } from "../context/GlobalState";
import { useEffect } from "react";
import { useState } from "react";
// import AddWeekly from "../componets/AddWeekly";
import "./Left.css";

function left({ dark }) {
  const { todos } = useContext(Globalcontext);
  const [pinnedTodos, setPinnedTodos] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const limitTo = 2;
    const fTodos = todos.filter((el) => el.pinned === true);
    const sTodos = fTodos.slice(0, limitTo);
    setPinnedTodos(sTodos);
  }, [todos]);

  return (
    <div className="left">
      <div className="left__top">
        <h3>Weekly Pinned</h3>
        <p onClick={() => history.push("/pinnedTodos")}>View all</p>
      </div>
      <div className="left__mid">
        {pinnedTodos.map((todo) => (
          <WeekPin
            key={todo._id}
            id={todo._id}
            Icon={ToysIcon}
            title={todo.title}
            date={moment(todo.startDate).format("ll")}
            // date="15 Mar 2020"
            time={moment(todo.startDate).format("h:mm A")}
            pinned={todo.pinned}
            detail={todo.detail}
          />
        ))}
        {/* <WeekPin
          Icon={ToysIcon}
          title="The title"
          date="15 Mar 2020"
          time="9:00AM"
        /> */}
        {/* <AddWeekly /> */}
      </div>
      <div className="left__bottom">
        {/* calender */}
        {/* <Calender dark={dark} /> */}
      </div>
    </div>
  );
}

export default left;
