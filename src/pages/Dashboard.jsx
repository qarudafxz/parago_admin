import React, { useEffect, useState } from "react";
import { buildUrl } from "../utils/buildUrl.js";
import { getAdmin } from "../helpers/getAdmin.js";
import { getMunicipality } from "../helpers/getMunicipality.js";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

import ChartComponent from "../components/Chart.jsx";
import NumberEvents from "../components/NumberEvents.jsx";

function Dashboard() {
	const [data, setData] = useState({});
	const adminName = getAdmin();
	const municipality = getMunicipality();

	const fetchData = async () => {
		await fetch(buildUrl(`/auth/admin/${localStorage.getItem("userID")}`), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className='w-full flex flex-col'>
				<div className='bg-primary w-full h-80 p-16 flex flex-col gap-2 shadow-2xl'>
					<h1 className='text-[#92B0F5]'>
						Dashboard/<span className='text-white font-semibold'>Overview</span>
					</h1>
					<h1 className='text-4xl text-white font-bold'>
						Welcome back, <span className='text-secondary'>{adminName}</span>
					</h1>
					<p className='font-semibold text-white bg-secondary py-2 px-4 rounded-md w-5/12 flex gap-4 items-center'>
						<HiOutlineBuildingLibrary size={20} />
						{municipality}
					</p>
					<p className='text-white font-thin w-7/12'>
						Keep your community engaged and informed by adding new events, updating
						itineraries, and creating new places for people to explore.
					</p>
				</div>
				<div className='flex flex-row gap-40'>
					<NumberEvents />
					<ChartComponent />
				</div>
			</div>
		</>
	);
}

export default Dashboard;
