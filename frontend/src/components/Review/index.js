import React from 'react';
import styled from 'styled-components';
import './Review.scss';

const Review = ({ rating, text, time_created, name, image_url }) => {
  return (
    <div className="rating">
      <div className="profile">
        <img className="profile-image" src={image_url} alt={name} />
        <h3> {name} </h3>
      </div>
      <p> rating: {rating} </p>
      <p>{text} </p>
    </div>
  );
};

export default Review;
