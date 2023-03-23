import React from "react";

function Welcome() {
	return (
		<div className="welcome-container">
			<div className="left-section">
				<h1 className="welcome-title">PlateFull</h1>
				<p className="welcome-description">
					Share and discover delicious recipes with your friends.
				</p>
				<img
					src="https://example.com/placeholder-image.png"
					alt="PlateFull logo"
					className="logo"
				/>
			</div>
			<div className="right-section">
                <h2 className="welcome-grabber">Join PlateFull Today</h2>
				<button className="login-button">Login</button>
				<button className="register-button">Sign Up</button>
			</div>
		</div>
	);
}
export default Welcome;
