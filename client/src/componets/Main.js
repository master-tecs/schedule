import React, { useEffect } from "react";
import { useContext } from "react";
import jwtDecode from "jwt-decode";
import { Redirect, useHistory } from "react-router-dom";
import moment from "moment";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import Todo from "./Todo";
import { getTodos } from "../services/todos";
import { Globalcontext } from "../context/GlobalState";
import "./Main.css";
import "reactjs-popup/dist/index.css";
import Top from "./pages/common/Top";
import { Button } from "@material-ui/core";

function Main() {
  const { setUser, todos, setTodos } = useContext(Globalcontext);
  const token = localStorage.getItem("token");
  let history = useHistory();

  useEffect(() => {
    const user = jwtDecode(token);
    setUser(user);
    setAllTodos(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const setAllTodos = async (token) => {
    await getTodos(token)
      .then((response) => {
        setTodos(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error.response);
        return error;
      });
  };

  const handleSubmit = () => {
    history.replace("/login");
    localStorage.removeItem("token");
  };

  return (
    <div className="main">
      <div className="main__top--display">
        <Top />
      </div>
      {token ? (
        <div className="main__todos">
          {todos.length === 0 ? (
            <h2 className="main__todos--empty">
              You Don't Have Todos Yet.. Add Some!
            </h2>
          ) : (
            todos.map((todo) => (
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

      <Button variant="contained" onClick={handleSubmit}>
        Logout
      </Button>
    </div>
  );
}

export default Main;
