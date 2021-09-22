import React from "react";
import "./Sidebar.css";
import SidebarChats from "./SidebarChats";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, IconButton } from "@mui/material";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src="https://cn.i.cdn.ti-platform.com/cnapac/content/336/showpage/the-amazing-world-of-gumball/sa/showicon.png" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
      </div>
    </div>
  );
};

export default Sidebar;
