import { useState, useEffect } from "react";
import { buildUrl } from "../utils/buildUrl.js";
import Dropdown from "react-dropdown";
import { ToastContainer } from "react-toastify";
import "react-dropdown/style.css";
import { toaster } from "../helpers/toaster.js";
import { getAdminId } from "../helpers/getAdminId.js";
import { RiUserSmileLine } from "react-icons/ri";

function Bookings() {
	const [event, setEvent] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [bookers, setBookers] = useState([]);
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
			throw err;
		}
	};

	const getBookers = async () => {
		if (!selectedEvent) {
			toaster("error", "Please select an event to view bookers");
			return;
		}

		try {
			await fetch(
				buildUrl(`/event/get-bookers/${selectedEvent}`, {
					method: "GET",
					header: {
						"Content-Type": "application/json",
					},
				})
			).then(async (res) => {
				if (res.ok || res.status === 200) {
					const data = await res.json();
					console.log(data);
					setBookers(data.formatBooking);
					toaster("success", data.message);
				}
			});
		} catch (err) {
			throw new Error("Something went wrong");
		}
	};

	useEffect(() => {
		getEventOfAdmin();
	}, []);

	return (
		<>
			<ToastContainer />
			<div className='w-full flex flex-col'>
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
						<button
							onClick={getBookers}
							className='bg-primary px-4 py-2 rounded-md font-bold text-white hover:bg-[#0032a8] duration-150'>
							Get Bookers
						</button>
					</div>
				</div>
				<table className='mx-24 mt-10'>
					<thead>
						<tr className='flex items-center justify-between border-b border-zinc-400 pb-4'>
							{["Name", "Phone", "Total Bookings", "Total Payment"].map(
								(label, idx) => {
									return <th key={idx}>{label}</th>;
								}
							)}
						</tr>
					</thead>
					<tbody className='flex flex-col gap-6 mt-6'>
						{bookers.length > 0 ? (
							bookers.map((book, idx) => {
								return (
									<tr
										key={idx}
										className='flex items-center justify-between'>
										<td className='flex items-center gap-6'>
											<RiUserSmileLine
												size={40}
												className='text-primary'
											/>{" "}
											<div className='font-bold text-lg flex flex-col'>
												<h1>{book.name}</h1>
												<h1 className='font-thin text-sm'>{book.email}</h1>
											</div>
										</td>

										<td>{book.phone}</td>
										<td>{book.totalBookings}</td>
										<td>{book.totalPayment}</td>
									</tr>
								);
							})
						) : (
							<h1 className='text-center font-bold text-5xl text-primary relative top-48'>
								No bookers found
							</h1>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Bookings;
