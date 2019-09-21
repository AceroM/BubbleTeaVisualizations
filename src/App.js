import React from 'react';
import Homepage from './pages/Homepage';
import Map from './pages/Map';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/map" component ={Map} /> 
    </Router>
  );
}

export default App;
