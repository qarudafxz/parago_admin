import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Security() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);
	return <div>Security</div>;
}

export default Security;
