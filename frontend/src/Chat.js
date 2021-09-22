import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import "./Chat.css";
import axios from "./axios";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "Sim",
      timestamp: "Just Now",
      received: true,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((msg) => (
          <p className={`chat_message ${msg.received && "chat_receiver"}`}>
            <span className="chat_name">{msg.name}</span>
            {msg.message}
            <span className="chat_timestamp">{msg.timestamp}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
