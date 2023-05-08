import jwt_decode from "jwt_decode";
import { buildUrl } from "../utils/buildUrl";
import { useNavigate } from "react-router-dom";

export const googleSignup = async (response) => {
	const navigate = useNavigate();
	const user = await jwt_decode(response.credential);

	try {
		await fetch(buildUrl("/auth/googleLogin"), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: user.given_name,
				lastName: user.last_name,
				email: user.email,
				password: import.meta.VITE_DEFAULT_PASSWORD,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.ok) {
					const token_expiration = new Date().getTime() + 5 * 60 * 1000; // 5 minutes
					localStorage.setItem("token", data.token);
					localStorage.setItem("token_expiration", token_expiration);
					localStorage.setItem(
						"user",
						JSON.stringify(`${data.user.firstName} ${data.user.lastName}`)
					);
					localStorage.setItem("userID", data.user._id);
					setTimeout(navigate("/dashboard"), 1000);
				} else {
					alert("Wrong credentials!");
					return;
				}
			});
	} catch (err) {
		console.error(err);
	}
};
