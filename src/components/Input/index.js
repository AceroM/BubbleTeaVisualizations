import React, { useState } from 'react'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './Input.scss';

export default function Input({ text }) {
  return (
    <div className="input-group">
      <span className="input-group-label">
        <input value={text} name="location" class="input-group-field" placeholder="Your Location" required="" />
      </span>
    </div>
  )
}
