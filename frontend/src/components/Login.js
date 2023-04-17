
import React, { useState } from "react";
import axios from "axios";

function Login({option}) {
   let loginName;
   let loginPassword;

   const [message, setMessage] = useState("");
   let bp = require("./Path.js");
   let storage = require("../tokenStorage.js");

   // sends api fetch request to login user
   const doLogin = async (event) => {
      event.preventDefault();

      let obj = { login: loginName.value, password: loginPassword.value };
      let js = JSON.stringify(obj);

      let config = {
         method: "post",
         url: bp.buildPath("api/login"),
         headers: {
            "Content-Type": "application/json",
         },
         data: js,
      };

      axios(config)
         .then(function (response) {
            let res = response.data;
            console.log(res)
            if (res.error) {
               setMessage("User/Password combination incorrect");
            } else {
               storage.storeToken(res);

               // capturing user data from fetch response
               let userId = res.id;
               let firstName = res.fn;
               let lastName = res.ln;

               // saving user data onto localStorage; in place of cookies
               let user = {firstName:firstName, lastName:lastName, id:userId};
               localStorage.setItem("user_data", JSON.stringify(user));
               console.log(localStorage.getItem('user_data'))

               // window change
               window.location.href = "/home";
               
               //show jwt to test
            }
         })
         // error catching
         .catch(function (error) {
            setMessage("User/Password combination incorrect");
            console.log(error);
         });
   };
  
  return (
    <div id="#login" className="form-card login-card" option={option}> 
      <form onSubmit={doLogin}>
        <h5 id="inner-title" className="mb-2">PLEASE LOG IN</h5>
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
          className="buttons btn btn-dark mt-3 mb-1"
          value="Login"
          onClick={doLogin}
        />
      </form>
      <span id="loginResult">{message}</span>
    </div>
  );
}
export default Login;