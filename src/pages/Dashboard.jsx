import React, { useEffect, useState } from "react";
import { buildUrl } from "../utils/buildUrl.js";
import { getAdmin } from "../helpers/getAdmin.js";

function Dashboard() {
	const [data, setData] = useState({});
	const adminName = getAdmin();

	useEffect(() => {}, []);
	return (
		<>
			<div className='w-full flex flex-col'>
				<div className='bg-primary w-full h-72 p-24 flex flex-col gap-2 shadow-2xl'>
					<h1 className='text-[#92B0F5]'>
						Dashboard/<span className='text-white font-semibold'>Overview</span>
					</h1>
					<h1 className='text-4xl text-white font-bold'>
						Welcome back, <span className='text-secondary'>{adminName}</span>
					</h1>
					<p className='text-white font-thin w-7/12 mt-4'>
						Keep your community engaged and informed by adding new events, updating
						itineraries, and creating new places for people to explore.
					</p>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
