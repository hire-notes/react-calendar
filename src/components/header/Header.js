import React from 'react';

export const Header = (props) => {
  return(
    <div>
      <h1 style={{fontSize: '3rem', marginBottom: '0.33rem'}}>
        Search {props.activeSource.toUpperCase()} event data
      </h1>
      <p style={{fontSize: '1.5rem', marginBottom: '1rem'}}>
        View attendance for other events that week
      </p>
      {props.activeSource == 'facebook' && <p style={{fontSize: '1rem', marginBottom: '1rem'}}>
        Want to view pricing information? <a onClick={() => props.setSource('ticketmaster')}>Search Ticketmaster</a>
      </p>}
      {props.activeSource == 'ticketmaster' && <p style={{fontSize: '1rem', marginBottom: '1rem'}}>
        Want to view attendance information? <a onClick={() => props.setSource('facebook')}>Search Facebook</a>
      </p>}
    </div>
  )
}
