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
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Preloader from "./components/Preloader";
import Locals from "./pages/Locals";
import Transportation from "./pages/locals/Transportation";
import Tourism from "./pages/locals/Tourism";
import Msme from "./pages/locals/Msme";

import SettingsNavbar from "./components/SettingsNavbar";

//settings

import MyProfile from "./pages/Settings/MyProfile";
import Security from "./pages/Settings/Security";
import Municipalities from "./pages/Settings/Municipalities";
import Billing from "./pages/Settings/Billing";

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
									path='locals'
									element={<Locals />}
								/>
								<Route
									path='transportation'
									element={<Transportation />}
								/>
								<Route
									path='tourism'
									element={<Tourism />}
								/>
								<Route
									path='local-stores'
									element={<Msme />}
								/>
								<Route path='settings'>
									<Route
										path='/settings/*'
										element={
											<div className='p-10 bg-zinc-100 w-full'>
												<h1 className='font-bold text-3xl mb-4'>Account Settings</h1>
												<div className='font-primary flex flex-row gap-4 bg-white p-4 rounded-2xl shadow-2xl'>
													<SettingsNavbar />
													<Routes>
														<Route
															path='my-profile'
															element={<MyProfile />}
														/>
														<Route
															path='security'
															element={<Security />}
														/>
														<Route
															path='municipalities'
															element={<Municipalities />}
														/>
														<Route
															path='billing'
															element={<Billing />}
														/>
													</Routes>
												</div>
											</div>
										}
									/>
								</Route>
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
