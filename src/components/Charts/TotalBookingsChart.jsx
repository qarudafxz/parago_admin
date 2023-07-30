import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function ChartComponent() {
	const chartRef = useRef(null); // Reference to the chart instance

	useEffect(() => {
		const data = [
			{ date: "May 20, 2023", count: 10 },
			{ date: "May 21, 2023", count: 20 },
			{ date: "May 22, 2023", count: 15 },
			{ date: "May 23, 2023", count: 25 },
			{ date: "May 24, 2023", count: 22 },
			{ date: "May 25, 2023", count: 30 },
			{ date: "May 26, 2023", count: 14 },
		];

		const labels = data.map((row) => row.date);
		const counts = data.map((row) => row.count);

		if (chartRef.current) {
			// If the chart already exists, destroy it before creating a new one
			chartRef.current.destroy();
		}

		chartRef.current = new Chart(document.getElementById("acquisitions"), {
			type: "bar",
			data: {
				labels: labels,
				datasets: [
					{
						label: "Total Bookings",
						data: counts,
						borderColor: "#0043DC",
						backgroundColor: "#0043DC",
						pointBackgroundColor: "#0043DC",
						pointBorderColor: "#fff",
						pointHoverRadius: 6,
						pointHoverBackgroundColor: "#0043DC",
						pointHoverBorderColor: "#fff",
						pointHoverBorderWidth: 2,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							stepSize: 5,
						},
					},
				},
			},
		});
	}, []);

	return (
		<div className='shadow-xl p-10 rounded-xl h-96'>
			<h1 className='font-bold text-2xl'>Total Bookings</h1>
			<div
				className='chart-container'
				style={{ width: "100%", height: "300px" }}>
				<canvas id='acquisitions'></canvas>
			</div>
		</div>
	);
}

export default ChartComponent;
