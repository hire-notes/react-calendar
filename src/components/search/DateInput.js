import React from 'react';

const padZero = (num) => num>=10 ? ""+num : "0"+num;
const dateToInput = (date) => `${date.getFullYear()}-${padZero(date.getMonth()+1)}-${padZero(date.getDate())}`

export const DateInput = (props) => {
	return (
		<input type='date'
			className='date'
			value={`${dateToInput(props.date)}`}
			onChange={props.handleDateInput}
		/>
	)
}
