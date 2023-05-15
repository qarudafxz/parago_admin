import React, { useState } from "react";

function EventCards({ fetchData }) {
	return (
		<>
			{fetchData &&
				fetchData.map((event) => {
					return (
						<div
							key={event._id}
							className='flex flex-col gap-3 p-10 shadow-2xl'>
							<h1 className='text-2xl font-semibold'>{event.eventName}</h1>
							<p className='text-xs'>{event.eventDesc}</p>
							<div className='flex flex-row gap-4'>
								<p>{event.price}</p>
								<p>{event.capacity}</p>
								{event.locations?.map((location) => {
									return (
										<div
											key={location._id}
											className='flex flex-row gap-2'>
											<p>{location.locName}</p>
											<p>{location.desc}</p>
											<p>{location.date}</p>
											<p>{location.time}</p>
										</div>
									);
								})}
							</div>
							<p>
								Date Created: {new Date(event?.dateCreated).toLocaleDateString("en-us")}
							</p>
						</div>
					);
				})}
		</>
	);
}

export default EventCards;
