import React from "react";
import "./App.css";
import MainRouter from "./Router/MainRouter";
import NoheaderRouter from "./Router/NoheaderRouter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" style={{ paddingBottom: "0px" }}>
      <Router>{MainRouter()}</Router>
    </div>
  );
}

export default App;
