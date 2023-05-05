import React, { useState, useEffect } from "react";
import { ReactComponent as SignupImage } from "../assets/bg_for_signup.svg";
import logo from "../assets/logo.png";
import { buildUrl } from "../utils/buildUrl.js";
import pg_admin_img from "../assets/parago_admin.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Home() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [isValid, setIsValid] = useState(true);

	const handleGoogleLogin = async () => {
		alert("Hello world");
	};

	const registerUser = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			setIsValid(false);
			setMessage("Please fill in all the fields");
			return;
		}

		if (password !== confirmPassword) {
			setIsValid(false);
			setMessage("Passwords do not match");
			return;
		}

		if (password.length < 8) {
			setIsValid(false);
			setMessage("Password must be at least 8 characters long");
			return;
		} else {
			setIsValid(true);
		}

		try {
			await fetch(buildUrl("/auth/signup"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password,
				}),
			}).then((res) => {
				if (res.status === 401) {
					setIsValid(false);
					setMessage("User already exists");
					return;
				}
			});
		} catch (err) {
			console.err(err);
		}
	};

	useEffect(() => {
		google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: handleGoogleLogin,
		});

		google.accounts.id.renderButton(document.getElementById("googleLogin"), {
			theme: "outline",
			size: "large",
			text: "continue_with",
			shape: "rectangular",
			width: `${
				window.innerWidth >= 275 && window.innerWidth <= 375
					? 245
					: window.innerWidth > 375 && window.innerWidth <= 425
					? 250
					: window.innerWidth > 425 && window.innerWidth <= 1024
					? 295
					: window.innerWidth > 1024 && window.innerWidth <= 1440
					? 350
					: window.innerWidth > 1440 && window.innerWidth <= 2560
					? 400
					: 450
			}`,
			height: "50",
			longtitle: "true",
			onsuccess: handleGoogleLogin,
			onfailure: handleGoogleLogin,
		});
	}, []);

	useEffect(() => {
		if (message) {
			setTimeout(() => {
				setMessage("");
			}, 5000);
		}
	}, [message]);

	return (
		<div className='font-primary flex flex-row lg:grid grid-cols-2'>
			<div className='flex flex-col'>
				<div className='bg-primary'>
					<SignupImage />
				</div>
				<div className='bg-secondary pl-10 py-10 flex flex-col gap-2'>
					<img
						src={logo}
						alt='paraGO Logo'
						className='w-12'
					/>
					<h1 className='text-5xl font-extrabold text-white'>
						Travel to hidden gems
					</h1>
					<p className='text-white font-lg text-md w-10/12'>
						Go travel with ease and Explore ew heights with paraGO
					</p>
				</div>
			</div>
			<div className='bg-[#e7e7e7] w-full'>
				<form
					className='bg-white rounded-xl flex flex-col gap-3 w-9/12 p-8 m-auto mt-8 shadow-lg'
					onSubmit={registerUser}>
					<img
						src={pg_admin_img}
						alt='Parago Admin Logo'
						className='w-28'
					/>
					<h1 className='text-5xl font-extrabold text-primary'>Sign Up</h1>
					<h1 className='text-gray mb-4'>
						Start creating events, places, and itineraries for the travelers to
						explore!
					</h1>

					<label
						htmlFor='firstName'
						className='text-xs'>
						First Name
					</label>
					<input
						type='text'
						className='border border-gray pl-2 py-2 rounded-md focus:outline-none'
						required
						autoComplete='off'
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<label
						htmlFor='firstName'
						className='text-xs'>
						Last Name
					</label>
					<input
						type='text'
						className='border border-gray pl-2 py-2 rounded-md focus:outline-none'
						required
						autoComplete='off'
						onChange={(e) => setLastName(e.target.value)}
					/>
					<label
						htmlFor='firstName'
						className='text-xs'>
						Email
					</label>
					<input
						type='text'
						className='border border-gray pl-2 py-2 rounded-md focus:outline-none'
						required
						autoComplete='off'
						onChange={(e) => setEmail(e.target.value)}
					/>
					{message && (
						<p className='text-red-600 text-xs font-bold'>{message}</p>
					)}
					<label
						htmlFor='firstName'
						className='text-xs'>
						Password
					</label>
					<div className='relative'>
						{isVisible ? (
							<AiFillEyeInvisible
								onClick={() => setIsVisible(false)}
								className='absolute right-3 top-2 text-xl cursor-pointer text-[#b9b9b9] sm:top-3'
							/>
						) : (
							<AiFillEye
								onClick={() => setIsVisible(true)}
								className='absolute right-3 top-2 text-xl cursor-pointer text-[#b9b9b9] sm:top-3'
							/>
						)}
						<input
							type={isVisible ? "text" : "password"}
							className={`border ${
								!isValid ? "border-rose-500" : "border-gray"
							} pl-2 py-2 rounded-md w-full focus:outline-none`}
							required
							autoComplete='off'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<label
						htmlFor='firstName'
						className='text-xs'>
						Confirm Password
					</label>
					<div className='relative'>
						<input
							type='password'
							className='border border-gray pl-2 py-2 rounded-md w-full focus:outline-none'
							required
							autoComplete='off'
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className='flex flex-row gap-4'>
						<input
							type='checkbox'
							className=''
						/>
						<p className='text-xs text-gray'>
							I agree to the terms and conditions of paraGO
						</p>
					</div>
					<button
						type='submit'
						className='bg-primary py-2 rounded-md mt-10 text-white font-bold hover:bg-[#0032a8] duration-100'>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
}

export default Home;
