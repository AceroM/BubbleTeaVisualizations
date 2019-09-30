// Import React and ReactDOM
import React, { Component } from "react";

import { Map, TileLayer as Basemap } from "react-leaflet";
import carto from "@carto/carto.js";

const CARTO_BASEMAP =
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png";

class ExampleMap extends Component {
  state = {
    center: [40.758313915, -3.67774875],
    zoom: 11,
    checked: false
  };

  constructor(props) {
    super(props);

    this.cartoClient = new carto.Client({
      apiKey: "default_public",
      username: "rochoa"
    });
  }

  onCheck(e) {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    const { center, zoom } = this.state;

    return (
      <div>
        <h2>CARTO.js 4.0 ❤️ React</h2>

        <div>
          <label className="switch">
            <input
              type="checkbox"
              onClick={this.onCheck.bind(this)}
              checked={this.state.checked}
            />
            <span className="slider" />
          </label>
        </div>

        <Map center={center} zoom={zoom} style={mapStyles}>
          <Basemap attribution="" url={CARTO_BASEMAP} />

          {/* {this.state.checked ? (
            <Layer
              source={track_points.source}
              style={track_points.style}
              client={this.cartoClient}
            />
          ) : null} */}
        </Map>
      </div>
    );
  }
}

const mapStyles = {
  width: "90vw",
  height: "75vh",
  margin: "0 auto"
};

export default ExampleMap;
