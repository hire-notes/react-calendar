import React from 'react';
import Moment from 'moment';

export const Event = (props) => {

	// Ticketmaster events have a url property, but Facebook events don't, so
	// we want to hardcode the Facebook event url if props.url === undefined
	const url = props.url || `https://www.facebook.com/events/${props.id}`;

	return (
		<div className='card_cont'>
			<div className='card_img' style={{backgroundImage: 'url('+props.coverPicture+')'}}>
			</div>
			<div className='card_text'>
				<div className='card_text-inner'>
					<p>
						{Moment(props.startTime).format('MMMM Do YYYY')}
						<a href={url}
							target='_blank'> via {props.source.toUpperCase()}
						</a>
					</p>
					<p>
						{props.venue.name}
					</p>
					<h1>
						{props.name}
					</h1>
					{props.stats && <p>
						{props.stats.attending} attending
					</p>}
					{props.stats && <p>
						{props.stats.maybe} maybes
					</p>}
					{(props.priceMin || props.priceMax) && <p>
						${props.priceMin}-${props.priceMax}
					</p>}
				</div>
			</div>
		</div>
	)
}
