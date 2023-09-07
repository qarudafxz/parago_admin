import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Billing() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}

		document.title = "Billing | Parago Admin";
	}, []);
	return <div>Billing</div>;
}

export default Billing;
