import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { buildUrl } from "../utils/buildUrl.js";
import { getAdminId } from "../helpers/getAdminId.js";

import { RiCalendarEventFill } from "react-icons/ri";

const localizer = momentLocalizer(moment);

function EventCalendar() {
	const [myEventList, setMyEventList] = useState([]);
	const adminID = getAdminId();

	const fetchEvents = async () => {
		try {
			await fetch(buildUrl(`/event/events/${adminID}`), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setMyEventList(
						data.events.map((event) => {
							return {
								title: event.eventName,
								start: new Date(event.dateStart),
								end: new Date(event.dateEnd),
							};
						})
					);
				});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchEvents();

		document.title = "Calendar | Parago Admin";
	}, []);

	return (
		<div className='w-full'>
			<div className='bg-primary w-full h-56 p-16 flex flex-col gap-2 shadow-2xl'>
				<div className='flex justify-between'>
					<div>
						<h1 className='text-[#92B0F5]'>
							Dashboard/
							<span className='text-white font-semibold'>Event Calendar</span>
						</h1>
						<h1 className='text-4xl my-2 text-white font-bold'>
							View all of your date events here!
						</h1>
						<p className='text-white font-thin w-7/12'>
							Stay organized and never miss a beat by utilizing a calendar to keep
							track of the timeline for all the events you've created.
						</p>
					</div>
					<RiCalendarEventFill className='text-white text-9xl bg-secondary p-2 rounded-xl' />
				</div>
			</div>
			<div className='grid place-items-center mt-8'>
				<Calendar
					localizer={localizer}
					events={myEventList}
					startAccessor='start'
					endAccessor='end'
					className='p-10 bg-white rounded-md shadow-2xl text-xs font-thin'
					style={{
						height: window.innerWidth >= 1020 && window.innerWidth < 1620 ? 500 : 700,
						width: window.innerWidth >= 1020 && window.innerWidth < 1620 ? 900 : 1200,
					}}
				/>
			</div>
		</div>
	);
}

export default EventCalendar;
