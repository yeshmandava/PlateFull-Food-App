import React, { useState } from 'react';
import axios from 'axios';

export default function Register({option})
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

      // password validation check
      if (!validatePassword(obj.password))
      {
         setMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character')
         return;
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

      const validatePassword = password => 
      {
         const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
         return regex.test(password);
      }

      
   return(
      <div id="register" className="form-card register-card" option={option}>
         <form onSubmit={doRegister}>
            <h5 id="register-title" className="mb-2"> Register</h5>
            <br/>
            <input type="text" id="firstName" placeholder="First Name" ref={(c) => firstName = c} /><br />
            <input type="text" id="lastName" placeholder="Last Name" ref={(c) => lastName = c} /><br />
            <input type="text" id="email" placeholder="Email" ref={(c) => email = c} /><br />
            <input type="text" id="loginName" placeholder="Username" ref={(c) => login = c} /><br />
            <input type="password" id="loginPassword" placeholder="Password" ref={(c) => password = c} /><br />
            
            <input type="submit" id="loginButton" className="buttons btn btn-dark mt-3 mb-1" value = "Register" onClick={doRegister} />
        </form>
        <span id="registerResult">{message}</span>

      </div>
   )
}