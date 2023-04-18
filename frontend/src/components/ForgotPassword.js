import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap'

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ForgotPassword() {
   const [show, setShow] = useState(false);
   const [message, setMessage] = useState('');
   
   let emailRef

   function handleModal() 
   {
      setShow(!show);
   }

   function recoverPassword(){
      let bp = require('./Path');
      let storage = require("../tokenStorage.js");

      let obj = { email:emailRef.value };
      let js = JSON.stringify(obj);

      let config = {
         method: "post",
         url: bp.buildPath("api/forgotPassword"),
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
               setMessage("Invalid Email");
            } else {
               setMessage('Recovery Email Sent')
            }
         })
         .catch(function (error) {
            setMessage("Invalid Email");
            console.log(error);
         });
      handleModal()  
   }
   
   return (
    <div className='fgp-wrapper mb-4'>
     
      <Button onClick={()=>handleModal()} className='btn btn-red text-black'>Forgot Password</Button>
      <span className='message'>{message}</span>
      <Modal show={show} backdrop="static" keyboard={false}>
         <Modal.Header >
            <Modal.Title>Enter Recovery Email</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <input placeholder='Recovery Email' ref={(c)=> emailRef = c}></input>
         </Modal.Body>
         <Modal.Footer>
            <Button className = 'btn btn-red' onClick={()=>handleModal()}>cancel</Button>
            <Button className = 'btn btn-green' onClick={()=>recoverPassword()}>Submit</Button>
         </Modal.Footer>
      </Modal>
      
    </div>
  )
}
