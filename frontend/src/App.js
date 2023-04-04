import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CardPage from "./pages/CardPage";
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
				<Route path="/cards" index element={<CardPage />} />
				<Route path="/Users" index element={<HomePage />} />
				<Route path="/New-Recipe" index element={<NewRecipePage/>} />
				<Route path="/My-CookBook" index element={<MyCookbook/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
