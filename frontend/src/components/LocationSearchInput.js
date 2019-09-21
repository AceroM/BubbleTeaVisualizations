import React from 'react'
import { Redirect } from 'react-router-dom'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import '../pages/Homepage/Homepage.scss'

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '', isRedirect: false, lat: '', lng: '' }
  }

  handleChange = address => {
    this.setState({ address })
  }

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          isRedirect: true,
          lat: latLng.lat,
          lng: latLng.lng,
        })
      })
      .catch(error => console.error('Error', error))
  }

  render() {
    const { isRedirect } = this.state
    if (isRedirect) {
      const { lat, lng } = this.state
      const str = `/map?lat=${lat}&lng=${lng}`
      return <Redirect to={str} />
    }

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              className="input-group-field"
              placeholder="Enter your location"
              name="location"
              {...getInputProps({
                className: 'input-group-field',
                name: 'location',
                placeholder: 'Search Places ...',
                className: 'location-search-input input-group-field',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    )
  }
}

export default LocationSearchInput
