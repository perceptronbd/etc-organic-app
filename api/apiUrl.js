const apiUrl = () => {
	let url;
	const node_env = process.env.NODE_ENV;

	if (node_env === "development") {
		url = `http://${process.env.EXPO_PUBLIC_LOCAL_IP}:5000/mobile`;
	} else {
		url = process.env.EXPO_PUBLIC_SERVER_API;
	}
	return url;
};

export default apiUrl;
