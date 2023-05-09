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
			link: "/dashboard",
			active: false,
		},
		{
			id: 3,
			title: "Places",
			icon: <GiIsland />,
			link: "/dashboard",
			active: false,
		},
		{
			id: 4,
			title: "Analytics",
			icon: <MdAnalytics />,
			link: "/dashboard",
			active: false,
		},
	]);

	const changeMenuBg = (id) => {
		const updatedMenu = menu.map((item) => {
			if (item.id === id) {
				return { ...item, active: true };
			} else {
				return { ...item, active: false };
			}
		});
		setMenu(updatedMenu);
	};

	return (
		<div className='w-2/12 flex flex-col gap-10 pt-14 px-10 font-primary border-r-2 border-[#dcdcdc] shadow-md overflow-hidden'>
			<img
				src={Logo}
				className='w-48'
				alt='Logo'
			/>
			<label
				htmlFor='ul'
				className='font-thin text-gray'>
				Main Menu
			</label>

			<div className='flex flex-col gap-8 border-b-2 pb-28 border-[#c9c9c9]'>
				{menu.map((menu) => {
					return (
						<div
							key={menu.id}
							className='flex flex-col'>
							<Link
								to={menu.link}
								className={`flex items-center gap-10 text-lg ${
									menu.active &&
									"bg-[#DCE7FF] text-primary duration-300 py-2 pl-4 border-l-8 border-primary"
								}`}
								onClick={() => changeMenuBg(menu.id)}>
								{menu.icon}
								{menu.title}
							</Link>
						</div>
					);
				})}
			</div>

			<ul className='my-44 flex flex-col gap-4'>
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
