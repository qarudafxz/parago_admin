import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Security() {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}

		document.title = "Security | Parago Admin";
	}, []);

	return (
		<div className='w-full'>
			<h1>Security</h1>
			<div className='flex flex-col gap-2'>
				<p>Hello</p>
			</div>
		</div>
	);
}

export default Security;
