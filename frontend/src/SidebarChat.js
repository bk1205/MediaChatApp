import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateContext";

function SidebarChat({ user }) {
  return (
    <Link to={"/"}>
      <div className="sidebarChat">
        {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
        <div className="sidebarChat__info">
          <h2>{user}</h2>
          {/* <p>{messages[0]?.message}</p> */}
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
