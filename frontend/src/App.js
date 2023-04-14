import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage"
import AddRecipePage from "./pages/AddRecipePage";
import Cookbook from "./pages/Cookbook";
import CurrentRecipePage from "./pages/CurrentRecipePage";
import EditRecipePage from "./pages/EditRecipePage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<WelcomePage />} />
				<Route path="/login" index element={<LoginPage />} />
				<Route path="/home" index element={<HomePage />} />
				<Route path="/cookbook" index element={<Cookbook/>} />
				<Route path="/add-recipe" index element={<AddRecipePage/>} />
            <Route path="/edit-recipe" index element={<EditRecipePage/>} />
				<Route path="/current-recipe" index element={<CurrentRecipePage/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
