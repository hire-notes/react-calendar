import React from 'react';
import {DateInput} from './DateInput';
import {LocationInput} from './LocationInput';

export const Search = (props) => {
	return (
		<div>
			<div className='location-area'>
			  <LocationInput
			    value = {props.name}
			    handleLocationInput={props.handleLocationInput}
			    handleLocationSelect={props.handleLocationSelect}
			  />
			</div>
		  <DateInput
		    handleDateInput={props.handleDateInput}
		    date={props.date}
		  />
		  <p style={{float: 'left', marginTop: '1rem'}}>
		    {props.length || "No"} events found
		  </p>
		</div>
	)
}
