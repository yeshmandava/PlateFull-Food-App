import React, {useState} from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

import '../stylesheets/LoginPage.css'
const LoginPage = () =>
{
  const [showLogin, toggleLogin] = useState(true);
  const [showRegister, toggleRegister] = useState(false);
  const [panelSide, changeSide] = useState(0);
  
  return(
    <div>
      {<div className="side-panel" side={panelSide}/>}
      <div className="container">
        <div className="info" side={panelSide}>
          <h2>Welcome to Platefull</h2>
          <img src="../img/sample-logo.png" alt="logo"/>
          {showLogin && <Login />}
          {showRegister && <Register />} 
          <div className="button-box">
            <button id="login-button" className="btn" role="button" onClick={() => 
              {
                toggleLogin(true);
                toggleRegister(false);
                changeSide(0);
              }}>Login</button>
              <button id="register-button" className="btn" role="button" onClick={() => 
              {
                toggleRegister(true);
                toggleLogin(false);
                changeSide(1);
              }}>Register</button>
          </div>
        </div>
      </div>
    </div>
    
    
  );
};
export default LoginPage;