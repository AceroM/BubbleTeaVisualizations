import React, { useRef } from 'react'
import './BubbleTea.scss'
import * as d3 from 'd3'

import Bubbles from './Bubbles'

import milk from '../../static/milk.svg'
import data from './data.json'

function BubbleTea() {
  return (
    <>
      <div className="bubble">
        <div className="bubble">
          <img className="milk" src={milk} />
          <div className="bubbles-container">
            {/* <Bubbles data={data} /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default BubbleTea
