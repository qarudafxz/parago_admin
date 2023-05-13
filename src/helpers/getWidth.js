export const getWidth = (windowWidth) => {
	if (windowWidth >= 275 && windowWidth <= 375) {
		return "245px";
	} else if (windowWidth > 375 && windowWidth <= 425) {
		return "245px";
	} else if (windowWidth > 425 && windowWidth <= 1024) {
		return "245px";
	} else if (windowWidth > 1024 && windowWidth <= 1440) {
		return "245px";
	} else if (windowWidth > 1440 && windowWidth <= 2560) {
		return "245px";
	} else {
		return "245px";
	}
};
