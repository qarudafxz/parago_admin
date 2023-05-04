import React, { useEffect } from "react";

function Home() {
	const handleGoogleLogin = async () => {
		alert("Hello world");
	};

	useEffect(() => {
		google.accounts.id.initialize({
			client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
			callback: handleGoogleLogin,
		});

		google.accounts.id.renderButton(document.getElementById("googleLogin"), {
			theme: "outline",
			size: "large",
			text: "continue_with",
			shape: "rectangular",
			width: `${
				window.innerWidth >= 275 && window.innerWidth <= 375
					? 245
					: window.innerWidth > 375 && window.innerWidth <= 425
					? 250
					: window.innerWidth > 425 && window.innerWidth <= 1024
					? 295
					: window.innerWidth > 1024 && window.innerWidth <= 1440
					? 350
					: window.innerWidth > 1440 && window.innerWidth <= 2560
					? 400
					: 450
			}`,
			height: "50",
			longtitle: "true",
			onsuccess: handleGoogleLogin,
			onfailure: handleGoogleLogin,
		});
	}, []);

	return <div></div>;
}

export default Home;
