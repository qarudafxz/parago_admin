import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { MdEmojiTransportation } from "react-icons/md";
import { IoMan } from "react-icons/io5";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { AiOutlineArrowRight } from "react-icons/ai";

function Locals() {
	const navigate = useNavigate();
	const locals = [
		{
			link: "/transportation",
			minititle: "Tara Hatid Kita",
			color: "#11a87b",
			title: "Local Transportation",
			description:
				"You can create, read, update, and delete the local transportation in your municipality!",
			icon: <MdEmojiTransportation size={50} />,
		},
		{
			link: "/tourism",
			minititle: "Tara Lakbay",
			color: "#d99d68",
			title: "Local Tour Guide",
			description:
				"You can create, read, update, and delete the local tour guides in your municipality!",
			icon: <IoMan size={50} />,
		},
		{
			link: "/local-stores",
			minititle: "Tara Bili",
			color: "#d86666",
			title: "Local Stores",
			description:
				"You can create, read, update, and delete the local stores in your municipality!",
			icon: <SiHomeassistantcommunitystore size={50} />,
		},
	];

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);

	return (
		<div className='w-full'>
			<div className='bg-primary w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0'>
				<h1 className='text-white'>
					Dashboard/<span className='text-white font-semibold'>Locals</span>
				</h1>
				<h1 className='text-4xl text-white font-bold'>
					Utilize the local accomodations in your municipality!
				</h1>
				<p className='text-white font-thin w-7/12 mt-4'>
					View your local accomodations here. You can add details about the places'
					contact information by clicking specific category
				</p>
			</div>

			<div className='px-32 pt-14 grid grid-cols-3 gap-8'>
				{locals.map((local, index) => (
					<motion.div
						whileHover={{ scale: 1.042 }}
						className='shadow-lg	rounded-2xl'
						key={index}>
						<div className='flex flex-col gap-2'>
							<h1
								className={`font-bold text-2xl text-white rounded-t-md py-4 px-8`}
								style={{ backgroundColor: local.color }}>
								<p className='font-thin text-sm mb-4'>{local.minititle}</p>
								<div className='flex gap-4 items-center'>
									{local.icon}
									{local.title}
								</div>
							</h1>
							<div className='px-10 py-4 flex justify-between items-center'>
								<p className='rounded-b-md text-sm w-9/12'>{local.description}</p>
								<Link to={local.link}>
									<AiOutlineArrowRight
										size={50}
										className='text-white rounded-md p-2 hover:bg-[#0032a8] duration-150'
										style={{ backgroundColor: local.color }}
									/>
								</Link>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}

export default Locals;
