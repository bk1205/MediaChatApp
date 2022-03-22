import React, { useState } from "react";
import "./Login.css";
import { Button, Input } from "@mui/material";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateContext";

import { socket } from "./config";

function Login() {
  const [user, setUser] = useState("");
  const [{}, dispatch] = useStateValue();

  const signIn = (e) => {
    e.preventDefault();
    console.log(user + " joined");
    socket.emit("join", user);
    dispatch({ type: actionTypes.SET_USER, user: user });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/765px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to ChatApp</h1>
        </div>
        <Input
          type="text"
          name="user"
          placeholder="Enter your username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Button type="submit" onClick={signIn}>
          SignIn
        </Button>
      </div>
    </div>
  );
}

export default Login;
