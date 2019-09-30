import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Homepage.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// // import Logo from "../../components/Logo";
// import Card from '../../components/BubbleCard'

// import LocationSearchInput from '../../components/LocationSearchInput'

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      latitude: "",
      longitude: "",
      isRedirect: false,
      err: ""
    };
  }

  handleLocationSearch = location => {
    fetch(`/location/${location}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        const { latitude, longitude } = data;
        this.setState({ latitude, longitude });
        this.setState({ isRedirect: true });
      })
      .catch(err => {
        this.setState({ err: JSON.stringify(err) });
      });
  };

  setErr = err => {
    this.setState({ err });
  };

  render() {
    const { err, location, latitude, longitude, isRedirect } = this.state;
    if (isRedirect) {
      const str = `/map?lat=${latitude}&lng=${longitude}&place=${location}`;
      return <Redirect to={str} />;
    }
    return (
      <div className="home-wrapper">
        <div>
          <h1>Find Bubble Tea Places Near You</h1>
          {err && <h1 style={{ color: "red" }}>{err}</h1>}
        </div>
        <div className="bmb-form-box">
          <div className="input-group">
            <span className="input-group-label">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              value={location}
              onChange={e => {
                this.setState({ location: e.target.value });
              }}
            />
            <button onClick={() => this.handleLocationSearch(location)}>
              GO
            </button>
            {/* <LocationSearchInput setErr={this.setErr} /> */}
          </div>
          {/* <input
            type="submit"
            placeholder="Enter your location"
            name="location"
            className="button primary white-color-text large"
            value="Go"
          /> */}
        </div>
        {/* <Card title="testing" description="this" /> */}
      </div>
    );
  }
}
export default Homepage;
