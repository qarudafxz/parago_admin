/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { LOCATION_TYPE } from "../data/Icons";
import { SlLocationPin } from "react-icons/sl";
import { Skeleton } from "@mui/material";

export const PlacesCard = ({ ...props }) => {
	return (
		<div className='mt-6 grid grid-cols-4 gap-2 overflow-y-auto md:max-h-42 xl:max-h-xlEvents pb-32'>
			{props.places?.places?.length > 0 &&
				props.places?.places?.map((place) => {
					return (
						<div
							key={place._id}
							className='flex flex-col gap-1 p-6 bg-white shadow-xl rounded-2xl border border-zinc-300'>
							{props.loading ? (
								<Skeleton
									variant='rectangle'
									height={60}
									width={"100%"}
								/>
							) : (
								<img
									src={place.image}
									alt={place.name}
									className='w-full h-24 object-cover rounded-md'
								/>
							)}
							{props.loading ? (
								<Skeleton
									variant='text'
									width={"100%"}
									height={55}
								/>
							) : (
								<h1 className='text-[24px] font-bold'>{place.name}</h1>
							)}
							{props.loading ? (
								<Skeleton
									variant='text'
									width={"100%"}
								/>
							) : (
								<h1 className='text-[15px] truncate md:text-sm xl:text-lg'>
									{place.desc}
								</h1>
							)}
							{props.loading ? (
								<div className='flex gap-2'>
									<Skeleton
										variant='circle'
										width={35}
										height={30}
										className='rounded-full'
									/>
									<Skeleton
										variant='text'
										width={"100%"}
									/>
								</div>
							) : (
								<div className='flex gap-2 items-center'>
									<SlLocationPin className='text-primary' />
									<p className='text-[#808080] md:text-xs xl:text-sm'>{place.address}</p>
								</div>
							)}
						</div>
					);
				})}{" "}
		</div>
	);
};
