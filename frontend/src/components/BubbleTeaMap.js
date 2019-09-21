import React, { Component } from 'react';
import Heatmap from './Heatmap';
import queryString from 'query-string';
const axios = require("axios");
const { YELP_TOKEN, mapsKey } = require("../config.json");
const baseUrl = "https://api.yelp.com/v3";
const term = encodeURIComponent("Bubble Tea");
const config = {
    headers: { Authorization: "bearer " + YELP_TOKEN }
  };
const latitude = "40.730610";
const longitude = "-73.935242";

class BubbleTeaMap extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            // default lat lng to NYC BABY
            lat: 40.7127753,
            lng: -74.0059728,
            data: [ { lat: 40.72767, lng: -73.95269 },
                { lat: 40.74782, lng: -73.94769 },
                { lat: 40.716693778273, lng: -73.959176056087 },
                { lat: 40.75904, lng: -73.92631 },
                { lat: 40.7293798341543, lng: -74.0012164783664 },
                { lat: 40.71977, lng: -73.956 },
                { lat: 40.7497805, lng: -73.9415148 },
                { lat: 40.720657, lng: -73.984542 },
                { lat: 40.71938, lng: -73.98882 },
                { lat: 40.7086323296893, lng: -73.9579670503736 },
                { lat: 40.7658014094971, lng: -73.9191635864046 },
                { lat: 40.7226, lng: -74.004 },
                { lat: 40.701784884781, lng: -73.9231627061963 },
                { lat: 40.726534, lng: -73.9907736 },
                { lat: 40.711205, lng: -73.944072 },
                { lat: 40.7432094, lng: -73.8830931 },
                { lat: 40.73306, lng: -73.98589 },
                { lat: 40.74246, lng: -73.91912 },
                { lat: 40.717151, lng: -73.998231 },
                { lat: 40.74315, lng: -73.95426 },
                { lat: 40.76252, lng: -73.91641 },
                { lat: 40.6998901367188, lng: -73.9121780395508 },
                { lat: 40.71411, lng: -73.96098 },
                { lat: 40.72965, lng: -74.00092 },
                { lat: 40.7457553530764, lng: -73.9070381725156 },
                { lat: 40.7523752091444, lng: -73.98557536304 },
                { lat: 40.72136, lng: -73.99675 },
                { lat: 40.71897, lng: -74.00102 },
                { lat: 40.761702, lng: -73.918496 },
                { lat: 40.72102, lng: -73.98864 },
                { lat: 40.71127, lng: -73.95761 },
                { lat: 40.6650377515107, lng: -73.9798863371133 },
                { lat: 40.7292878143919, lng: -73.9909341307257 },
                { lat: 40.77258, lng: -73.95903 },
                { lat: 40.757323090934, lng: -73.9202260477152 },
                { lat: 40.73982, lng: -73.98587 },
                { lat: 40.7453041, lng: -73.9031929 },
                { lat: 40.77185, lng: -73.9237799 },
                { lat: 40.7475304, lng: -73.9030796 },
                { lat: 40.74766, lng: -73.98642 },
                { lat: 40.74586, lng: -73.8906 },
                { lat: 40.73882, lng: -73.99972 },
                { lat: 40.7551628731681, lng: -73.9885599911213 },
                { lat: 40.70728, lng: -73.94509 },
                { lat: 40.732567, lng: -73.986229 },
                { lat: 40.73014, lng: -73.9941599 },
                { lat: 40.7602119445801, lng: -73.9696807861328 },
                { lat: 40.722714, lng: -73.989102 },
                { lat: 40.7782207169156, lng: -73.98114525698 },
                { lat: 40.76002, lng: -73.91851 } ]
        }
    }

    componentDidMount() {
        const values = queryString.parse(window.location.search);
        this.setState ({
            lat: values.lat,
            lng: values.lng
        });
        // axios.get(
        //     `${baseUrl}/businesses/search?term=${term}&latitude=${latitude}&longitude=${longitude}&limit=50`,
        //     config
        // ).then(function(response){
        //     console.log(response)
        // })
        // let businesses = [];
        // businesses.push(store.data.businesses);
        // businesses = businesses.flat();
        
      }

    render() {
        return (
            <Heatmap 
                center={{ lat: this.state.lat, lng: this.state.lng }}
                zoom={12}
                positions={this.state.data} 
            />
        )
    }
}

export default BubbleTeaMap;