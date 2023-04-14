import React, {useState} from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

import '../stylesheets/LoginPage.css'
const LoginPage = () =>
{
  const [showLogin, toggleLogin] = useState(true);
  const [showRegister, toggleRegister] = useState(false);
  const [option, changeOption] = useState(0);
  
  return(
    <div>
      {<div className="side-panel" option={option}/>}
      <div className="container-lg floating-container text-center">
        <div id ="info" className='text-center' option={option}>
          <h2 id="site-title" className="mt-5 mb-3">Welcome to Platefull</h2>
          <img src="../img/sample-logo.png" alt="logo"/>
          {showLogin && <Login option={option}/>}
          {showRegister && <Register option={option}/>} 
          <div className="button-box">
            <button id="login-button" className="shadow-button" role="button" onClick={() => 
              {
                toggleLogin(true);
                toggleRegister(false);
                changeOption(0);
              }}>Login</button>
              <button id="register-button" className="shadow-button" role="button" onClick={() => 
              {
                toggleRegister(true);
                toggleLogin(false);
                changeOption(1);
              }}>Register</button>
          </div>
        </div>
      </div>
    </div>
    
    
  );
};
export default LoginPage;