import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CardPage from "./pages/CardPage";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<WelcomePage />} />
				<Route path="/login" index element={<LoginPage />} />
				<Route path="/cards" index element={<CardPage />} />
				<Route path="/Users" index element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
