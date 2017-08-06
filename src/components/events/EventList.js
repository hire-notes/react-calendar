import React from 'react';
import {Event} from './Event';

export const EventList = (props) => {
  if (!props.events) {
    return ''
  }

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
