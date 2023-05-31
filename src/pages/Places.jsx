import React, { useState, useEffect } from "react";
import { buildUrl } from "../utils/buildUrl";
import { getAdminId } from "../helpers/getAdminId.js";

import { FaUmbrellaBeach } from "react-icons/fa";
import { BiWater } from "react-icons/bi";
import {
	GiMountaintop,
	GiCircleForest,
	GiBoatHorizon,
	GiWaterfall,
	GiCaveEntrance,
	GiIsland,
	GiAnimalSkull,
} from "react-icons/gi";
import { MdOutlineMuseum } from "react-icons/md";
import { TbBuildingCarousel } from "react-icons/tb";

function Places() {
	const adminID = getAdminId();
	const [places, setPlaces] = useState([]);

	const LOCATION_TYPE = [
		{ value: "beach", icon: <FaUmbrellaBeach /> },
		{ value: "mountain", icon: <GiMountaintop /> },
		{ value: "forest", icon: <GiCircleForest /> },
		{ value: "lake", icon: <GiBoatHorizon /> },
		{ value: "river", icon: <BiWater /> },
		{ value: "waterfall", icon: <GiWaterfall /> },
		{ value: "cave", icon: <GiCaveEntrance /> },
		{ value: "island", icon: <GiIsland /> },
		{ value: "museum", icon: <MdOutlineMuseum /> },
		{ value: "park", icon: <TbBuildingCarousel /> },
		{ value: "zoo", icon: <GiAnimalSkull /> },
		{ value: "theme park", icon: <TbBuildingCarousel /> },
		{ value: "garden", icon: <TbBuildingCarousel /> },
		{ value: "church", icon: <TbBuildingCarousel /> },
		{ value: "temple", icon: <TbBuildingCarousel /> },
		{ value: "mosque", icon: <TbBuildingCarousel /> },
		{ value: "cathedral", icon: <TbBuildingCarousel /> },
		{ value: "castle", icon: <TbBuildingCarousel /> },
	];

	const fetchPlaces = async () => {
		try {
			const res = await fetch(buildUrl(`/event/events/${adminID}`), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			const data = await res.json();
			setPlaces(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchPlaces();
	}, []);
	return (
		<div className='flex flex-col w-full font-primary'>
			<div className="w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0 bg-[url('https://i0.wp.com/touristspotsfinder.com/wp-content/uploads/2018/04/Top-10-Tourist-Spots-in-Agusan-del-Sur.jpg?fit=1200%2C629&ssl=1')]">
				<div className='backdrop-blur-sm p-4 w-8/12'>
					<h1 className='text-primary'>
						Dashboard/<span className='text-white font-semibold'>Places</span>
					</h1>
					<h1 className='text-4xl text-white font-bold'>
						View the places you created!
					</h1>
					<p className='text-white font-thin w-7/12 mt-4'>
						These are the hidden gems you wish for the tourists to explore. You can
						add details about the place by clicking edit
					</p>
				</div>
				<div></div>
			</div>
			<div className='p-10'>
				<h1 className='font-bold text-5xl'>Hidden Gems</h1>
				<div className='grid grid-cols-4 mt-10 gap-10'>
					{places?.events?.map((place) => {
						return place.locations.map((location) => {
							// Update this line
							const LocationIcon = LOCATION_TYPE.find(
								(loc) => loc.value === location.locType
							)?.icon;
							return (
								<div
									className='shadow-xl rounded-md p-6 flex flex-col gap-4'
									key={location._id}>
									<h1 className='text-4xl font-bold flex items-center gap-6 text-primary'>
										{LocationIcon}
										{location.locName}
									</h1>
									<p className='text-md font-thin'>{location.locDesc}</p>
								</div>
							);
						});
					})}
				</div>
			</div>
		</div>
	);
}

export default Places;
