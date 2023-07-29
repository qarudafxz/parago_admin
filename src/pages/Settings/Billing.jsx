import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Billing() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);
	return <div>Billing</div>;
}

export default Billing;
