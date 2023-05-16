import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";

function ViewEvent() {
	const { id } = useParams();
	const [event, setEvent] = useState({});

	const fetchEvent = async () => {
		try {
			await fetch(buildUrl(`/what-event/${id}`), {
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => setEvent(data));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchEvent();
	}, []);

	return (
		<>
			<h1>Hello world</h1>
		</>
	);
}

export default ViewEvent;
