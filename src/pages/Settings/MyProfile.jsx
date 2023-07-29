import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { buildUrl } from "../../utils/buildUrl.js";

import { getAdminId } from "../../helpers/getAdminId.js";
import Avatar from "../../assets/avatar.svg";

import { Skeleton } from "@mui/material";

import { RiEdit2Line } from "react-icons/ri";

import EditProfile from "../../components/Settings/EditProfile.jsx";

function MyProfile() {
	const navigate = useNavigate();
	const adminID = getAdminId();
	const [isEdit, setIsEdit] = useState(false);
	const [myProfile, setMyProfile] = useState({});
	const [loading, setLoading] = useState(false);

	const fetchEvents = async () => {
		setLoading(true);
		try {
			await fetch(buildUrl(`/auth/admin/${adminID}`), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					setMyProfile(data.admin);
				})
				.then(() => console.log(myProfile));
			setTimeout(() => {
				setLoading(false);
			}, 1500);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchEvents();
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);
	return (
		<div className='w-full'>
			<h1>My Profile</h1>
			<div className='flex flex-col gap-2'>
				<div className='flex gap-4 mt-8 border border-zinc-200 rounded-md p-4 w-full md:gap-7 lg:gap-8 xl:gap-10'>
					<img
						src={Avatar}
						alt={myProfile?.firstName + " " + myProfile?.lastName}
						className='w-20 h-20'
					/>
					<div className='flex flex-col'>
						<h1 className='text-xl font-semibold'>
							{loading ? (
								<Skeleton
									variant='text'
									width={130}
									height={35}
								/>
							) : (
								myProfile?.firstName + " " + myProfile?.lastName
							)}
						</h1>
						<p className='text-zinc-500 font-medium'>
							{loading ? (
								<Skeleton
									variant='text'
									width={130}
									height={35}
								/>
							) : (
								myProfile?.role
							)}
						</p>
						<p className='text-zinc-500 font-thin'>
							{loading ? (
								<Skeleton
									variant='text'
									width={130}
									height={35}
								/>
							) : (
								myProfile?.municipality
							)}
						</p>
					</div>
				</div>
				<div className='p-4 border border-200'>
					<div className='flex justify-between items-center'>
						<h1 className='mb-5 font-semibold'>Personal Information</h1>
						<button
							onClick={() => setIsEdit(!isEdit)}
							className='flex gap-4 items-center text-zinc-400 border border-zinc-400 px-4 py-2 rounded-full'>
							<RiEdit2Line />
							Edit
						</button>
					</div>
					<div className='grid grid-cols-2 gap-16'>
						<div className='flex flex-col gap-2'>
							<p className='text-zinc-400'>First Name</p>
							<h1>
								{loading ? (
									<Skeleton
										variant='text'
										width={130}
										height={35}
									/>
								) : (
									myProfile?.firstName
								)}
							</h1>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-zinc-400'>Last Name</p>
							<h1>
								{loading ? (
									<Skeleton
										variant='text'
										width={130}
										height={35}
									/>
								) : (
									myProfile?.lastName
								)}
							</h1>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-zinc-400'>Email Address</p>
							<h1>
								{loading ? (
									<Skeleton
										variant='text'
										width={130}
										height={35}
									/>
								) : (
									myProfile?.email
								)}
							</h1>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-zinc-400'>Municipality</p>
							<h1>
								{loading ? (
									<Skeleton
										variant='text'
										width={130}
										height={35}
									/>
								) : (
									myProfile?.municipality
								)}
							</h1>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-zinc-400'>Number of Events Created</p>
							<h1>
								{loading ? (
									<Skeleton
										variant='text'
										width={130}
										height={35}
									/>
								) : (
									myProfile?.eventsCreated
								)}
							</h1>
						</div>
						<div className='flex flex-col gap-2'>
							<p className='text-zinc-400'>Total Bookings</p>
							<h1>
								{loading ? (
									<Skeleton
										variant='text'
										width={130}
										height={35}
									/>
								) : (
									myProfile?.totalBookings
								)}
							</h1>
						</div>
					</div>
				</div>
			</div>
			{isEdit && (
				<EditProfile
					setIsEdit={setIsEdit}
					isEdit={isEdit}
					myProfile={myProfile}
				/>
			)}
		</div>
	);
}

export default MyProfile;
