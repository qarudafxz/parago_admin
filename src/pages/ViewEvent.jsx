import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";

function ViewEvent() {
	const { id } = useParams();
	const [event, setEvent] = useState({});

	const fetchEvent = async () => {
		try {
			await fetch(buildUrl(`/event/what-event/${id}`), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => setEvent(data.event));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchEvent();
	}, []);

	return (
		<>
			<div className='w-full p-14 flex flex-row gap-12'>
				<div className='flex flex-col gap-4 w-6/12'>
					<h1 className='font-extrabold text-5xl text-primary'>{event.eventName}</h1>
					<p className='w-full text-xl font-thin'>{event.eventDesc}</p>
					<p>{event.eventAddr}</p>
				</div>
				<div>
					<h1 className='text-5xl font-bold'>Locations and Itineraries</h1>
					{event.locations?.map((location) => {
						return (
							<div key={location._id}>
								<h1>{location.locName}</h1>
								<p>{location.desc}</p>
								<p>{location.date}</p>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default ViewEvent;
