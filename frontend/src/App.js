import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage"
import NewRecipePage from "./pages/NewRecipePage";
import Cookbook from "./pages/Cookbook";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<WelcomePage />} />
				<Route path="/login" index element={<LoginPage />} />
				<Route path="/home" index element={<HomePage />} />
				<Route path="/cookbook" index element={<Cookbook/>} />
				<Route path="/new-recipe" index element={<NewRecipePage/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
