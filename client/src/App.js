import useDarkMode from "use-dark-mode";
// import Switch from "react-switch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import Left from "./componets/Left";
import Main from "./componets/Main";
import Right from "./componets/Right";
import Login from "./componets/Login";
import Register from "./componets/Register";
// import Welcome from "./services/pages/Welcome";
import "./App.css";
import TodoDetail from "./componets/pages/todo/TodoDetail";
import PinnedTodos from "./componets/pages/todo/PinnedTodos";

function App() {
  const {
    value,
    //  toggle, enable, disable
  } = useDarkMode();

  return (
    <div className="app">
      <GlobalProvider>
        <Router>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Left dark={value} />
              <Main />
              <Right dark={value} />
            </Route>
            <Route path="/pinnedTodos">
              <PinnedTodos />
            </Route>
            <Route path="/todoDetail">
              <TodoDetail />
            </Route>
            <Route path="/">
              <Register />
            </Route>
          </Switch>
        </Router>
      </GlobalProvider>
      {/* Current Mode is <b>{value ? "Dark" : "Light" }</b>
      <Switch heigth={20} width={40} className="switch" onColor="#8e44ad" offColor="#777" onChange={toggle} checked={value} /> */}
      {/* left */}
      {/* main */}
      {/* right */}
      {/* {console.log(value)} */}
      {/* <div className="box">Box</div> */}
      {/* <div className="box2">Box</div> */}
      {/* <div className="box3">Box</div> */}
    </div>
  );
}

export default App;
