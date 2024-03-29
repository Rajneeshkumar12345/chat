import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);



  console.log(messageList, "daaaaaaaaaa")

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: username,
        content: currentMessage,
        createdAt: new Date(),
        // new Date(Date.now()).getHours() +
        // ":" +
        // new Date(Date.now()).getMinutes(),
      };
      console.log(messageData, "hiiii")
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     setMessageList((list) => [...list, data]);
  //   });
  //   return () => {
  //     socket.off("receive_message");
  //   };
  // }, [socket]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const messageData = {
        ...data,
        timestamp: new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      setMessageList((list) => [...list, messageData]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/chat_history/${room}`);
        const data = await res.json();
        setMessageList(data);
      } catch (error) {
        console.log("Data Fetching Problem", error);
      }
    }
    fetchData();

    socket.on("receive_message", (data) => {
      if (data.room === room) {
        const messageData = {
          ...data,
          createdAt: data.createdAt
        };
        setMessageList((list) => [...list, messageData]);
      }
      // console.log(socket.on("receive_message"), "HIIIIII");
    });
    
    return () => {
      socket.off("receive_message");
    }
  }, [room, socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent) => {
            console.log();
            return (
              <div
                className="message"
                id={username === messageContent.sender ? "you" : "other"}
                key={messageContent.content}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.content}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{new Date(messageContent.createdAt).getHours() + ":" + new Date(messageContent.createdAt).getMinutes()}</p>
                    <p id="author">{messageContent.sender}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;