import React, { useState, useEffect } from "react";
import { ReactComponent as SignupImage } from "../assets/bg_for_signup.svg";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { buildUrl } from "../utils/buildUrl.js";
import municipalities from "../helpers/municipalities.js";

import pg_admin_img from "../assets/parago_admin.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import TopLoadingBar from "react-top-loading-bar";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function Home() {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const [progress, setProgress] = useState(0);
	const [municipality, setMunicipality] = useState("");

	const registerUser = async (e) => {
		e.preventDefault();

		setProgress(30);
		if (!email || !password) {
			setIsValid(false);
			setMessage("Please fill in all the fields");
			setTimeout(() => {
				setProgress(100);
			}, 1000);
			return;
		}

		if (password !== confirmPassword) {
			setIsValid(false);
			setMessage("Passwords do not match");
			setTimeout(() => {
				setProgress(100);
			}, 1000);
			return;
		}

		if (password.length < 8) {
			setIsValid(false);
			setMessage("Password must be at least 8 characters long");
			setTimeout(() => {
				setProgress(100);
			}, 1000);
			return;
		} else {
			setTimeout(() => {
				setProgress(100);
			}, 1000);
			setIsValid(true);
		}

		console.log(municipality);

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
					municipality: `Municipality of ${municipality}`,
				}),
			}).then((res) => {
				if (res.status === 401) {
					setIsValid(false);
					setMessage("User already exists");
					return;
				} else {
					setProgress(100);
					localStorage.setItem("token", res.headers.get("x-auth-token"));
					setTimeout(() => {
						navigate("/verify", { state: { email } });
					}, 1000);
				}
			});
		} catch (err) {
			console.err(err);
		}
	};

	useEffect(() => {
		if (message) {
			setTimeout(() => {
				setMessage("");
			}, 5000);
		}
	}, [message]);

	return (
		<div className='font-primary flex flex-row lg:grid grid-cols-2'>
			<TopLoadingBar
				color='#0043DC'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div className='flex flex-col'>
				<div className='bg-primary'>
					<SignupImage className='lg:w-full h-full' />
				</div>
				<div className='bg-secondary flex flex-col md:p-6 xl:pl-10 py-10 gap-2'>
					<img
						src={logo}
						alt='paraGO Logo'
						className='w-12'
					/>
					<h1 className='font-extrabold text-white md:text-3xl xl:text-5xl'>
						Travel to hidden gems with ParaGO
					</h1>
					<p className='text-white font-lg w-10/12 md:hidden xl:block'>
						Go travel with ease and Explore ew heights with paraGO
					</p>
				</div>
			</div>
			<div className='bg-[#e7e7e7] w-full'>
				<form
					className='bg-white rounded-xl flex flex-col gap-2 w-9/12 p-8 m-auto mt-8 shadow-lg md:mt-1 w-6/12 xl:mt-24'
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
						autoFocus
						type='text'
						className='border border-gray pl-2 py-2 rounded-md text-primary focus:outline-none'
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
						className='border border-gray pl-2 py-2 rounded-md text-primary focus:outline-none'
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
						className='border border-gray pl-2 py-2 rounded-md text-primary focus:outline-none'
						required
						autoComplete='off'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Dropdown
						className='border border-gray pl-2 py-2 rounded-md text-primary focus:outline-none'
						options={municipalities}
						onChange={(municipalities) => setMunicipality(municipalities?.value)}
						placeholder='Select Municipality'
					/>
					{message && <p className='text-red-600 text-xs font-bold'>{message}</p>}
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
							className='border border-gray pl-2 py-2 rounded-md w-full text-primary focus:outline-none'
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
						className='bg-primary py-2 rounded-md text-white font-bold hover:bg-[#0032a8] duration-100 md:mt-4 xl:mt-10'>
						Sign Up
					</button>
					<p className='font-thin text-center mt-4'>
						Already have an account?{" "}
						<Link
							to='/'
							className='font-bold italic hover:text-primary duration-150'>
							Log In
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Home;
