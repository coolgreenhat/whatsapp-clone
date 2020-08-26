import React, { useState, useEffect } from 'react';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { useParams } from "react-router-dom";
import { db } from "../firebase";

function Chat() {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
      .doc(roomId)
      .onSnapshot((snapshot) => setRoomName
      (snapshot.data().name));
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('You typed >>> ', input);
    // setInput("");
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${(Math.floor(Math.random()* 5000))}.svg`} />
        
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last Seen at....</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className={`chat__message ${true &&'chat__receiver'}`}>
        <span className="chat__name">
            Jone Doe
          </span>
          Hey Guys
          <span className="chat__timestamp">
            3.52pm
          </span>
        </p>
        <p className="chat__message">
          Hey Guys
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
          value={input}
          onChange={(e) => 
          setInput(e.target.value)}
          placeholder="Type a message"
          type="text"/>
          <button 
          onClick={sendMessage}
          type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat;
