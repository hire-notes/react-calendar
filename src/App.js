import React, { Component } from 'react';
import {Search} from './components/search';
import {Event} from './components/events/event';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './App.css';
import {getEvents} from './services/eventsService';


class App extends Component {
  state = {
    place: {
      name: '',
      placeId: '',
      lat: 0,
      lng: 0
    },
    activeSource: 'facebook',
    date: new Date(),
    foundEvents: {
      facebook: [],
      ticketmaster: []
    }
  }

  loadEvents = (events, source) => {
    const foundEvents = this.state.foundEvents;
    foundEvents[source || this.state.activeSource] = events;

    this.setState({
      foundEvents: foundEvents
    });
  }

  runEventService = () => {
    this.setState({
      foundEvents: {
        facebook: [],
        ticketmaster: []
      }
    }, () => {
    getEvents(this.state.place.lat,this.state.place.lng,this.state.date, this.state.activeSource)
      .then(evts => {
        this.loadEvents(evts);
      })
    });
  }

  setSource = (source) => {
    let reqUpdate = false;
    if (this.state.foundEvents[this.state.activeSource].length) {
      reqUpdate = true;
    }
    this.setState({
      activeSource: source
    }, () => {
      if (reqUpdate) {
        this.runEventService();
      }
    });
  }

  handleLocationInput = (address) => {
    //evt.preventDefault();
    const newPlace = this.state.place;
    newPlace.name = address;

    this.setState({
      place: newPlace
    });
  }

  handleLocationSelect = (address, placeId) => {
    const newPlace = this.state.place;
    newPlace.name = address;
    newPlace.placeId=placeId;

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        newPlace.lat = latLng.lat;
        newPlace.lng = latLng.lng;
        this.setState({
          place: newPlace
        });
      })
      .then(() => this.runEventService())
      .catch(e => console.log('error',e))
  }

  handleDateInput = (evt) => {
    evt.preventDefault();
    const newDate = new Date(evt.target.value);

    this.setState({
      date: newDate
    }, () => this.runEventService())
  }

  render() {
    return (
      <div className="main">
        <div className='search-area'>
          <h1 style={{fontSize: '3rem', marginBottom: '0.33rem'}}>
            Search {this.state.activeSource.toUpperCase()} event data
          </h1>
          <p style={{fontSize: '1.5rem', marginBottom: '1rem'}}>
            View attendance for other events that week
          </p>
          {this.state.activeSource=='facebook' && <p style={{fontSize: '1rem', marginBottom: '1rem'}}>
            Want to view pricing information? <a onClick={() => this.setSource('ticketmaster')}>Search Ticketmaster</a>
          </p>}
          {this.state.activeSource=='ticketmaster' && <p style={{fontSize: '1rem', marginBottom: '1rem'}}>
            Want to view attendance information? <a onClick={() => this.setSource('facebook')}>Search Facebook</a>
          </p>}
          <Search
            name={this.state.place.name}
            date={this.state.date}
            length={this.state.foundEvents[this.state.activeSource].length}
            handleLocationInput={this.handleLocationInput}
            handleLocationSelect={this.handleLocationSelect}
            handleDateInput={this.handleDateInput}
          />
        
        {
          this.state.foundEvents.facebook.length ? (
            <div className='event-area'>
              <div>
                {this.state.foundEvents.facebook.map((evt) => (
                  <Event
                    url={`https://www.facebook.com/events/${evt.id}`}
                    source='facebook'
                    {...evt} 
                  />
                ))}
              </div>
            </div>
          ) : ''
        }

        {
          this.state.foundEvents.ticketmaster.length ? (
            <div className='event-area'>
              <div>
                {this.state.foundEvents.ticketmaster.map((evt) => (
                  <Event
                    source='ticketmaster'
                    {...evt}
                  />
                ))}
              </div>
            </div>
          ) : ''
        }
      </div>
      </div>
    );
  }
}

export default App;
