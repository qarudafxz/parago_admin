import React, { useState } from "react";
import { buildUrl } from "../utils/buildUrl";
import { getAdminId } from "../helpers/getAdminId";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateEvent({ isCreateEvent }) {
	const [eventName, setEventName] = useState("");
	const [eventDesc, setEventDesc] = useState("");
	const [price, setPrice] = useState(0);
	const [capacity, setCapacity] = useState(0);
	const [errorMsg, setErrorMsg] = useState("");
	const adminID = getAdminId();

	const createEvent = async (e) => {
		e.preventDefault();
		if (!eventName || !eventDesc || !price || !capacity) {
			toast.error("Please input all fields!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			return;
		}

		try {
			await fetch(buildUrl("/event/create-event"), {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					creatorID: adminID,
					eventName,
					eventDesc,
					price,
					capacity,
				}),
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<>
			<ToastContainer />
			{isCreateEvent && (
				<form
					onSubmit={createEvent}
					className='flex flex-col gap-4 p-10 w-4/12 bg-white shadow-2xl absolute z-10'>
					<label htmlFor='image'>Event Cover Image</label>
					<input
						type='file'
						name='image'
						id='image'
					/>
					<input
						type='text'
						placeholder='Event Name'
						onChange={(e) => setEventName(e.target.value)}
					/>
					<input
						type='text'
						placeholder='Event Description'
						onChange={(e) => setEventDesc(e.target.value)}
					/>
					<input
						type='number'
						placeholder='Prices'
						onChange={(e) => setPrice(e.target.value)}
					/>
					<input
						type='number'
						placeholder='Capacity'
						onChange={(e) => setCapacity(e.target.value)}
					/>
					<button type='submit'>Create Event</button>
				</form>
			)}
		</>
	);
}

export default CreateEvent;
