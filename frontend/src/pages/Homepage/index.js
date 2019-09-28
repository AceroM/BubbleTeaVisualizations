import React, { Component } from 'react'
import './Homepage.scss'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
// // import Logo from "../../components/Logo";
// import Card from '../../components/BubbleCard'

import LocationSearchInput from '../../components/LocationSearchInput'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      err: '',
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  setErr = err => {
    this.setState({ err })
  }

  componentDidMount() {}

  render() {
    const { err } = this.state
    return (
      <div className="home-wrapper">
        <div>
          <h1>Find Bubble Tea Places Near You</h1>
          {err && <h1 style={{ color: 'red' }}>{err}</h1>}
        </div>
        <div className="bmb-form-box">
          <div className="input-group">
            <span className="input-group-label">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <LocationSearchInput setErr={this.setErr} />
          </div>
          <input
            type="submit"
            placeholder="Enter your location"
            name="location"
            className="button primary white-color-text large"
            value="Go"
          />
        </div>
        {/* <Card title="testing" description="this" /> */}
      </div>
    )
  }
}
export default Homepage
