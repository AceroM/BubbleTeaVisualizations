import React, { Component } from 'react';
import BubbleCartoMap from '../../components/BubbleCartoMap';
import './Map.scss';

function Map({ location }) {
  return (
    <div>
      <h1>Bubble Tea Heatmap</h1>
      <BubbleCartoMap />
    </div>
  );
}

export default Map;
