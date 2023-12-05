import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { buildUrl } from "../utils/buildUrl";
// import { handleGoogleLogin } from "../helpers/handleGoogleLogin";

import pic from "../assets/enchanted.jpg";
import logo from "../assets/logo.png";
import parago_admin from "../assets/parago_admin.png";

import TopLoadingBar from "react-top-loading-bar";

function Home() {
	const navigate = useNavigate();
	const [progress, setProgress] = useState(0);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailMessage, setEmailMessage] = useState("");
	const [passwordMessage, setPasswordMessage] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const formRef = useRef(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		setProgress(30);
		try {
			const res = await fetch(buildUrl("/auth/login"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			const data = await res.json();

			if (!(res.status === 200)) {
				if (
					data.message === "Email not verified" ||
					data.message === "Admin doesn't exist!" ||
					data.message === "Email not verified. Please verify your email first!"
				) {
					setProgress(70);
					setEmailMessage(data.message);
					setIsEmailValid(false);
					setTimeout(() => {
						setProgress(100);
					}, 1500);
				} else {
					setProgress(70);
					setPasswordMessage(data.message);
					setIsPasswordValid(false);
					setTimeout(() => {
						setProgress(100);
					}, 1500);
				}

				return;
			}

			console.log(data);

			localStorage.setItem("token", data.token);
			localStorage.setItem(
				"adminName",
				data.admin.firstName + " " + data.admin.lastName
			);
			localStorage.setItem("muni", data.admin.municipality);
			localStorage.setItem("isSub", data.admin.isSubscribed);
			localStorage.setItem("isAuthenticated", true);
			localStorage.setItem("userID", data.admin._id);
			localStorage.setItem("email", data.admin.email);

			setProgress(100);

			setTimeout(() => {
				navigate("/dashboard");
			}, 2000);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (!isEmailValid) {
			setTimeout(() => {
				setIsEmailValid(true);
				setEmailMessage("");
			}, 2500);
		}

		if (!isPasswordValid) {
			setTimeout(() => {
				setIsPasswordValid(true);
				setPasswordMessage("");
			}, 2500);
		}
	}, [isEmailValid, isPasswordValid]);

	useEffect(() => {
		document.title = "Parago Admin";

		if (
			localStorage.getItem("token") != null &&
			localStorage.getItem("isAuthenticated")
		) {
			navigate("/dashboard");
		}
	}, []);

	return (
		<div className='flex flex-row font-primary overflow-hidden'>
			<TopLoadingBar
				color='#0043DC'
				progress={progress}
				height={10}
				onLoaderFinished={() => setProgress(0)}
			/>
			<div
				className='relative group w-6/12'
				style={{ height: "100vh" }}>
				<div className='absolute z-10 flex flex-col gap-8 top-52 left-10'>
					<img
						src={logo}
						alt='paraGO Logo'
						className='w-44'
						loading='lazy'
					/>
					<h1 className='text-white text-7xl font-extrabold w-10/12'>
						Travel to hidden gems
					</h1>
					<p className='text-white text-2xl w-9/12'>
						Go travel with ease and Explore new heights with paraGo
					</p>
					{/* <div className='flex flex-row gap-6 items-center relative top-20 bg-white w-5/12 py-4 pl-6 rounded-full'>
						<GrMapLocation
							size={35}
							className='gr-icon'
						/>
						<p className='flex flex-col'>
							<span className='font-bold text-2xl'>Enchanted River</span>
							Surigao Del Sur
						</p>
					</div> */}
				</div>
				<img
					src={pic}
					className='h-full w-full object-cover'
					style={{ height: "100%" }}
					loading='lazy'
				/>
				<div
					className='absolute inset-0 bg-primary opacity-50'
					style={{ height: "100%" }}></div>
			</div>
			<form
				ref={formRef}
				className='p-20 flex flex-col gap-6 m-auto md:w-7/12 lg:w-5/12'
				onSubmit={handleLogin}>
				<img
					src={parago_admin}
					className='w-36'
				/>
				<h1 className='font-extrabold text-7xl'>Welcome</h1>
				<p className='font-thin'>
					Keep your community engaged and informed by adding new events, updating
					itineraries, and creating new places for people to explore.
				</p>

				{/* Google button here
					<hr className='w-5/12 border-[#656565] ' />
					<p className='px-10 text-[#656565] text-sm'>OR</p>
					<hr className='w-5/12 border-[#656565] ' />
				</div> */}
				<label
					htmlFor='firstName'
					className='text-xs'>
					Email
				</label>
				<input
					autoFocus
					type='text'
					className={`border ${
						!isEmailValid ? "border-rose-500" : "border-gray"
					} pl-2 py-2 rounded-md w-full focus:outline-none`}
					required
					autoComplete='off'
					onChange={(e) => setEmail(e.target.value)}
				/>
				{emailMessage && (
					<p className='text-red-600 text-xs font-bold'>{emailMessage}</p>
				)}
				<label
					htmlFor='firstName'
					className='text-xs'>
					Password
				</label>
				<div className='relative'>
					{password.length > 0 &&
						(isVisible ? (
							<AiFillEyeInvisible
								onClick={() => setIsVisible(false)}
								className='absolute right-3 top-2 text-xl cursor-pointer text-[#b9b9b9] sm:top-3 hover:bg-[#656565] rounded-full duration-200'
							/>
						) : (
							<AiFillEye
								onClick={() => setIsVisible(true)}
								className='absolute right-3 top-2 text-xl cursor-pointer text-[#b9b9b9] sm:top-3 hover:bg-[#656565] rounded-full duration-200'
							/>
						))}
					<input
						type={isVisible ? "text" : "password"}
						className={`border ${
							!isPasswordValid ? "border-rose-500" : "border-gray"
						} pl-2 py-2 rounded-md w-full focus:outline-none`}
						required
						autoComplete='off'
						onChange={(e) => setPassword(e.target.value)}
					/>
					{passwordMessage && (
						<p className='text-red-600 mt-2 text-xs font-bold'>{passwordMessage}</p>
					)}
				</div>
				<Link
					to='/forgot-password'
					className='text-right underline'>
					Forgot password?
				</Link>
				<button
					type='submit'
					className='bg-primary py-2 text-white font-bold rounded-md hover:bg-[#0032a8] duration-100 md:mt-8'>
					Sign in
				</button>
				<p className='font-thin text-center'>
					Don&apos;t have an account yet?{" "}
					<Link
						to='/signup'
						className='font-bold italic hover:text-primary duration-150'>
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Home;
