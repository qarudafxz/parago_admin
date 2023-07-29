import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Municipalities() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);
	return <div>Municipalities</div>;
}

export default Municipalities;
