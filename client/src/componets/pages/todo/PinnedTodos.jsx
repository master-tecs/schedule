import React, { useContext } from "react";
import { useState } from "react";
import { Redirect, useHistory } from "react-router";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import moment from "moment";
import { Globalcontext } from "../../../context/GlobalState";
import Todo from "../../Todo";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useEffect } from "react";

function PinnedTodos() {
  const { todos, token } = useContext(Globalcontext);
  const [pinnedTodos, setPinnedTodos] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const fTodos = todos.filter((el) => el.pinned === true);
    setPinnedTodos(fTodos);
  }, [todos]);

  return (
    <div className="main">
      <div className="main__top">
        <div className="main__top--leftIcon">
          <ArrowBackIcon onClick={() => history.goBack()} />
        </div>
        <h2>Pinned Todos</h2>
      </div>
      {token ? (
        <div className="main__todos">
          {pinnedTodos.length === 0 ? (
            <h2 className="main__todos--empty">
              You don't have pinned todos yet.. Go Back and Add Some!
            </h2>
          ) : (
            pinnedTodos.map((todo) => (
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
            ))
          )}
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

export default PinnedTodos;
