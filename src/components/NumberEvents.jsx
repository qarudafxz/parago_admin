import React, { useEffect, useState } from "react";
import { buildUrl } from "../utils/buildUrl.js";
import { getAdminId } from "../helpers/getAdminId.js";

import { TbKayak } from "react-icons/tb";

function NumberEvents() {
	const [fetchedData, setFetchData] = useState({});
	const [isLoaded, setIsLoaded] = useState(null);
	const adminID = getAdminId();
	const currentDate = new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const fetchData = async () => {
		setIsLoaded(false);
		await fetch(buildUrl(`/auth/admin/${adminID}`), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setFetchData(data);
				setIsLoaded(true);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className='flex flex-col font-primary shadow-md w-3/12 rounded-xl relative bottom-10 left-20'>
				<div className='flex flex-row justify-between p-10 bg-[#B7FFB0]'>
					<div className='flex flex-col items-center'>
						<h1 className='text-7xl font-bold text-[#2A7A23]'>
							{isLoaded ? (
								fetchedData.admin?.eventsCreated
							) : (
								<span className='text-4xl'>Loading...</span>
							)}
						</h1>
						<p className='text-xl text-[#2A7A23]'>Events Created</p>
					</div>
					<TbKayak
						size={80}
						className='bg-[#F8FFF8] p-4 rounded-md text-[#2A7A23]'
					/>
				</div>
				<div className='w-full p-8 bg-white'>
					<h1 className='text-2xl font-bold'>As of {currentDate}</h1>
				</div>
			</div>
		</>
	);
}

export default NumberEvents;
