import React, { useState } from 'react';
import axios from 'axios';

import '../stylesheets/Register.css'

export default function Register()
{
   // textbox inputs
   let firstName ;
   let lastName;
   let email;
   let login;
   let password;

   const [message, setMessage] = useState('');
   let bp = require("./Path.js");
   let storage = require("../tokenStorage.js");

   // sends api fetch request to register a new user
   const doRegister = async event =>
   {
      event.preventDefault();

      // defining the data to be input to the register api
      let obj = {
         firstName:firstName.value, 
         lastName:lastName.value, 
         email:email.value, 
         login:login.value, 
         password:password.value
      }

      let js = JSON.stringify(obj);

      // sets up fetch configuration for api request
      let config = {
         method: "post",
         url: bp.buildPath("api/register"),
         headers: {
            "Content-Type": "application/json",
         },
         data: js,
      };

      axios(config)
         .then(function (response){
            let res = response.data
            console.log(res)
            if (res.error)
            {
               setMessage( "Register API Error:" + res.error);
            }
            else
            {
               console.log('New User Registered')
               setMessage('Registered Successfully. Now Please Verify Your Account In Your Email');

            }
         })
         .catch(function(error)
         {
            console.log(error);
         })

      };

      
   return(
      <div id="registerDiv" className="register-card">
         <form onSubmit={doRegister}>
            <span id="register-title">Register</span>
            <br/>
            <input type="text" id="firstName" placeholder="First Name" ref={(c) => firstName = c} /><br />
            <input type="text" id="lastName" placeholder="Last Name" ref={(c) => lastName = c} /><br />
            <input type="text" id="email" placeholder="Email" ref={(c) => email = c} /><br />
            <input type="text" id="loginName" placeholder="Username" ref={(c) => login = c} /><br />
            <input type="password" id="loginPassword" placeholder="Password" ref={(c) => password = c} /><br />
            
            <input type="submit" id="loginButton" className="buttons" value = "Register" onClick={doRegister} />
        </form>
        <span id="registerResult">{message}</span>

      </div>
   )
}