import React from 'react'
import Stateastics from '../../static/stateastics.png'
import './Logo.scss'

function Logo() {
  return (
    <div className="grid-container">
      <a href="/">
        <img className="logo" src={Stateastics} alt="logo" />
      </a>
    </div>
  )
}

export default Logo
