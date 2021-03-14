import React from "react";
import Doughnnut from "./Doughnnut";
// import LineChart from './LineChart'
// import Music from "./Music";
import RightProfile from "./pages/common/RightProfile";
import Top from "./pages/common/Top";
import "./Right.css";
import WeekPin from "./WeekPin";
import { useHistory } from "react-router-dom";
import ToysIcon from "@material-ui/icons/Toys";
import moment from "moment";
import { useEffect } from "react";
import { useContext } from "react";
import { Globalcontext } from "../context/GlobalState";
import { useState } from "react";

function Right({ dark }) {
  const { todos } = useContext(Globalcontext);
  const [pinnedTodos, setPinnedTodos] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const limitTo = 1;
    const fTodos = todos.filter((el) => el.pinned === true);
    const sTodos = fTodos.slice(0, limitTo);
    setPinnedTodos(sTodos);
  }, [todos]);

  return (
    <div className="right">
      <RightProfile />
      <div className="main__top--displayTrue">
        <Top />
      </div>
      <div className="main__detail">
        {/* music */}
        {/* <Music /> */}
        {/* D-chart */}
        <Doughnnut dark={dark} />
        <div className="left__moblieSize">
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
          </div>
        </div>
        {/* line chart */}
        {/* <LineChart /> */}
        <div className="right__time"></div>
        <div className="right__qoute"></div>
      </div>
    </div>
  );
}

export default Right;
