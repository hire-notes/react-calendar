const express = require('express');
const router = express.Router();
const http = require('https');
const Geohash = require('latlon-geohash');
const rp = require('request-promise');
const tmroot = 'https://app.ticketmaster.com/discovery/v2/';
const TMKEY = process.env.TM_CLIENT;

const padZero = (num) => num>=10 ? ""+num : "0"+num;
const dateToTM = (date) => `${date.getFullYear()}-${padZero(date.getMonth()+1)}-${padZero(date.getDate())}T00:00:00Z`

const getTM = (req, res) => {
	//encode lat and lng as geohash
	const geoHash = Geohash.encode(req.query.lat,req.query.lng);
	var options = {
		uri: `${ tmroot }events.json`,
		qs: {
			apikey: TMKEY,
			geoPoint: geoHash.substring(0,9),
			sort: 'distance,asc',
			radius: Math.round(0.001*req.query.distance) || 1,
			unit: 'km',
			startDateTime: dateToTM(new Date(req.query.since*1000)),
			endDateTime: dateToTM(new Date(req.query.until*1000))
		},
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	};

	console.log(options.qs);

	rp(options)
	.then(function (events) {
		console.log(events._embedded.events);
		const tmEvents = events._embedded.events
		.filter((evt) => evt.distance <= 0.001*req.query.distance)
		.map((evt) => {
			const plusEv = {
				url: evt.url,
				coverPicture: evt.images[0].url,
				startTime: evt.dates.start.dateTime,
				venue: {
					name: (evt.place && evt.place.name) || (evt.promoter && evt.promoter.name)
				},
				name: evt.name,
				priceMin: evt.priceRanges && evt.priceRanges[0].min,
				priceMax: evt.priceRanges && evt.priceRanges[0].max
			};
			return plusEv;
		});
		console.log('tmEvents ', tmEvents);
		res.status(200).end(JSON.stringify(tmEvents));
	})
	.catch(function (err) {
		console.log(err);
		res.status(400).end(JSON.stringify(err))
	});
}

//

router.get('/', getTM);
module.exports = router;
