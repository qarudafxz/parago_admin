import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl.js";
import { getAdmin } from "../helpers/getAdmin.js";
import { getMunicipality } from "../helpers/getMunicipality.js";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

import TotalBookingsChart from "../components/Charts/TotalBookingsChart.jsx";
import RevenueChart from "../components/Charts/RevenueChart.jsx";

import NumberEvents from "../components/NumberEvents.jsx";
import MostBookedEvent from "../components/MostBookedEvent.jsx";

import Img from "../assets/bg_for_dashboard.svg";

function Dashboard() {
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const [adminName, setAdminName] = useState("");
	const [municipality, setMunicipality] = useState("");

	const fetchData = async () => {
		await fetch(buildUrl(`/auth/admin/${localStorage.getItem("userID")}`), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setData(data?.admin);
				setAdminName(data?.admin?.firstName + " " + data?.admin?.lastName);
				setMunicipality(data?.admin?.municipality);
			});
	};

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
		fetchData();
	}, []);

	return (
		<>
			<div className='w-full flex flex-col'>
				<div
					className='bg-primary w-full h-72 p-16 flex flex-col gap-2 shadow-2xl'
					style={{
						backgroundImage: `url(${Img})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "contain",
						backgroundPosition: "right",
					}}>
					<h1 className='text-[#92B0F5]'>
						Dashboard/<span className='text-white font-semibold'>Overview</span>
					</h1>
					<h1 className='text-4xl text-white font-bold'>
						Welcome back, <span className='text-secondary'>{adminName}</span>{" "}
						<span className='text-xs relative bottom-4 bg-white py-1 px-2 rounded-md text-primary pointer-events-none'>
							{data?.isSubscribed && "Pro+✨"}
						</span>
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
				<div
					className='grid grid-cols-2 gap-10 px-10 my-10 pb-16'
					style={{
						minHeight: "calc(100vh - 18rem)",
						maxHeight: "calc(100vh - 18rem)",
						overflow: "auto", // Add this to make the div scrollable if needed
					}}>
					<NumberEvents />
					<MostBookedEvent />
					<RevenueChart />
					<TotalBookingsChart />
				</div>
			</div>
		</>
	);
}

export default Dashboard;
