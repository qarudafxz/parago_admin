import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";

import logo from "../assets/parago_logo.png";
import email from "../assets/email_verified.png";

function isVerified() {
	const { id, token } = useParams();

	useEffect(() => {
		fetch(buildUrl(`/auth/${id}/verify/${token}`), {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
	}, []);
	return (
		<div className='font-primary'>
			<div className='m-10 flex flex-col gap-3'>
				<h1>Step 3 out of 3</h1>
				<div className='w-3/12 bg-primary h-4'></div>
			</div>
			<div className='flex flex-col gap-4 m-auto relative top-20 place-content-center place-items-center w-3/12 shadow-2xl p-8'>
				<img
					src={logo}
					alt='logo'
					className='w-2/4'
				/>
				<img
					src={email}
					alt='email'
					className='w-2/4'
				/>
				<h1 className='text-4xl font-bold'>Email Verified!</h1>
				<p className='text-center text-lg font-thin w-4/4 text-gray'>
					You can now login to your account and start using paraGO Admin.
				</p>

				<Link
					to='/'
					className='bg-primary w-full py-2 text-center rounded-md text-white cursor-pointer mt-10 hover:bg-[#0032a8] duration-200'>
					Return to Login
				</Link>
			</div>
		</div>
	);
}

export default isVerified;
