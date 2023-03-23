import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";


function Login()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    
    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');
    // const { setAuth } = useContext(authContext);
    //const response = await fetch(bp.buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});


    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        
        var config = 
        {
            method: 'post',
            url: bp.buildPath('api/login'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

        axios(config).then(function (response) 
        {
            var res = response.data;
            if (res.error) 
            {
                setMessage('User/Password combination incorrect');
            }
            else 
            {	
                storage.storeToken(res);
    
                // var userId = res.id;
                // var firstName = res.fn;
                // var lastName = res.ln;
                //var jwt = require("jsonwebtoken");
               
                var ud = jwt_decode(storage.retrieveToken(),{complete:true});
                // const {ud, isExpired} = useJwt(storage.retrieveToken);
              
                var userId = ud.userId;
                var firstName = ud.firstName;
                var lastName = ud.lastName;

                  
                var user = {firstName:firstName,lastName:lastName,id:userId}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/cards';
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    }

    return(
      <div id="loginDiv">
        <form onSubmit={doLogin}>
            <span id="inner-title">PLEASE LOG IN</span><br />
            <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
            <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
            <input type="submit" id="loginButton" className="buttons" value = "Do It" onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};
export default Login;