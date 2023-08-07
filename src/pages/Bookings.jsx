import React, { useState, useEffect } from "react";
import { buildUrl } from "../utils/buildUrl.js";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { getAdminId } from "../helpers/getAdminId.js";
function Bookings() {
	const [event, setEvent] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);

	const adminID = getAdminId();

	const getEventOfAdmin = async () => {
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
					const eventsArr = data?.events?.map((item) => {
						return { value: item._id, label: item.eventName };
					});
					if (eventsArr) {
						setEvent(eventsArr);

						return;
					}
				});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		// (async () => {
		// 	await fetch(
		// 		buildUrl(`/event/get-bookers/64cf3a169099a0f34b9deef8`, {
		// 			method: "GET",
		// 			header: {
		// 				"Content-Type": "application/json",
		// 			},
		// 		})
		// 	).then(async (res) => {
		// 		const data = await res.json();
		// 		console.log(data);
		// 	});
		// })();

		getEventOfAdmin();
	}, []);

	return (
		<>
			<div className='w-full flex flex-col'>
				{/* <ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='light'
				/> */}
				<div
					className="bg-primary w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0 bg-[url('https://www.wearetravellers.nl/wp-content/uploads/Hier-houden-backpackers-van.jpg')]"
					style={{
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}>
					<h1 className='text-white'>
						Dashboard/<span className='text-white font-semibold'>Bookings</span>
					</h1>
					<h1 className='text-4xl text-white font-bold'>Monitor Bookings</h1>
					<p className='text-white font-thin w-7/12 mt-4'>
						Have a instant access of updates of your backpackers who booked your
						events. You can select a specific event to view the backpackers who booked
						it.
					</p>
				</div>
				<div className='mx-24 mt-4 flex justify-between items-center'>
					<h1 className='font-bold text-2xl'>Filter by Event</h1>
					<div className='flex gap-4 items-center'>
						<Dropdown
							className='focus:outline-none'
							options={event}
							onChange={(event) => setSelectedEvent(event.value)}
							placeholder='Select Event'
						/>
						<button className='bg-primary px-4 py-2 rounded-md font-bold text-white hover:bg-[#0032a8] duration-150'>
							Get Bookers
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Bookings;
