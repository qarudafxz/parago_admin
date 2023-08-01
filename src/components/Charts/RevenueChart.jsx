import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function RevenueChart() {
	const chartRef = useRef(null);

	const data = {
		labels: ["May 2023", "June 2023", "July 2023"],
		datasets: [
			{
				data: [5000, 8000, 12000], // Replace with your earnings data for the past 3 years
				backgroundColor: ["#0043DC", "#FF7900", "#E5E5E5"], // Customize the colors for each year
				hoverBackgroundColor: ["#0043DC", "#FF7900", "#E5E5E5"],
			},
		],
	};

	useEffect(() => {
		if (chartRef.current) {
			// If the chart already exists, destroy it before creating a new one
			chartRef.current.destroy();
		}

		chartRef.current = new Chart(document.getElementById("circular-chart"), {
			type: "doughnut",
			data: data,
			options: {
				cutout: "60%", // Adjust the inner cutout size (hole size) of the doughnut
				plugins: {
					legend: {
						display: true,
						position: "right",
					},
					tooltip: {
						callbacks: {
							label: (tooltipItem) => {
								const dataset = data.datasets[tooltipItem.datasetIndex];
								const value = dataset.data[tooltipItem.index];
								const percentage = (
									(value / dataset.data.reduce((acc, curr) => acc + curr)) *
									100
								).toFixed(2);
								return `${
									dataset.labels[tooltipItem.index]
								}: $${value} (${percentage}%)`;
							},
						},
					},
				},
			},
		});
	}, []);

	return (
		<div className='bg-white rounded-md shadow-2xl p-10 h-96'>
			<div className='flex justify-between'>
				<h1 className='font-bold text-xl'>Total Earnings for the Past 3 Months</h1>
				<Dropdown
					className='text-sm'
					options={data?.labels}
					placeholder='Select Month'
				/>
			</div>
			<div
				className='chart-container'
				style={{ width: "100%", height: "300px" }}>
				<canvas id='circular-chart'></canvas>
			</div>
		</div>
	);
}

export default RevenueChart;
