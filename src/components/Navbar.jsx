import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";
import { motion } from "framer-motion";
import Pro from "../components/Pro.jsx";
import Logo from "../assets/parago_admin.png";
import { navbar_menu } from "../data/navbar_menu.jsx";
import { AiOutlineSetting } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Navbar() {
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);
	const adminIsSub = localStorage.getItem("isSub");

	const handleLogout = () => {
		setProgress(50);
		localStorage.removeItem("token");
		localStorage.removeItem("isAuthenticated");
		localStorage.removeItem("userID");
		localStorage.removeItem("email");

		setTimeout(() => {
			localStorage.removeItem("adminName");
			localStorage.removeItem("isSub");
			localStorage.removeItem("muni");

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
				className='mx-10 md:w-32 xl:w-48'
				alt='Logo'
			/>
			<ul className='flex flex-col md:gap-2 mb-10 xl:gap-3 xl:mb-1'>
				{navbar_menu.map((item) => (
					<li key={item.id}>
						<NavLink
							to={item.link}
							className={({ isActive }) =>
								"flex flex-col px-4 py-2 " +
								(isActive
									? "bg-[#DCE7FF] text-primary duration-300 pl-4 border-l-8 border-primary"
									: "")
							}>
							<div className='flex items-center gap-10 py-2 pl-4 md:text-xs xl:text-base'>
								{item.icon}
								{item.title}
							</div>
						</NavLink>
					</li>
				))}
			</ul>
			<hr className='h-4' />
			{adminIsSub === "false" && <Pro />}
			<ul
				className={`${
					adminIsSub === "true" ? "mb-56" : "mb-32"
				} flex flex-col md:mt-4 md:gap-2 xl:mt-4`}>
				<li>
					<NavLink
						to={"/settings"}
						className={({ isActive }) =>
							"flex items-center gap-10 text-lg' " +
							(isActive
								? "bg-[#ffefdc] text-secondary duration-300 pl-4 border-l-8 border-secondary"
								: "")
						}>
						<div className='flex items-center gap-10 text-lg py-2 pl-8 md:text-xs xl:text-base'>
							<AiOutlineSetting />
							Settings
						</div>
					</NavLink>
				</li>
				<li>
					<button
						onClick={handleLogout}
						className='flex items-center gap-10 text-lg'>
						<div className='flex items-center gap-10 text-lg py-2 pl-8 md:text-xs xl:text-base'>
							<RiLogoutBoxRLine />
							Logout
						</div>
					</button>
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
