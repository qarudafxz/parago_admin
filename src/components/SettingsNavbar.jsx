import React from "react";
import { NavLink } from "react-router-dom";

function SettingsNavbar() {
	const menu = [
		{
			id: 1,
			name: "My Profile",
			link: "/settings/my-profile",
		},
		{
			id: 2,
			name: "Security",
			link: "/settings/security",
		},
		{
			id: 3,
			name: "Municipalities",
			link: "/settings/municipalities",
		},
		{
			id: 4,
			name: "Billing",
			link: "/settings/billing",
		},
	];

	return (
		<div
			className='flex flex-col gap-4 pr-32 border-r border-zinc-200'
			style={{ height: "80vh" }}>
			{menu.map((item) => (
				<NavLink
					key={item.id}
					to={item.link}
					className={({ isActive }) =>
						"flex flex-col px-4 py-2 " +
						(isActive
							? "bg-[#DCE7FF] text-primary duration-300 pl-4 rounded-full"
							: "text-zinc-500")
					}>
					{item.name}
				</NavLink>
			))}
			<button className='text-red-500 bg-red-200 py-2 px-4 rounded-full text-xs mt-10 ml-2'>
				Delete Account
			</button>
		</div>
	);
}

export default SettingsNavbar;
