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
	const [locations, setLocations] = useState([]);
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
					locations: [...locations],
				}),
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	};

	const handleAddLocation = () => {
		setLocations([...locations, { locName: "", desc: "", date: "", time: "" }]);
	};

	const handleSetLocation = () => {
		const newLocations = [...locations];
		newLocations[index][e.target.name] = e.target.value;
		setLocations(newLocations);
	};

	const handleRemoveLocation = (e, index) => {
		e.preventDefault();
		const newLocations = [...locations];
		newLocations.splice(index, 1);
		setLocations(newLocations);
	};

	console.log(locations);

	return (
		<>
			<ToastContainer />
			{isCreateEvent && (
				<form
					onSubmit={createEvent}
					className='flex flex-col gap-4 p-10 w-5/12 bg-white absolute z-10 ml-60 mt-10 bg-blend-overlay shadow-2xl'>
					<div className='flex flex-row justify-between gap-6'>
						<label
							htmlFor='image'
							className='text-2xl font-bold'>
							Event Cover Image
						</label>
						<input
							type='file'
							name='image'
							id='image'
						/>
					</div>
					<input
						type='text'
						placeholder='Event Name'
						onChange={(e) => setEventName(e.target.value)}
						className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
					/>
					<input
						type='text'
						placeholder='Event Description'
						onChange={(e) => setEventDesc(e.target.value)}
						className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
					/>
					<div className='grid grid-cols-2 gap-4'>
						<input
							type='number'
							placeholder='Price'
							onChange={(e) => setPrice(e.target.value)}
							className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
						/>
						<input
							type='number'
							placeholder='Capacity'
							onChange={(e) => setCapacity(e.target.value)}
							className='py-2 pl-4 outline outline-slate-400 focus: outline-none rounded-sm'
						/>
					</div>
					<div>
						<div className='flex flex-col gap-4'>
							<h1 className='text-xl font-semibold'>Locations</h1>
							{locations.map((_location, index) => {
								return (
									<div
										key={index}
										className='flex flex-row items-center'>
										<input
											type='text'
											placeholder='Location'
											onChange={(e) => handleSetLocation(e, index)}
										/>
										<textarea
											type='text'
											placeholder='Description'
											onChange={(e) => handleSetLocation(e, index)}
										/>
										<input
											type='date'
											placeholder='Date'
											onChange={(e) => handleSetLocation(e, index)}
										/>
										<input
											type='time'
											placeholder='Time'
											onChange={(e) => handleSetLocation(e, index)}
										/>
										<button onClick={(e) => handleRemoveLocation(e, index)}>
											Remove
										</button>
									</div>
								);
							})}
						</div>
						<button
							onClick={handleAddLocation}
							className='bg-secondary text-white py-2 px-4 rounded-md'>
							Add Location
						</button>
					</div>
				</form>
			)}
		</>
	);
}

export default CreateEvent;
