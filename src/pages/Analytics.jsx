import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Analytics() {
	const navigate = useNavigate();
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);
	return (
		<>
			<h1 className='w-full font-extrabold text-center m-auto text-7xl'>
				Page Underconstruction
			</h1>
		</>
	);
}

export default Analytics;
