import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';


export const LocationInput = (props) => {
	const inputProps = {
		value: props.value,
		onChange: props.handleLocationInput,
		placeholder: 'Enter venue...'
	}

	const myStyles = {
		autocompleteContainer: {
			border: 'none',
			outline: 'none',
			boxShadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)'
		}
	}

	return <PlacesAutocomplete styles={myStyles} inputProps={inputProps} onSelect={props.handleLocationSelect} />
	
}