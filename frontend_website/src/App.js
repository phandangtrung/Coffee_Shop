import React, { useEffect } from "react";
import "./App.css";
import MainRouter from "./Router/MainRouter";
import NoheaderRouter from "./Router/NoheaderRouter";
import { Chat, addResponseMessage } from "react-chat-popup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Chatbot from "react-chatbot-kit";
import chatlogo from "./chatlogo.jpg";
function App() {
  useEffect(() => {
    addResponseMessage("Chào Bạn! Mình giúp gì được cho bạn nè.");
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
    // addResponseMessage(response);
  };
  return (
    <>
      <div className="App" style={{ paddingBottom: "0px" }}>
        <Router>{MainRouter()}</Router>
      </div>
      <Chat
        profileAvatar={chatlogo}
        title="CoffeeShop Chat"
        subtitle="Cà phê ngon nhất Sài Gòn"
        senderPlaceHolder="Gửi câu hỏi cho CoffeeShop"
        handleNewUserMessage={handleNewUserMessage}
        showCloseButton={true}
      />
    </>
  );
}

export default App;
