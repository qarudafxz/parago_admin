import React, { useEffect, useState } from "react";
import { buildUrl } from "../utils/buildUrl.js";
import { getAdminId } from "../helpers/getAdminId.js";

function NumberEvents() {
	const [data, setFetchData] = useState({});
	const adminID = getAdminId();

	const fetchData = async () => {
		await fetch(buildUrl(`/auth/admin/${adminID}`), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => setFetchData(data));
		console.log(data.admin.eventsCreated);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='absolute'>{/* <h1>{data.admin.eventsCreated}</h1> */}</div>
	);
}

export default NumberEvents;
