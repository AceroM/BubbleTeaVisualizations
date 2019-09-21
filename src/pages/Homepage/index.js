import React, { Component } from "react";
import './Homepage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Homepage extends Component {
  constructor (){
    super();
  }
  render(){
    return (
      <div className="body-wrapper">
          <div className="grid-container">
            <a href="/"><img className="logo" src={"/bubble-tea.png"} alt ="logo"/></a>
          </div>
          <div className ="home-header-box">
            <div>
              <h1>Find Bubble Tea Place Near You</h1>
            </div>
          </div>
          <div className = "bmb-form-box">
            <div className = "input-group">
              <span className = "input-group-label"><FontAwesomeIcon icon={faSearch} /></span>
              {/* <strong>Enter your location</strong> */}
              <input className = "input-group-field" placeholder="Enter your location" />
            </div>
            <a href='/map'><input type="submit" className= "button primary white-color-text large"value="Go" /></a>
            
          </div>
      </div>
    )
  }
  
}
export default Homepage;