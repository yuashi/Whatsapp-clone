import React from "react";
import "./SidebarChats.css";
import { Avatar } from "@mui/material";

const SidebarChats = () => {
  return (
    <div className="sidebarChats">
      <Avatar />
      <div className="sidebarChats_info">
        <h2>Room name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
};

export default SidebarChats;
