import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
	Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Verify from "./pages/Verified";
import Dashboard from "./pages/Dashboard";
import EventCalendar from "./pages/EventCalendar";
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
import Bookings from "./pages/Bookings";

import SettingsNavbar from "./components/SettingsNavbar";

import Subscribe from "./components/Subscribe";

//settings

import MyProfile from "./pages/Settings/MyProfile";
import Security from "./pages/Settings/Security";
import Municipalities from "./pages/Settings/Municipalities";
import Billing from "./pages/Settings/Billing";

import Pam from "../src/assets/pam.webp";

function App() {
	const [loading, setLoading] = useState(true);
	const [showGreetings, setShowGreetings] = useState(false);
	const [isAnimating, setIsAnimating] = useState(true);

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
							<AnimatePresence>
								{showGreetings && (
									<motion.div
										initial={{ opacity: 0, scale: 0.5 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 1.2,
											delay: 0.1,
											type: "spring",
											stiffness: 260,
											damping: 20,
										}}
										exit={{ opacity: 0, scale: 0.5 }}
										className='absolute z-10 bottom-24 right-32 bg-white text-xs p-4 rounded-md shadow-2xl w-56 '>
										<h1 className='text-center'>
											Hi! I&apos;m{" "}
											<span className='italic font-bold text-primary'>Pam.</span> Introduce
											your hidden gems to everyone!
										</h1>
									</motion.div>
								)}
							</AnimatePresence>
							<motion.div
								animate={isAnimating ? { y: [0, 10, 0] } : {}}
								transition={isAnimating ? { duration: 1, repeat: Infinity } : {}}
								className='w-24 h-24 absolute bottom-6 right-10 '>
								<motion.img
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={
										isAnimating && {
											duration: 0.8,
											delay: 0.4,
											ease: [0, 0.71, 0.2, 1.01],
										}
									}
									onMouseEnter={() => {
										setShowGreetings(true);
										setIsAnimating(false);
									}}
									onMouseLeave={() => {
										setShowGreetings(false);
										setIsAnimating(true);
									}}
									src={Pam}
									alt='Pam the pint-sized voyager'
									className='hover:cursor-zoom-in'
								/>
							</motion.div>
							<Navbar />
							<Routes>
								<Route
									path='dashboard'
									element={<Dashboard />}
								/>{" "}
								<Route
									path='/subscribe'
									element={<Subscribe />}
								/>
								<Route
									path='calendar'
									element={<EventCalendar />}
								/>
								<Route
									path='events'
									element={<Events />}
								/>
								<Route
									path='bookings'
									element={<Bookings />}
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
								<Route
									path='/settings'
									element={
										<div className='p-10 bg-zinc-100 w-full'>
											<h1 className='font-bold text-3xl mb-4'>Account Settings</h1>
											<div className='font-primary flex flex-row gap-4 bg-white p-4 rounded-2xl shadow-2xl'>
												<SettingsNavbar />
												<Outlet />
											</div>
										</div>
									}>
									<Route
										path=''
										element={<Navigate to='my-profile' />}
									/>
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
