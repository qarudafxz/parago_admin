export const buildUrl = (path) => {
	const PORT = process.env.PORT || 4000;
	return import.meta.env.DEV
		? `http://localhost:${PORT}/api${path}`
		: `/api${path}`;
};
