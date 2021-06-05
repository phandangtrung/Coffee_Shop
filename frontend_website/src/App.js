import React from "react";
import "./App.css";
import MainRouter from "./Router/MainRouter";
import NoheaderRouter from "./Router/NoheaderRouter";
import KommunicateChat from "./chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Chatbot from "react-chatbot-kit";

function App() {
  return (
    <>
      <div className="App" style={{ paddingBottom: "0px" }}>
        <Router>{MainRouter()}</Router>
      </div>
      <KommunicateChat />
    </>
  );
}

export default App;
