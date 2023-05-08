export const getWidth = (windowWidth) => {
	if (windowWidth >= 275 && windowWidth <= 375) {
		return "245";
	} else if (windowWidth > 375 && windowWidth <= 425) {
		return "250";
	} else if (windowWidth > 425 && windowWidth <= 1024) {
		return "295";
	} else if (windowWidth > 1024 && windowWidth <= 1440) {
		return "350";
	} else if (windowWidth > 1440 && windowWidth <= 2560) {
		return "400";
	} else {
		return "450";
	}
};
