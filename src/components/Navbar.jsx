import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { RiCalendarEventFill, RiLogoutBoxRLine } from "react-icons/ri";
import { GiIsland } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";

import Logo from "../assets/parago_admin.png";

function Navbar() {
	const navigate = useNavigate();
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

	const changeMenuBg = (id, e) => {
		e.preventDefault();
		const updatedMenu = menu.map((item) =>
			item.id === id ? { ...item, active: true } : { ...item, active: false }
		);
		setMenu(updatedMenu);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("isAuthenticated");
		localStorage.removeItem("admin");
		setTimeout(navigate("/"), 2000);
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

			<div className='flex flex-col gap-8 pb-28'>
				{menu.map((menu) => {
					return (
						<Link
							key={menu.id}
							to={menu.link}
							className={`flex flex-col px-4 py-2 ${
								menu.active &&
								"bg-[#DCE7FF] text-primary duration-300 pl-4 border-l-8 border-primary"
							}`}
							onClick={(event) => changeMenuBg(menu.id, event)}>
							<div className='flex items-center gap-10 text-lg py-2 pl-4'>
								{menu.icon}
								{menu.title}
							</div>
						</Link>
					);
				})}
			</div>
			<hr className='h-4' />
			<ul className='my-28 flex flex-col gap-8 px-10'>
				<Link
					to='/dashboard'
					className='flex items-center gap-10 text-lg'>
					<AiOutlineSetting size={30} />
					Settings
				</Link>
				<button
					onClick={handleLogout}
					className='flex items-center gap-10 text-lg'>
					<RiLogoutBoxRLine size={30} />
					Logout
				</button>
			</ul>
		</div>
	);
}

export default Navbar;
