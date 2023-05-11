import jwt_decode from "jwt-decode";
import { buildUrl } from "../utils/buildUrl";

export const handleGoogleLogin = async (res) => {
	const admin = await jwt_decode(res.credential);

	try {
		await fetch(buildUrl("/auth/googleLogin"), {
			method: "POST",
			head: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: admin.given_name,
				lastName: admin.family_name,
				email: admin.email,
				password: import.meta.env.VITE_DEFAULT_PASSWORD,
			}),
		}).then((res) => console.log(res));
		// .then((data) => {
		// 	if (data.ok) {
		// 		localStorage.setItem("token", data.admin.token);
		// 		setTimeout(() => {
		// 			window.location.href = "/dashboard";
		// 		}, 2000);
		// 	}
		// });
	} catch (err) {
		console.error(err);
	}
};
