import { useEffect } from "react";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

export const useFetch = (URL, isLoaded, setIsLoaded) => {
	const isAuth = () => {
		return token ? true : false;
	};

	useEffect(() => {
		if (isAuth()) {
			setIsLoaded(false);
			fetch(URL, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setIsLoaded(true);
					return { data, isLoaded };
				})
				.catch((err) => {
					console.error(err);
					toast.error("An error occurred", {
						position: "top-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
				});
		}
	}, [URL]);
};
