const eventsPath = '/api';

export const getEvents = (lat, lng, time, source) => {
	return fetch(`${eventsPath}/${source}
		?lat=${lat}
		&lng=${lng}
		&distance=100
		&sort=time
		&since=${Math.round(time.getTime()/1000 - 60*60*24*3)}
		&until=${Math.round(time.getTime()/1000 + 60*60*24*3)}`).then((res) => res.json())
}
