import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Verify from "./pages/Verified";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import IsVerified from "./pages/isVerified";
import Places from "./pages/Places";

function App() {
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
					path='/dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='/events'
					element={<Events />}
				/>
				<Route
					path='/users/:id/verify/:token'
					element={<IsVerified />}
				/>
				<Route
					path='/places'
					element={<Places />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
