import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage"
import NewRecipePage from "./pages/NewRecipePage";
import MyCookbook from "./pages/MyCookbook";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<WelcomePage />} />
				<Route path="/login" index element={<LoginPage />} />
				<Route path="/home" index element={<HomePage />} />
				<Route path="/new-recipe" index element={<NewRecipePage/>} />
				<Route path="/my-cookBook" index element={<MyCookbook/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
