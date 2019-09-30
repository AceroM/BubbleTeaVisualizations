import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Map from "./pages/Map";

import Logo from "./components/Logo";
// import Logo from "../../components/Logo";
// import BubbleTea from "../../components/BubbleTea";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <div className="body-wrapper">
        <Logo />
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/map/:location" component={Map} />
            <Route path="/map" component={Map} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
