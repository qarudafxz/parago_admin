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
							</div>
							<p></p>
						</div>
					);
				})}
		</>
	);
}

export default EventCards;
