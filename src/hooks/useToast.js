import { toast } from "react-toastify";

export const useToast = (message, type) => {
	switch (type) {
		case "success":
			toast.success(message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			break;

		case "error":
			toast.error(message, {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			break;
	}
};
