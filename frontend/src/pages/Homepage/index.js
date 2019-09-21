import React, { Component } from 'react'
import './Homepage.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
// // import Logo from "../../components/Logo";

import LocationSearchInput from '../../components/LocationSearchInput'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  componentDidMount() {
    fetch('/yelp')
      .then(res => res.json())
      .then(data => console.log(data))
  }

  render() {
    return (
      <div className="home-wrapper">
        <div>
          <h1>Find Bubble Tea Places Near You</h1>
        </div>
        <div className="bmb-form-box">
          <div className="input-group">
            <span className="input-group-label">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <LocationSearchInput />
          </div>
          <input
            type="submit"
            placeholder="Enter your location"
            name="location"
            className="button primary white-color-text large"
            value="Go"
          />
        </div>
        <br />
        <br />
        <br />
      </div>
    )
  }
}
export default Homepage
