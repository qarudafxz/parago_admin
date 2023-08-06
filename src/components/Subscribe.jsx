import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { getAdminId } from "../helpers/getAdminId.js";
import { getAdminEmail } from "../helpers/getAdminEmail.js";
import { buildUrl } from "../utils/buildUrl.js";

import { MdOutlinePayment } from "react-icons/md";

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
			<div>
				<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-md'>
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
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
							Are you sure you to avail ParaGO Pro+?
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
				</div>
			</div>
		);
	};

	useEffect(() => {
		email.current.focus();
		if (localStorage.getItem("isSub") === "true") {
			navigate("/dashboard");
		}
	}, []);
	return (
		<div className='w-full bg-zinc-200 p-14'>
			<div className='bg-white rounded-xl p-6 flex justify-between'>
				{/* form */}
				<div className='flex flex-col gap-4 w-5/12'>
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
						<label htmlFor='credit'>Credit Card Number</label>
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
						<div className='flex flex-col gap-4 mt-10'>
							<div className='flex justify-between'>
								<h1 className='text-zinc-600'>Sub Total</h1>
								<h1>₱149.00</h1>
							</div>
							<div className='flex justify-between border-b border-zinc-400 pb-4'>
								<h1 className='text-zinc-600'>Platform Fee</h1>
								<h1>₱5.00</h1>
							</div>
							<div className='flex justify-between'>
								<h1 className='text-zinc-600'>Total Amount</h1>
								<h1 className='text-2xl font-bold'>₱154.00</h1>
							</div>
						</div>
						<button
							onClick={() => setIsClicked(!isClicked)}
							className='bg-primary text-white font-bold rounded-xl py-4 mt-12'>
							Make Payment
						</button>
					</form>
				</div>
				{/* Benefits */}
				<div className=''>
					<h1 className='font-bold text-3xl'>Benefits</h1>
				</div>
			</div>
			{isClicked && approveSubscription()}
		</div>
	);
}

export default Subscribe;
