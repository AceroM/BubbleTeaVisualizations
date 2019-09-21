import React, { Component } from "react";
import Logo from '../../components/Logo';
import queryString from 'query-string'
import './Map.scss';

class Map extends Component{

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    
  }
  render(){
    return(
      <div className="body-wrapper">
        <Logo/>
        <h1>hello</h1>
      </div>
    )
  }
}
export default Map;