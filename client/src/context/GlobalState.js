import { createContext, useReducer } from "react";
import { putTodos } from "../services/todos";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  user: {},
  todos: [],
  viewTodo: {},
  error: "",
  token: localStorage.getItem("token"),

  // watched: localStorage.getItem("watched")
  //   ? JSON.parse(localStorage.getItem("watched"))
  //   : [],
};

// create context
export const Globalcontext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // useEffect(() => {
  //   localStorage.setItem("viewProduct", JSON.stringify(state.viewProduct));
  //   // localStorage.setItem("watched", JSON.stringify(state.watched));
  // }, [state]);

  // actions
  // const setNewVeiwProdeuct = (data) => {
  //   dispatch({
  //     type: "SET_NEW_VIEW_PRODUCT",
  //     payload: data,
  //     items: state.itemsInCard,
  //   });
  // };

  const setUser = (data) => {
    dispatch({
      type: "SET_USER",
      payload: data,
    });
  };

  const setTodos = (data) => {
    dispatch({
      type: "SET_TODOS",
      payload: data,
    });
  };

  const addNewtodo = (data) => {
    dispatch({
      type: "ADD_NEWTODO",
      payload: data,
    });
  };

  const setViewtodo = (id) => {
    const todos = state.todos.filter((el) => el._id === id);
    const todo = todos[0];
    dispatch({
      type: "SET_VIEWTODO",
      payload: todo,
    });
  };

  const updateTodo = async (data) => {
    const todos = state.todos;
    const index = state.todos.findIndex((todo) => todo._id === data._id);

    const newTodos = todos.filter((el) => el._id !== data._id);
    newTodos.splice(index, 0, data);

    const res = await putTodos(data._id, data, state.token);
    if (res["request"]["status"] !== 200) {
      alert("Something went wrong!");
    }
    dispatch({
      type: "UPDATE_TODO",
      payload: newTodos,
    });
  };

  const changeComplete = async (id) => {
    const todo = state.todos.filter((el) => el._id === id);
    const index = state.todos.findIndex((todo) => todo._id === id);

    const newTodo = {
      ...todo[0],
    };
    newTodo["completed"] = !todo[0].completed;

    const res = await putTodos(id, newTodo, state.token);
    if (res["request"]["status"] !== 200) {
      console.log(res);
      alert("Something went wrong!");
    }
    const todos = state.todos.filter((el) => el._id !== newTodo._id);
    todos.splice(index, 0, newTodo);
    dispatch({
      type: "CHANGE_COMPLETED",
      payload: todos,
    });
  };

  const setError = (data) => {
    dispatch({
      type: "SET_ERROR",
      payload: data,
    });
  };

  const removeItemFromCard = (product) => {
    dispatch({ type: "REMOVE_ITEM_FROM_CARD", payload: product });
  };

  return (
    <Globalcontext.Provider
      value={{
        user: state.user,
        todos: state.todos,
        viewTodo: state.viewTodo,
        token: state.token,
        error: state.error,
        setTodos,
        setUser,
        setError,
        setViewtodo,
        addNewtodo,
        updateTodo,
        changeComplete,
        removeItemFromCard,
      }}
    >
      {props.children}
    </Globalcontext.Provider>
  );
};
