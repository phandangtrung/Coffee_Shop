import React from "react";
import "./App.css";
import Homepage from "./features/homepage/view";
import LoginPage from "./features/login/view";
import Product from "./features/product/view";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/product" component={Product} />
          <Route path="/" component={Homepage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
