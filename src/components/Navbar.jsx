import React from "react";
import { Link } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";
import { RiCalendarEventFill } from "react-icons/ri";
import { GiIsland } from "react-icons/gi";
import { MdAnalytics } from "react-icons/md";

import Logo from "../assets/parago_admin.png";
function Navbar() {
	return (
		<div className='w-2/12 flex flex-col gap-10 pt-14 px-10 font-primary border-r-2 border-[#dcdcdc] shadow-md'>
			<img
				src={Logo}
				className='w-48'
			/>
			<label
				for='ul'
				className='font-thin text-gray'>
				Main Menu
			</label>
			<ul className='flex flex-col gap-10 pb-32 border-b-2 border-[#dcdcdc]'>
				<Link
					to='/dashboard'
					className='flex items-center gap-10 text-lg'>
					<AiOutlineHome size={30} />
					Dashboard
				</Link>
				<Link
					to='/dashboard'
					className='flex items-center gap-10 text-lg'>
					<RiCalendarEventFill size={30} />
					Events
				</Link>
				<Link
					to='/dashboard'
					className='flex items-center gap-10 text-lg'>
					<GiIsland size={30} />
					Places
				</Link>
				<Link
					to='/dashboard'
					className='flex items-center gap-10 text-lg'>
					<MdAnalytics size={30} />
					Analytics
				</Link>
			</ul>
		</div>
	);
}

export default Navbar;
