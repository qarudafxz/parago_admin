import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import { AiOutlineCloseCircle } from "react-icons/ai";

import municipalities from "../../helpers/municipalities.js";

import TopLoadingBar from "react-top-loading-bar";

function EditProfile({ ...props }) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [municipality, setMunicipality] = useState("");
	const [progress, setProgress] = useState(0);

	const handleEditProfile = async (e, id) => {
		const URL = import.meta.env.DEV
			? `http://localhost:3001/api/auth/edit-profile/${id}/`
			: `/api/auth/edit-profile/${id}/`;

		e.preventDefault();
		try {
			setProgress(30);
			await fetch(URL, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					firstName,
					lastName,
					municipality,
				}),
			}).then((res) => {
				if (res.ok || res.status === 200) {
					toast.success("Profile Updated!", {
						position: "top-right",
						autoClose: 2000,
						hideProgressBar: false,
						closeOnClick: false,
						pauseOnHover: false,
						draggable: true,
						progress: undefined,
						theme: "light",
					});

					if (firstName && lastName && municipality) {
						localStorage.setItem("adminName", firstName + " " + lastName);
						localStorage.setItem("adminName", firstName + " " + lastName);
					}

					setProgress(100);
					setTimeout(() => {
						props.setIsEdit(false);
						props.fetchProfile();
					}, 3000);
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	const handleFormEditProfile = (event) => {
		if (event.key === "Escape") props.setIsEdit(false);
	};

	useEffect(() => {
		const handleCancelEditProfile = (event) => {
			handleFormEditProfile(event);
		};

		window.addEventListener("keydown", handleCancelEditProfile);

		return () => {
			window.removeEventListener("keydown", handleCancelEditProfile);
		};
	}, []);
	return (
		<>
			<div>
				<ToastContainer />
				<TopLoadingBar
					color='#0043DC'
					progress={progress}
					height={10}
					onLoaderFinished={() => setProgress(0)}
				/>
				<AnimatePresence>
					{props.isEdit && (
						<div
							className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
								blur ? "backdrop-blur-lg" : ""
							}`}>
							<motion.form
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.5 }}
								transition={{
									duration: 0.8,
									delay: 0.5,
									ease: [0, 0.71, 0.2, 1.01],
								}}
								className='flex flex-col gap-4 p-10 w-5/12 bg-white absolute z-10 left-62 top-42 bg-blend-overlay shadow-2xl'>
								<div className='flex justify-end items-center gap-4'>
									<h1 className='font-thin text-[#808080]'>Press Esc to close</h1>
									<button
										type='button'
										className='text-primary'
										onClick={() => props.setIsEdit(!props.isEdit)}>
										<AiOutlineCloseCircle size={40} />
									</button>
								</div>
								<h1 className='text-left font-bold text-3xl py-2'>Edit Profile</h1>
								<div className='grid grid-cols-2 gap-4'>
									<div className='flex flex-col gap-2'>
										<p className='text-sm font-thin'>First Name</p>
										<input
											type='text'
											placeholder={props.myProfile.firstName}
											onChange={(e) => setFirstName(e.target.value)}
											className='py-2 pl-4 border border-zinc-300 focus: outline-none rounded-sm'
										/>
									</div>
									<div className='flex flex-col gap-2'>
										<p className='text-sm font-thin'>Last Name</p>
										<input
											type='text'
											placeholder={props.myProfile.lastName}
											onChange={(e) => setLastName(e.target.value)}
											className='py-2 pl-4 border border-zinc-300 focus: outline-none rounded-sm'
										/>
									</div>
								</div>

								<div className='flex flex-col gap-2'>
									<p className='text-sm font-thin'>Municipality</p>
									<Dropdown
										className='rounded-md text-primary focus:outline-none'
										options={municipalities}
										onChange={(municipalities) => setMunicipality(municipalities?.value)}
										placeholder={props.myProfile.municipality}
									/>
								</div>
								<button
									type='button'
									onClick={(e) => handleEditProfile(e, props.myProfile._id)}
									className='bg-primary text-white mt-14 py-2 px-4 rounded-md flex justify-center'>
									Save Profile
								</button>
							</motion.form>
						</div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}

export default EditProfile;
