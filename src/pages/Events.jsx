import React, { useState, useEffect } from "react";
import CreateEvent from "../components/CreateEvent";
import EventCards from "../components/EventCards";

import { AiFillPlusCircle } from "react-icons/ai";

import { getAdminId } from "../helpers/getAdminId.js";
import { buildUrl } from "../utils/buildUrl.js";

function Events() {
	const [isCreateEvent, setIsCreateEvent] = useState(false);
	const adminID = getAdminId();
	const [fetchData, setData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(true);

	const fetchEvents = async () => {
		setIsLoaded(false);
		try {
			await fetch(buildUrl(`/event/events/${adminID}`), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => setData(data.events));
			setTimeout(() => {
				setIsLoaded(true);
			}, 1500);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	return (
		<>
			<div className='w-full flex flex-col'>
				<div className="bg-primary w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/43/Woman_kayaking_on_a_turquoise_lake_%2851125937521%29.jpg')]">
					<h1 className='text-[#92B0F5]'>
						Dashboard/<span className='text-white font-semibold'>Events</span>
					</h1>
					<h1 className='text-4xl text-white font-bold'>Create an event now!</h1>
					<p className='text-white font-thin w-7/12 mt-4'>
						Let your community know the beauty of your local tourism by creating an
						event and let your tourists explore the hidden gems.
					</p>
				</div>
				<div className='mx-10 flex flex-col gap-8'>
					<div className='flex justify-between items-center mt-16'>
						<h1 className='font-extrabold text-5xl'>Events Created</h1>
						<button
							onClick={() => setIsCreateEvent(!isCreateEvent)}
							className='flex flex-row gap-4 items-center text-xl font-semibold place-self-end mr-10 bg-primary px-4 py-2 rounded-md text-white hover:bg-[#0032a8] duration-150'>
							<AiFillPlusCircle size={30} />
							Create Event
						</button>
					</div>
					<CreateEvent isCreateEvent={isCreateEvent} />
					<div className='grid grid-cols-3 gap-6 overflow-y-auto max-h-events customScroll'>
						<EventCards
							fetchData={fetchData}
							isLoaded={isLoaded}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Events;
