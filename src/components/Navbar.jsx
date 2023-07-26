import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";
import { motion } from "framer-motion";

import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { RiCalendarEventFill, RiLogoutBoxRLine } from "react-icons/ri";
import { GiIsland } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";
import { IoPeopleCircleSharp } from "react-icons/io5";

import Logo from "../assets/parago_admin.png";

function Navbar() {
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);

	const menu = [
		{
			id: 1,
			title: "Overview",
			icon: <AiOutlineHome />,
			link: "/dashboard",
		},
		{
			title: "Events",
			icon: <RiCalendarEventFill />,
			link: "/events",
		},
		{
			id: 3,
			title: "Places",
			icon: <GiIsland />,
			link: "/places",
		},
		{
			id: 4,
			title: "Locals",
			icon: <IoPeopleCircleSharp />,
			link: "/locals",
		},
		{
			id: 5,
			title: "Analytics",
			icon: <MdAnalytics />,
			link: "/analytics",
		},
	];

	const handleLogout = () => {
		setProgress(50);
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("isAuthenticated");
		localStorage.removeItem("admin");
		localStorage.removeItem("userID");
		localStorage.removeItem("muni");
		setTimeout(() => {
			setProgress(100);
			navigate("/");
		}, 1000);
	};

	return (
		<div className='flex flex-col w-2/12 pt-14 font-primary border-r-2 border-[#dcdcdc] shadow-md overflow-hidden sticky md:gap-2 xl:gap-10'>
			<TopLoadingBar
				progress={progress}
				color='#FF7900'
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<motion.img
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.5,
					ease: [0, 0.71, 0.2, 1.01],
				}}
				src={Logo}
				className='w-48 mx-10'
				alt='Logo'
			/>
			<label
				htmlFor='ul'
				className='font-thin text-gray px-10'>
				Main Menu
			</label>
			<ul className='flex flex-col gap-8 md:pb-14 xl:pb-28'>
				{menu.map((item) => (
					<li key={item.id}>
						<NavLink
							to={item.link}
							className={({ isActive }) =>
								"flex flex-col px-4 py-2 " +
								(isActive
									? "bg-[#DCE7FF] text-primary duration-300 pl-4 border-l-8 border-primary"
									: "")
							}>
							<div className='flex items-center gap-10 text-lg py-2 pl-4'>
								{item.icon}
								{item.title}
							</div>
						</NavLink>
					</li>
				))}
			</ul>
			<hr className='h-4' />
			<ul className='mb-16 flex flex-col px-10 md:gap-6 lg:mt-4 gap-8'>
				<li>
					<NavLink
						to='/dashboard'
						className='flex items-center gap-10 text-lg'>
						<AiOutlineSetting size={30} />
						Settings
					</NavLink>
				</li>
				<li>
					<button
						onClick={handleLogout}
						className='flex items-center gap-10 text-lg'>
						<RiLogoutBoxRLine size={30} />
						Logout
					</button>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
