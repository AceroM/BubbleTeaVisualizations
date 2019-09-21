import React, { Component } from "react";
import "./Homepage.scss";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// // import Logo from "../../components/Logo";
// import BubbleTea from "../../components/BubbleTea";
import LocationSearchInput from '../../components/LocationSearchInput';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
    }
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    });
}

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
            {/* <input
              className="input-group-field"
              placeholder="Enter your location"
              name="location"
              onChange={this.handleChange}
            /> */}
            <LocationSearchInput/>
          </div>
          <a href={`/map/${this.state.location}`}>
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
