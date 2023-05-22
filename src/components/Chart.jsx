import React, { useEffect } from "react";
import Chart from "chart.js/auto";

function ChartComponent() {
	useEffect(() => {
		(async function () {
			const data = [
				{ date: "May 20, 2023", count: 10 },
				{ date: "May 21, 2023", count: 20 },
				{ date: "May 22, 2023", count: 15 },
				{ date: "May 23, 2023", count: 25 },
				{ date: "May 24, 2023", count: 22 },
				{ date: "May 25, 2023", count: 30 },
				{ date: "May 26, 2023", count: 14 },
			];

			new Chart(document.getElementById("acquisitions"), {
				type: "bar",
				options: {
					aspectRatio: 1,
				},
				data: {
					labels: data.map((row) => row.date),
					datasets: [
						{
							label: "Total Bookings",
							data: data.map((row) => row.count),
							borderColor: "#0043DC",
							backgroundColor: "#0043DC",
						},
					],
				},
			});
		})();
	}, []);

	return (
		<div className='w-4/12'>
			<canvas id='acquisitions'></canvas>
		</div>
	);
}

export default ChartComponent;
