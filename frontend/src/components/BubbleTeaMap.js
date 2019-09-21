import React, { Component } from 'react'
import Heatmap from './Heatmap'
import queryString from 'query-string'
import loading from '../static/loading.png'
const axios = require('axios')
// const { YELP_TOKEN, mapsKey } = require("../config.json");

class BubbleTeaMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // default lat lng to NYC BABY
      data: [],
    }
  }

  componentDidMount() {
    const values = queryString.parse(window.location.search)
    let data = []
    fetch(`/yelp?lat=${values.lat}&lng=${values.lng}`)
      .then(res => res.json())
      .then(businesses => {
        for (let i = 0; i < businesses.length; i++) {
          const latLng = {
            lat: businesses[i].coordinates.latitude,
            lng: businesses[i].coordinates.longitude,
          }
          data.push(latLng)
        }
        this.setState({
          data: data,
        })
      })
  }

  render() {
    const values = queryString.parse(window.location.search)
    const { data } = this.state
    return !!data.length ? (
      <Heatmap
        center={{ lat: values.lat, lng: values.lng }}
        zoom={12}
        positions={data}
      />
    ) : (
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={loading} />
      </div>
    )
  }
}

export default BubbleTeaMap
