import { Button, TextField } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import TwitterIcon from "@material-ui/icons/Twitter";
import { useState } from "react";
import { loginUser } from "../services/users";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    const res = await loginUser(newUser);

    const { data: jwt } = res;
    localStorage.setItem("token", jwt);
    if (res["request"]["status"] !== 200) {
      setError(res["request"]["response"]);
    } else {
      history.push("/home");
    }
  };

  return (
    <div className="login">
      <div className="login__head">
        <h1>Sign in to Account</h1>
      </div>
      {/* <div className="login__withSM">
        <div className="login__withSM--icon">
          <FacebookIcon />
        </div>
        <div className="login__withSM--icon">
          <LinkedInIcon />
        </div>
        <div className="login__withSM--icon">
          <TwitterIcon />
        </div>
      </div> 
      <p>or use your Email account</p>*/}
      <form action="#" className="login__form" onSubmit={handleSubmit}>
        <p className="register__form--error">{error}</p>
        <TextField
          label="Email"
          variant="outlined"
          className="login__withSM--input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className="login__withSM--input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Sign in
        </Button>
      </form>
      <div className="login__sign">
        <p>
          Don't have account?{" "}
          <span>
            <Link to="/register" className="link">
              Chick Here
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
