/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Skeleton from "@mui/material/Skeleton";

function Itinerary({ itineraries, isLoaded }) {
	const tableHeader = [
		"Date",
		"Destination",
		"Activity",
		"Time Start",
		"Time End",
	];
	return (
		<div>
			<h1 className='text-5xl font-bold mb-4'>Itineraries</h1>
			{isLoaded ? (
				<table className='table'>
					<thead className='bg-primary'>
						<tr>
							{tableHeader.map((header, idx) => {
								return (
									<th
										key={idx}
										className='border border-black px-4 py-2 text-md text-white'>
										{header}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{itineraries?.map((itinerary) => (
							<tr
								key={itinerary._id}
								className='border border-black'>
								<td className='text-center'>
									{new Date(itinerary.date).toLocaleString("en-us", {
										month: "long",
										day: "numeric",
										year: "numeric",
									})}
								</td>
								<td className='text-center'>{itinerary.locName}</td>
								<td>{itinerary.desc}</td>
								<td className='text-center'>{itinerary.eventStart}</td>
								<td className='text-center'>{itinerary.eventEnd}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<Skeleton
					variant='rectangular'
					width={"260%"}
					height={150}
				/>
			)}
		</div>
	);
}

export default Itinerary;
