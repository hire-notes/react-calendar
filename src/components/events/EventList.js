import React from 'react';
import {Event} from './Event';

export const EventList = (props) => {
  
  // if the API call returns no results, just return an empty string
  if (!props.events) {
    return ''
  }

  // generate a different array of Events depending on the src
  let events = props.events[props.src].map((event) => {
    return (
      <Event
        key={event.id}
        source={props.src}
        {...event}
      />
    )
  });

  return (
    <div className='event-area'>
      <div>
        {events}
      </div>
    </div>
  )
}
