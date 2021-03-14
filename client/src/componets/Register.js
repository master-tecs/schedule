import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Register.css";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import TwitterIcon from "@material-ui/icons/Twitter";
import { useEffect } from "react";
import { registerUsers } from "../services/users";

// const styles = (theme) => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },

//   cssLabel: {
//     color: "green",
//   },

//   cssOutlinedInput: {
//     "&$cssFocused $notchedOutline": {
//       borderColor: `${theme.palette.primary.main} !important`,
//     },
//   },

//   cssFocused: {},

//   notchedOutline: {
//     borderWidth: "1px",
//     borderColor: "green !important",
//   },
// });

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  useEffect(() => {
    // registerUsers();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newUSer = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    const res = await registerUsers(newUSer);

    if (res["request"]["status"] !== 200) {
      setError(res["request"]["response"]);
    } else {
      localStorage.setItem("token", res.headers["x-auth-token"]);
      history.push("/home");
    }
  };

  return (
    <div className="register">
      <div className="register__head">
        <h1>Create an Account</h1>
      </div>
      {/* <div className="register__withSM">
        <div className="register__withSM--icon">
          <FacebookIcon />
        </div>
        <div className="register__withSM--icon">
          <LinkedInIcon />
        </div>
        <div className="register__withSM--icon">
          <TwitterIcon />
        </div>
      </div>
      <p>or use your Email account</p> */}
      <form action="#" className="register__form" onSubmit={handleSubmit}>
        <p className="register__form--error">{error}</p>
        <TextField
          label="Fullname"
          variant="outlined"
          className="register__withSM--input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Username"
          variant="outlined"
          className="register__withSM--input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          className="register__withSM--input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className="register__withSM--input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Sign up
        </Button>
      </form>
      <div className="register__sign">
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/login" className="link">
              Chick Here
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
