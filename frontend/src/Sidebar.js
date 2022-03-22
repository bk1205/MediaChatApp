import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import {
  DonutLarge,
  Chat,
  Search,
  MoreVert,
  Logout,
} from "@mui/icons-material";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateContext";
import { socket } from "./config";
import { actionTypes } from "./reducer";

const Sidebar = () => {
  const [{ user }, dispatch] = useStateValue();

  let [peer, setPeer] = useState("");

  useEffect(() => {
    socket.on("join", (users) => {
      let anotherUser = "";
      for (let [k, v] of Object.entries(users)) {
        if (k !== user) {
          anotherUser = k;
        }
      }
      setPeer(anotherUser);
      dispatch({ type: actionTypes.SET_PEER, peer: anotherUser });
    });
  }, []);

  const logout = (e) => {
    e.preventDefault();
    console.log(user + " left");
    socket.emit("leave", user);
    dispatch({ type: actionTypes.SET_PEER, user: null });
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {/* <Avatar src={user?.photoURL} /> */}
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
          <IconButton onClick={logout} type="submit">
            <Logout />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <Search />
          <input type="text" name="" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        <div className="sidebar__chatsHeading">
          <SidebarChat user={peer} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
