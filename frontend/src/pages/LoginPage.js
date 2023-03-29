import React, {useState} from 'react';
import PageTitle from '../components/PageTitle';
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
        <PageTitle />
        <img src="../img/sample-logo.png" alt="logo"/>
        
        <div className="info" side={panelSide}>
          {showLogin && <Login />}
          {showRegister && <Register />} 
          <div className="button-box">
            <button id="login-button" class="btn" onClick={() => 
              {
                toggleLogin(true);
                toggleRegister(false);
                changeSide(0);
              }}>Login</button>
              <button id="register-button" class="btn" onClick={() => 
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