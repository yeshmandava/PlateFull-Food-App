
import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { SaveCookie, ReadCookie } from "../components/Cookies";
import '../stylesheets/Login.css'

function Login() {
  let loginName;
  let loginPassword;

  const [message, setMessage] = useState("");
  let bp = require("./Path.js");
  let storage = require("../tokenStorage.js");


  //const response = await fetch(bp.buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
  const doLogin = async (event) => {
		event.preventDefault();

		var obj = { login: loginName.value, password: loginPassword.value };
		var js = JSON.stringify(obj);

		var config = {
			method: "post",
			url: bp.buildPath("api/login"),
			headers: {
				"Content-Type": "application/json",
			},
			data: js,
		};

		axios(config)
			.then(function (response) {
				var res = response.data;
            console.log(res)
				if (res.error) {
					setMessage("User/Password combination incorrect");
				} else {
					storage.storeToken(res);
               console.log(storage.retrieveToken())

               // capturing user data from fetch response
					var userId = res.accessToken.id;
					var firstName = res.accessToken.fn;
					var lastName = res.accessToken.ln;

               // saving user data onto localStorage; in place of cookies
					var user = {firstName:firstName, lastName:lastName, id:userId};
					localStorage.setItem("user_data", JSON.stringify(user));
               console.log(localStorage.getItem('user_data'))
               console.log(storage.retrieveToken())

               // window change
					window.location.href = "/home";
               
               //show jwt to test
               console.log(localStorage.getItem('token_data'))
				}
			})
         // error catching
			.catch(function (error) {
				console.log(error);
			});
	};
  
  return (
    <div id="loginDiv" className="login-card">
      <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span>
        <br />
        <input
          type="text"
          id="loginName"
          placeholder="Username"
          ref={(c) => (loginName = c)}
        />
        <br />
        <input
          type="password"
          id="loginPassword"
          placeholder="Password"
          ref={(c) => (loginPassword = c)}
        />
        <br />
        <input
          type="submit"
          id="loginButton"
          className="buttons"
          value="Login"
          onClick={doLogin}
        />
      </form>
      <span id="loginResult">{message}</span>
    </div>
  );
}
export default Login;