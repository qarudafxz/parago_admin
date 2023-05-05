import React, { useState, useEffect } from "react";
import { ReactComponent as SignupImage } from "../assets/bg_for_signup.svg";
import logo from "../assets/logo.png";
import { buildUrl } from "../utils/buildUrl.js";

function Home() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleGoogleLogin = async () => {
		alert("Hello world");
	};

	const registerUser = async (e) => {
		e.preventDefault();
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

	return (
		<div className='font-primary flex flex-row'>
			<div className='flex flex-col'>
				<div className='bg-[#0043DC]'>
					<SignupImage />
				</div>
				<div className='bg-[#FF7900] pl-10 py-10 flex flex-col gap-2'>
					<img
						src={logo}
						alt='paraGO Logo'
						className='w-12'
					/>
					<h1 className='text-5xl font-extrabold text-white'>
						Travel to hidden gems
					</h1>
					<p className='text-white font-lg text-xl w-10/12'>
						Go travel with ease and Explore ew heights with paraGO
					</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
