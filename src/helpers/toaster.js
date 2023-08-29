import { toast } from "react-toastify";

const config = {
	position: "top-right",
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
};

export const toaster = (type, message) => {
	switch (type) {
		case "success":
			toast.success(message, {
				...config,
			});
			break;
		case "error":
			toast.error(message, {
				...config,
			});
			break;
		case "warning":
			toast.warning(message, {
				...config,
			});
			break;
		default:
			toast.info(message, {
				...config,
			});
			break;
	}
};
