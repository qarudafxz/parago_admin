import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Logo from "../assets/parago_logo.png";
import { buildUrl } from "../utils/buildUrl.js";

import TopLoadingBar from "react-top-loading-bar";

import blue from "../assets/parago-blue.png";

function ChangePassword() {
	const { email, token } = useParams();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("");
	const date = new Date();
	const navigate = useNavigate();

	// const URL = import.meta.env.DEV ? `http://localhost:3000/api` : `/api`;

	const changePassword = async (e) => {
		e.preventDefault();
		setProgress(40);
		if (password !== confirmPassword) {
			setMessage("Password doesn't match!");
			setProgress(100);
			return;
		}

		if (!password || !confirmPassword) {
			setMessage("Please input all the fields!");
			setProgress(100);
			return;
		}

		try {
			await fetch(buildUrl(`/auth/change-password/${email}/${token}`), {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					newPassword: password,
				}),
			}).then((res) => {
				if (res.ok || res.status === 200) {
					setProgress(100);
					setTimeout(() => {
						navigate("/");
					}, 1500);
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (message) {
			setTimeout(() => {
				setMessage("");
			}, 2000);
		}
	}, [message]);

	return (
		<div className='font-primary flex flex-col'>
			<TopLoadingBar
				color='#0043DC'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className='flex flex-row justify-between items-center mt-8 px-36'>
				<img
					src={Logo}
					className='w-40'
				/>
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
			{/* form */}
			<div className='flex flex-col gap-6 rounded-md m-auto px-14 py-10 shadow-2xl'>
				<div className='flex flex-row justify-between gap-8 items-center'>
					<img src={blue} />
					<h1 className='font-extrabold text-4xl'>Enter new password</h1>
				</div>
				<div className='flex flex-col gap-2'>
					<p>Email</p>
					<p className='border border-gray text-gray py-2 px-4 rounded-md font-thin'>
						{email}
					</p>
				</div>
				<p className='text-gray'>Enter your new password and you’re all set</p>
				<form
					className='flex flex-col gap-5'
					onSubmit={changePassword}>
					{message && <h1 className='text-sm text-red-500'>{message}</h1>}
					<div className='flex flex-col gap-2'>
						<label htmlFor='password'>New Password</label>
						<input
							type='password'
							placeholder='New Password'
							onChange={(e) => setPassword(e.target.value)}
							className='border border-gray focus:outline-none rounded-md pl-4 py-2'></input>
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='confirmPassword'>Confirm New Password</label>
						<input
							type='password'
							placeholder='Confirm New Password'
							onChange={(e) => setConfirmPassword(e.target.value)}
							className='border border-gray focus:outline-none rounded-md pl-4 py-2'></input>
					</div>
					<button
						type='submit'
						className='bg-primary py-2 text-center font-bold text-white rounded-md mt-14'>
						Change Password
					</button>
				</form>
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

export default ChangePassword;
