import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { getAdminId } from "../helpers/getAdminId.js";
import { getAdminEmail } from "../helpers/getAdminEmail.js";

import { subscribed } from "../data/benefits.js";

import { MdOutlinePayment } from "react-icons/md";

import { AiOutlineCheck } from "react-icons/ai";

import Logo from "../assets/logo.png";
import Gradient from "../assets/grd.png";

function Subscribe() {
	const navigate = useNavigate();
	const adminId = getAdminId();
	const emailAdd = getAdminEmail();
	const email = useRef();
	const [active, setIsActive] = useState(0);
	const [isClicked, setIsClicked] = useState(false);

	const makePayment = async () => {
		const URL = import.meta.env.DEV
			? `http://localhost:3001/api/auth/subscribe/${adminId}`
			: `/api/auth/subscribe/${adminId}`;

		try {
			await fetch(URL, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			}).then((res) => {
				switch (res.status) {
					case 200:
						console.log("Payment Successful");
						localStorage.setItem("isSub", true);
						setTimeout(() => {
							window.location.reload();
						}, 1500);
						break;
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	const approveSubscription = () => {
		return (
			isClicked && (
				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-md'>
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.5 }}
							transition={{
								duration: 0.8,
								delay: 0.5,
								ease: [0, 0.71, 0.2, 1.01],
							}}
							className='bg-white rounded-md px-28 py-14 place-items-center'>
							<MdOutlinePayment
								size={100}
								className='m-auto mb-4 text-primary'
							/>
							<h1 className='font-bold text-5xl text-center mb-4'>Proceed Payment</h1>
							<h1 className='text-md font-thin text-gray text-center'>
								Are you sure you want to avail ParaGO Pro+?
							</h1>
							<div className='flex flex-row gap-4 mt-8 place-content-center'>
								<button
									type='button'
									onClick={() => makePayment()}
									className='bg-primary py-2 px-8 rounded-md font-semibold text-white hover:bg-[#0032a8] duration-150'>
									Yes
								</button>
								<button
									type='button'
									onClick={() => setIsClicked(false)}
									className='border border-secondary py-2 px-8 rounded-md font-semibold text-secondary'>
									No
								</button>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			)
		);
	};

	useEffect(() => {
		email.current.focus();
		if (localStorage.getItem("isSub") === "true") {
			navigate("/dashboard");
		}
	}, []);

	return (
		<div className='w-full bg-zinc-200 md:p-6 xl:p-14'>
			<div className='bg-white rounded-xl p-6 flex gap-16 justify-between m-auto md:mt-2 md:w-full xl:mt-10 xl:w-9/12'>
				{/* form */}
				<div className='flex flex-col w-9/12 md:gap-2 xl:gap-4'>
					<h1 className='font-semibold text-xl'>Payment Details</h1>
					<form className='flex flex-col gap-4 mt-6'>
						<label
							htmlFor='email'
							className='text-zinc-600'>
							Email
						</label>
						<input
							type='email'
							ref={email}
							required
							placeholder={emailAdd}
							disabled
							className='p-2 border border-zinc-300 rounded-md'
						/>
						<div className='flex justify-between items-center'>
							<h1 className='text-lg font-semibold'>Payment</h1>
							<div className='flex gap-4 bg-zinc-200 py-2 px-4 rounded-md'>
								{["Paypal", "Credit Card"].map((item, idx) => {
									return (
										<button
											type='button'
											key={idx}
											onClick={() => setIsActive(idx)}
											className={`${
												active === idx
													? "bg-white text-black p-2 rounded-md shadow-md"
													: "bg-zinc-200 text-zinc-500"
											} py-2 px-4 rounded-md`}>
											{item}
										</button>
									);
								})}
							</div>
						</div>
						<label htmlFor='credit'>
							{active ? "Credit Card Number" : "Paypal Number"}
						</label>
						<input
							type='text'
							placeholder='XXXX XXXX XXXX XXXX'
							className='p-2 border border-zinc-300 rounded-md'
						/>
						<div className='flex justify-between gap-4'>
							<div className='flex flex-col gap-4 w-6/12'>
								<label htmlFor='expiry'>Expiry Date</label>
								<input
									type='text'
									placeholder='mm / yy'
									className='p-2 border border-zinc-300 rounded-md'
								/>
							</div>
							<div className='flex flex-col gap-4 w-6/12'>
								<label htmlFor='expiry'>CVV</label>
								<input
									type='text'
									placeholder='XXX'
									className='p-2 border border-zinc-300 rounded-md'
								/>
							</div>
						</div>
						<div className='flex flex-col gap-4 md:mt-4 xl:mt-10'>
							<div className='flex justify-between'>
								<h1 className='text-zinc-600'>Sub Total</h1>
								<h1>₱149.00</h1>
							</div>
							<div className='flex justify-between border-b border-zinc-400 pb-4'>
								<h1 className='text-zinc-600'>Service Fee</h1>
								<h1>₱5.00</h1>
							</div>
							<div className='flex justify-between'>
								<h1 className='text-zinc-600'>Total Amount</h1>
								<h1 className='text-2xl font-bold'>₱154.00</h1>
							</div>
						</div>
						<button
							type='button'
							onClick={() => setIsClicked(!isClicked)}
							className='bg-primary text-white font-bold rounded-xl py-4 mt-12'>
							Make Payment
						</button>
					</form>
				</div>
				{/* Benefits */}
				<div className='flex flex-col'>
					{/* 1 */}
					<div
						className={`grid place-content-center bg-zinc-900 w-full p-20 rounded-t-2xl `}
						style={{
							backgroundImage: `url(${Gradient})`,
							backgroundSize: "cover",
							backgroundPosition: "right",
							backgroundRepeat: "no-repeat",
						}}>
						<img
							src={Logo}
							alt='ParaGO Logo'
							className='w-24 h-24 m-auto my-4'
						/>
						<h1 className='font-bold text-white text-center md:text-2xl xl:text-3xl'>
							Subscribe and start using <span className='text-primary'>ParaGO</span>{" "}
							<span>Pro</span>+ features right now.
						</h1>
					</div>

					{/* 3 */}
					<div className='bg-zinc-200 rounded-b-2xl flex flex-col gap-6 p-10'>
						{subscribed.map((text, idx) => {
							return (
								<h1
									key={idx}
									className='flex gap-10 items-center text-zinc-700'>
									<AiOutlineCheck className='text-primary' />
									{text}
								</h1>
							);
						})}
					</div>
				</div>
			</div>
			{approveSubscription()}
		</div>
	);
}

export default Subscribe;
