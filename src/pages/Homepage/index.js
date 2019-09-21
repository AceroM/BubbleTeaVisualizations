import React, { Component } from "react";
import "./Homepage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// // import Logo from "../../components/Logo";
// import BubbleTea from "../../components/BubbleTea";

class Homepage extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <div>
          <h1>Find Bubble Tea Place Near You</h1>
        </div>
        <div className="bmb-form-box">
          <div className="input-group">
            <span className="input-group-label">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            {/* <strong>Enter your location</strong> */}
            <input
              className="input-group-field"
              placeholder="Enter your location"
            />
          </div>
          <a href="/map/">
            <input
              type="submit"
              className="button primary white-color-text large"
              value="Go"
            />
          </a>
        </div>
        {/* <BubbleTea/> */}
      </div>
    );
  }
}
export default Homepage;
