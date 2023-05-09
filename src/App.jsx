import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Verify from "./pages/Verified";
import isVerified from "./pages/isVerified";
import Dashboard from "./pages/Dashboard";

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
					path='/users/:id/token/:token'
					element={<isVerified />}
				/>
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
