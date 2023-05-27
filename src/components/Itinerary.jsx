import React from "react";

function Itinerary({ itineraries }) {
	return (
		<div>
			<h1 className='text-5xl font-bold mb-4'>Itineraries</h1>
			<table className='table'>
				<thead className='bg-primary'>
					<tr>
						<th className='border border-black px-4 py-2 text-xl text-white'>Date</th>
						<th className='border border-black px-12 py-2 text-xl text-white'>
							Destination
						</th>
						<th className='border border-black px-12 py-2 text-xl text-white'>
							Activity
						</th>
						<th className='border border-black px-4 py-2 text-md text-white'>
							Time Start
						</th>
						<th className='border border-black px-4 py-2 text-md text-white'>
							Time End
						</th>
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
		</div>
	);
}

export default Itinerary;