import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";
import { getAdminId } from "../helpers/getAdminId.js";
import { toaster } from "../helpers/toaster.js";
import { ToastContainer } from "react-toastify";
import { AiFillPlusCircle } from "react-icons/ai";
import { AddPlace } from "../components/AddPlace";
import { PlacesCard } from "../components/PlacesCard";

function Places() {
	const navigate = useNavigate();
	const adminID = getAdminId();
	const [places, setPlaces] = useState([]);
	const [loading, setLoading] = useState(false);
	const [addPlace, setAddPlace] = useState(false);

	const fetchPlaces = async () => {
		try {
			setLoading(true);
			const res = await fetch(buildUrl(`/event/get-places/${adminID}`), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			const data = await res.json();
			setPlaces(data);
			setTimeout(() => {
				setLoading(false);
			}, 1500);
		} catch (err) {
			console.error(err);
		}
	};

	const addNewPlace = async (name, desc, address, placeType) => {
		if (
			typeof name === "undefined" ||
			typeof desc === "undefined" ||
			typeof address === "undefined" ||
			typeof placeType === "undefined"
		) {
			toaster("error", "Please fill out all the fields!");
			return;
		}

		const URL = import.meta.env.DEV
			? "http://localhost:3001/api/event/add-place"
			: "/api/event/add-place";

		try {
			const res = await fetch(URL, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					creatorID: adminID,
					name,
					desc,
					address,
					placeType,
				}),
			});

			if (!res.ok) {
				const data = await res.json();
				toaster("error", data.message);
			} else {
				const data = await res.json();
				toaster("success", data.message);
				setAddPlace(false);
				fetchPlaces();
			}
		} catch (err) {
			console.error(err);
		}
	};

	const createPlace = (event) => {
		if (
			event.key === "z" ||
			(event.key === "Z" && event.code === "KeyZ" && event.ctrlKey)
		) {
			setAddPlace(true);
		}
	};

	const handleFormCancellationPress = (event) => {
		if (event.key === "Escape") setAddPlace(false);
	};

	useEffect(() => {
		fetchPlaces();

		const handleCancelCreateEvent = (event) => {
			handleFormCancellationPress(event);
		};

		const handleCreateEvent = (event) => {
			createPlace(event);
		};

		window.addEventListener("keydown", handleCancelCreateEvent);
		window.addEventListener("keydown", handleCreateEvent);

		if (!localStorage.getItem("token")) {
			navigate("/");
		}

		document.title = "Places | Parago Admin";

		return () => {
			window.removeEventListener("keydown", handleCancelCreateEvent);
			window.removeEventListener("keydown", handleCreateEvent);
		};
	}, []);

	return (
		<div className='flex flex-col w-full font-primary'>
			<ToastContainer />
			<div className="w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0 bg-[url('https://i0.wp.com/touristspotsfinder.com/wp-content/uploads/2018/04/Top-10-Tourist-Spots-in-Agusan-del-Sur.jpg?fit=1200%2C629&ssl=1')]">
				<div className='p-4 w-8/12'>
					<h1 className='text-primary'>
						Dashboard/<span className='text-white font-semibold'>Places</span>
					</h1>
					<h1 className='text-4xl text-white font-bold'>
						Add the precious hidden gems!
					</h1>
					<p className='text-white font-thin w-7/12 mt-4'>
						These are the hidden gems you wish for the tourists to explore. You can
						add details about the place by clicking edit
					</p>
				</div>
				<div></div>
			</div>
			<div className='p-10'>
				<div className='flex justify-between items-center'>
					<h1 className='font-bold text-5xl'>Hidden Gems</h1>
					<button
						onClick={() => setAddPlace(true)}
						className='flex flex-row gap-4 items-center text-xl font-semibold place-self-end mr-10 bg-primary px-4 py-2 rounded-md text-white hover:bg-[#0032a8] duration-150'>
						<AiFillPlusCircle size={30} />
						Add Place
						<span className='text-[10px] font-thin bg-[#0a3496] px-[9px] rounded-md text-[#9fbcff] border border-[#455eff]'>
							CTRL Z
						</span>
					</button>
				</div>
				{/* places */}

				<PlacesCard
					places={places}
					loading={loading}
				/>

				<AddPlace
					addPlace={addPlace}
					setAddPlace={setAddPlace}
					addNewPlace={addNewPlace}
				/>
			</div>
		</div>
	);
}

export default Places;
