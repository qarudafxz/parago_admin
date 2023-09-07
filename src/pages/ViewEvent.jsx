import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";

import { HiOutlineLocationMarker, HiSun } from "react-icons/hi";
import { FaUsers, FaSearchLocation } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";

import { Skeleton } from "@mui/material";

import Itinerary from "../components/Itinerary";

function ViewEvent() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [event, setEvent] = useState({});
	const [isLoaded, setIsLoaded] = useState(true);

	const fetchEvent = async () => {
		try {
			setIsLoaded(false);
			await fetch(buildUrl(`/event/what-event/${id}`), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => setEvent(data.event));
			setIsLoaded(true);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchEvent();
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);

	useEffect(() => {
		if (event) {
			document.title = `${event?.eventName} | Parago Admin`;
		}
	}, [event]);

	return (
		<>
			<div
				className='w-full flex flex-col pb-10 customScroll'
				style={{ height: "100vh", overflow: "auto" }}>
				<div className='w-full bg-secondary h-80'>
					<h1 className='text-center m-auto text-white font-bold text-7xl mt-20'>
						Event Cover Here
					</h1>
				</div>
				<Link
					to='/events'
					className='pl-16 pt-16'>
					← Events
				</Link>
				<div className='flex flex-row p-16 gap-6'>
					<div className='flex flex-col w-6/12 gap-7'>
						{isLoaded ? (
							<h1 className='font-extrabold text-7xl text-primary'>
								{event.eventName}
							</h1>
						) : (
							<Skeleton
								variant='text'
								width={700}
								height={85}
							/>
						)}
						{isLoaded ? (
							<p
								className=''
								style={{ maxWidth: "250px" }}>
								{event.eventDesc}
							</p>
						) : (
							<Skeleton
								variant='box'
								width={700}
								height={160}
							/>
						)}
						{isLoaded ? (
							<div className='flex flex-row gap-4 items-center'>
								<HiOutlineLocationMarker size={20} />
								<p className='text-lg font-bold'>{event.eventAddr}</p>
							</div>
						) : (
							<Skeleton
								variant='text'
								width={700}
								height={30}
							/>
						)}
						<div className='flex flex-row gap-4'>
							{isLoaded ? (
								<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
									<p>₱</p>
									{event.price?.toFixed(2)}
								</p>
							) : (
								<Skeleton
									variant='text'
									width={100}
									height={85}
								/>
							)}
							{isLoaded ? (
								<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
									<FaUsers />
									{event.capacity} pax
								</p>
							) : (
								<Skeleton
									variant='text'
									width={100}
									height={85}
								/>
							)}
							{isLoaded ? (
								<p className='flex flex-row gap-4 items-center border border-primary px-4 py-2 rounded-md text-primary'>
									<FaSearchLocation />
									{event?.itineraries?.length} destinations
								</p>
							) : (
								<Skeleton
									variant='text'
									width={100}
									height={85}
								/>
							)}
						</div>
						<div className='flex flex-row gap-8 items-center'>
							{isLoaded ? (
								<div className='flex flex-col gap-2'>
									<h1 className='font-bold text-2xl'>Date Start</h1>
									<div className='border border-black rounded-md'>
										<div className='bg-[#BB0101] rounded-t-md px-4 py-2 font-bold text-white'>
											{isLoaded ? (
												<p className='text-center'>
													{new Date(event.dateStart).toLocaleDateString("en-US", {
														month: "long",
														year: "numeric",
													})}
												</p>
											) : (
												<Skeleton
													variant='text'
													width={100}
													height={30}
												/>
											)}
										</div>
										<div>
											{isLoaded ? (
												<p className='text-center font-bold shadow-2xl py-4 text-3xl'>
													{new Date(event.dateStart).toLocaleString("en-us", {
														day: "2-digit",
													})}
												</p>
											) : (
												<Skeleton
													variant='text'
													width={100}
													height={30}
												/>
											)}
										</div>
									</div>
								</div>
							) : (
								<Skeleton
									variant='square'
									width={110}
									height={110}
									className='rounded-md mt-10'
								/>
							)}
							{isLoaded ? (
								<div className='flex flex-col gap-2'>
									<h1 className='font-bold text-2xl'>Date End</h1>
									<div className='border border-black rounded-md'>
										<div className='bg-[#BB0101] rounded-t-md px-4 py-2 font-bold text-white'>
											<p className='text-center'>
												{new Date(event.dateEnd).toLocaleDateString("en-US", {
													month: "long",
													year: "numeric",
												})}
											</p>
										</div>
										<div>
											<p className='text-center font-bold shadow-2xl py-4 text-3xl'>
												{new Date(event.dateEnd).toLocaleString("en-us", {
													day: "2-digit",
												})}
											</p>
										</div>
									</div>
								</div>
							) : (
								<Skeleton
									variant='square'
									width={110}
									height={110}
									className='rounded-md mt-10'
								/>
							)}
							<div className='flex flex-col gap-4'>
								{isLoaded ? (
									<p className='flex items-center gap-4 text-secondary text-2xl font-bold'>
										<HiSun size={20} />
										{event.days > 1 ? `${event.days} days` : `${event.days} day`}
									</p>
								) : (
									<Skeleton
										variant='text'
										width={100}
										height={30}
									/>
								)}
								{isLoaded ? (
									<p className='flex items-center gap-4 text-primary text-2xl font-bold'>
										<BsMoonStarsFill size={20} />
										{event.nights > 1
											? `${event.nights} nights`
											: `${event.nights} night`}
									</p>
								) : (
									<Skeleton
										variant='text'
										width={100}
										height={30}
									/>
								)}
							</div>
						</div>
					</div>
					<div>
						<Itinerary
							itineraries={event.locations}
							isLoaded={isLoaded}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default ViewEvent;
