import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { RiCalendarEventFill, RiLogoutBoxRLine } from "react-icons/ri";
import { GiIsland } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";

import Logo from "../assets/parago_admin.png";

function Navbar() {
	const [menu, setMenu] = useState([
		{
			id: 1,
			title: "Dashboard",
			icon: <AiOutlineHome />,
			link: "/dashboard",
			active: true,
		},
		{
			id: 2,
			title: "Events",
			icon: <RiCalendarEventFill />,
			link: "/events",
			active: false,
		},
		{
			id: 3,
			title: "Places",
			icon: <GiIsland />,
			link: "/places",
			active: false,
		},
		{
			id: 4,
			title: "Analytics",
			icon: <MdAnalytics />,
			link: "/analytics",
			active: false,
		},
	]);

	const changeMenuBg = (id, event) => {
		event.preventDefault();
		const updatedMenu = menu.map((item) =>
			item.id === id ? { ...item, active: true } : { ...item, active: false }
		);
		setMenu(updatedMenu);
	};

	return (
		<div className='flex flex-col w-2/12 gap-10 pt-14 font-primary border-r-2 border-[#dcdcdc] shadow-md overflow-hidden'>
			<img
				src={Logo}
				className='w-48 mx-10'
				alt='Logo'
			/>
			<label
				htmlFor='ul'
				className='font-thin text-gray px-10'>
				Main Menu
			</label>

			<div className='flex flex-col gap-8 border-b-2 pb-28 border-[#c9c9c9]'>
				{menu.map((menu) => {
					return (
						<Link
							key={menu.id}
							to={menu.link}
							className={`flex flex-col  ${
								menu.active &&
								"bg-[#DCE7FF] text-primary duration-300 py-2 pl-4 border-l-8 border-primary"
							}`}
							onClick={(event) => changeMenuBg(menu.id, event)}>
							<div className='flex items-center gap-10 text-lg px-10'>
								{menu.icon}
								{menu.title}
							</div>
						</Link>
					);
				})}
			</div>

			<ul className='my-44 flex flex-col gap-4 px-10'>
				<Link
					to='/dashboard'
					className='flex items-center gap-10 text-lg'>
					<AiOutlineSetting size={30} />
					Settings
				</Link>
				<Link
					to='/dashboard'
					className='flex items-center gap-10 text-lg'>
					<RiLogoutBoxRLine size={30} />
					Logout
				</Link>
			</ul>
		</div>
	);
}

export default Navbar;
