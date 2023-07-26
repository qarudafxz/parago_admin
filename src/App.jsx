import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Verify from "./pages/Verified";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import IsVerified from "./pages/isVerified";
import Places from "./pages/Places";
import Navbar from "./components/Navbar";
import Itineraries from "./pages/Itineraries/Itineraries";
import ViewEvent from "./pages/ViewEvent";
import Analytics from "./pages/Analytics";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Preloader from "./components/Preloader";
import Locals from "./pages/Locals";
import Transportation from "./pages/locals/Transportation";
import Settings from "./pages/Settings";

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		demoAsyncCall().then(() => setLoading(false));
	}, []);

	if (loading) {
		return <Preloader />;
	}

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/verify'
					element={<Verify />}
				/>
				<Route
					path='users/:id/verify/:token'
					element={<IsVerified />}
				/>
				<Route
					path='/forgot-password'
					element={<ForgotPassword />}
				/>
				<Route
					path='/change-password/:email/token/:token'
					element={<ChangePassword />}
				/>
				<Route
					path='/*'
					element={
						<div className='font-primary flex flex-row'>
							<Navbar />
							<Routes>
								<Route
									path='dashboard'
									element={<Dashboard />}
								/>
								<Route
									path='events'
									element={<Events />}
								/>
								<Route
									path='places'
									element={<Places />}
								/>
								<Route
									path='itineraries'
									element={<Itineraries />}
								/>
								<Route
									path='event/:id'
									element={<ViewEvent />}
								/>
								<Route
									path='analytics'
									element={<Analytics />}
								/>
								<Route
									path='locals'
									element={<Locals />}
								/>
								<Route
									path='transportation'
									element={<Transportation />}
								/>
								<Route
									path='settings'
									element={<Settings />}
								/>
							</Routes>
						</div>
					}
				/>
			</Routes>
		</Router>
	);
}

function demoAsyncCall() {
	return new Promise((resolve) => setTimeout(resolve, 3000));
}

export default App;
