import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { MdEmojiTransportation } from "react-icons/md";
import { IoMan } from "react-icons/io5";
import { SiHomeassistantcommunitystore } from "react-icons/si";

function Locals() {
	const locals = [
		{
			link: "/transportation",
			title: "Local Transportation",
			description: "View the local transportation in your municipality!",
			icon: <MdEmojiTransportation size={50} />,
		},
		{
			link: "/tourism",
			title: "Local Tour Guide",
			description: "View the local tour guides in your municipality!",
			icon: <IoMan size={50} />,
		},
		{
			link: "/local-stores",
			title: "Local Stores",
			description: "View the local stores in your municipality!",
			icon: <SiHomeassistantcommunitystore size={50} />,
		},
	];

	return (
		<div className='w-full'>
			<div className='w-full h-72 p-24 flex flex-col gap-2 shadow-2xl inset-0 bg-secondary'>
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
			<div className='px-32 pt-14 grid grid-cols-3 gap-6'>
				{locals.map((local, index) => (
					<motion.div
						whileHover={{ scale: 1.042 }}
						whileTap={{ scale: 0.9 }}
						className='shadow-lg	rounded-md '
						key={index}>
						<Link
							to={local.link}
							className='w-10/12 h-full shadow-md'>
							<div className='flex flex-col gap-2'>
								<h1 className='flex gap-4 items-center font-bold text-2xl text-white bg-primary rounded-t-md py-4 px-8'>
									{local.icon}
									{local.title}
								</h1>
								<p className='p-4 rounded-b-md'>{local.description}</p>
							</div>
						</Link>
					</motion.div>
				))}
			</div>
		</div>
	);
}

export default Locals;
