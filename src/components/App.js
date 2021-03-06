import React, {Component} from 'react';
import{Header} from './header/Header';
import {Search} from './search/Search';
import {EventList} from './events/EventList';
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import '../App.css';
import {getEvents} from '../services/eventsService';


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

  // store a provided array of events in the component's state
  loadEvents = (events, source) => {
    const foundEvents = this.state.foundEvents;
    foundEvents[source || this.state.activeSource] = events;

    this.setState({
      foundEvents: foundEvents
    });
  }

  // reset foundEvents state and fetch new events based on location, date, and the event source
  runEventService = () => {
    this.setState({
      foundEvents: {
        facebook: [],
        ticketmaster: []
      }
    }, () => {
    getEvents(this.state.place.lat, this.state.place.lng, this.state.date, this.state.activeSource)
      .then(evts => {
        this.loadEvents(evts);
      })
    });
  }

  // update the activeSource state and fetch new events if necessary
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

  // store a provided address in the component's state
  handleLocationInput = (address) => {
    //evt.preventDefault();
    const newPlace = this.state.place;
    newPlace.name = address;

    this.setState({
      place: newPlace
    });
  }

  // geocode and store a provided address and fetch new events
  handleLocationSelect = (address, placeId) => {
    const newPlace = this.state.place;
    newPlace.name = address;
    newPlace.placeId = placeId;

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

  // generate and store a date object from form input, then fetch new events
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
          <Header activeSource={this.state.activeSource} setSource={this.setSource} />
          <Search
            name={this.state.place.name}
            date={this.state.date}
            length={this.state.foundEvents[this.state.activeSource].length}
            handleLocationInput={this.handleLocationInput}
            handleLocationSelect={this.handleLocationSelect}
            handleDateInput={this.handleDateInput}
          />
          <EventList events={this.state.foundEvents} src={this.state.activeSource} />
        </div>
      </div>
    )
  }
}

export default App;
