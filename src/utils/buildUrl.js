export const buildUrl = (path) => {
	const PORT = 3001;
	return import.meta.env.DEV
		? `http://localhost:${PORT}/api${path}`
		: `/api${path}`;
};
