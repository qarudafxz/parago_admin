import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/parago_logo.png";
import { buildUrl } from "../utils/buildUrl.js";
import TopLoadingBar from "react-top-loading-bar";
function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("");
	const date = new Date();

	const verifyEmail = async () => {
		setProgress(40);
		if (!email) {
			setMessage("Please provide an email");
			setProgress(100);
			return;
		}
		try {
			await fetch(buildUrl("/auth/verifyEmail"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
				}),
			}).then(() => {
				setProgress(100);
				setMessage("Verification email sent!");
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='font-primary flex flex-col'>
			<TopLoadingBar
				color='#0043DC'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className='flex flex-row justify-between items-center mt-8 px-36 '>
				<Link to='/'>
					<img
						src={Logo}
						className='w-40 cursor-pointer'
					/>
				</Link>
				<div className='flex gap-10 items-center'>
					<Link
						to='/signup'
						className='text-xl text-primary font-semibold border-2 border-primary px-4 py-2 rounded-md'>
						Signup
					</Link>
					<Link
						to='/'
						className='text-xl text-white font-semibold bg-primary px-7 py-3 rounded-md'>
						Login
					</Link>
				</div>
			</div>
			<div className='px-52 mt-32'>
				<div className='flex flex-col gap-4 rounded-md p-8'>
					{message && <p className='text-black font-semibold text-2xl'>{message}</p>}
					<h1 className='font-extrabold text-7xl text-primary'>
						Forgot <span className='text-secondary'>password</span>
					</h1>
					<p className='font-thin text-2xl w-8/12 mt-4'>
						Enter your corresponding registered email and check the email verification
						to proceed on changing your password
					</p>
					<div className='flex flex-row gap-2 mt-36'>
						<input
							className='border-2 border-primary rounded-md px-4 py-2 w-9/12 focus: outline-none'
							type='email'
							placeholder='Registered Email address'
							onChange={(e) => setEmail(e.target.value)}
						/>
						<button
							className='bg-primary px-4 rounded-md text-white w-3/12'
							onClick={verifyEmail}>
							Submit
						</button>
					</div>
				</div>
			</div>
			{/* //footer */}
			<div className='flex flex-row items-center justify-between px-36 bg-primary absolute bottom-0 w-full'>
				<h1 className='py-6 text-white font-thin'>
					© paraGO All Rights Reserved {date.getFullYear()}
				</h1>
			</div>
		</div>
	);
}

export default ForgotPassword;
