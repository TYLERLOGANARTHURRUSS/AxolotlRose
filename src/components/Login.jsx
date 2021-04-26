import React, { useState, useEffect } from "react";
import axios from "axios";

const LogInForm = (props) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post("/login", { username: username, password: password })
      .then(function (response) {
          if (response) {
          props.login(true);          
        }
        
      })
      .catch((e) => setErrorMessage('Incorrect username or password! Try again!'));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          className="textField"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          className="textField"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input className="button" type="submit" value="Login" />
      {errorMessage && <div className="error"> {errorMessage} </div>}
    </form>
  );
};

export default LogInForm;
