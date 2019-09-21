import React, { Component } from 'react';
import Heatmap from './Heatmap';
import queryString from 'query-string';

const axios = require("axios");
const { mapsKey } = require("../config.json");

class BubbleTeaMap extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            // default lat lng to NYC BABY
            lat: 40.7127753,
            lng: -74.0059728,
            data: [
                { lat: 37.782551, lng: -122.44536800000003 },
                { lat: 37.782745, lng: -122.44458600000002 },
                { lat: 37.782842, lng: -122.44368800000001 },
            ]
        }
    }

    componentDidMount() {
        const values = queryString.parse(window.location.search);
        this.setState ({
            lat: values.lat,
            lng: values.lng
        });
      }

    render() {
        return (
            <Heatmap 
                center={{ lat: this.state.lat, lng: this.state.lng }}
                zoom={14}
                positions={this.state.data} 
            />
        )
    }
}

export default BubbleTeaMap;