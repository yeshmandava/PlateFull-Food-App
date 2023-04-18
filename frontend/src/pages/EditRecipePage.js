import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

import EditRecipe from '../components/edit_components/EditRecipe';
import '../stylesheets/EditRecipePage.scss'
import Topbar from '../components/Topbar'
export default function AddRecipePage(){
   const bp = require('../components/Path')
   const storage = require('../tokenStorage')
   
   const ud = JSON.parse(localStorage.getItem('user_data'))
   const userId = ud.id
   const recipe = JSON.parse(localStorage.getItem('current_recipe'))
   const isPoster = recipe.UserId.trim() === userId.trim()

   // deletes recipe from recipes table on database
   const [deleteMessage, setMessage] = useState('Delete')

   function deleteRecipe(event)
   {
      event.preventDefault();
      if (window.confirm('This Will Permanently Delete the Recipe') == false)
         {return}
      
      console.log((isPoster) ? 'true' : 'false')
      if (isPoster)
      {
         let obj ={
            recipeId:recipe._id,
            jwtToken:storage.retrieveToken() 
         }
         let js = JSON.stringify(obj)
         let config = {
            method: "post",
            url: bp.buildPath("api/deleterecipe"),
            headers: {
            "Content-Type": "application/json",
            },
            data: js,  
         }
   
         axios(config)
            .then(function (response)
            {
               let res = response.data
               if (res.error)
               {
                  console.log('failed to unsave recipe')
               }
               else
               {
                  storage.storeToken(res.jwtToken);
                  console.log('in pass the function')
               }
            })
            .catch(function (error)
            {
               console.log('in errors')
               console.log(error)
            })
            setMessage('Deleted Post')
            setTimeout(navigate, 2000, -1)
      }
      else
      {
         return
      }
   } 
   function exitPage(event)
   {
      event.preventDefault();
      navigate(-1);
   }
   const navigate = useNavigate();
   return(
        <div id='edit-recipe-page' className="fill-screen bg-brown-light">
            <Topbar />
            <div className="fill-screen bg-brown-light">
               <div className='container-xl text-center my-5 pb-5 bg-brown-light' >
                  <div className='title-box text-center mb-3'>
                     <h1 className='text-white d-block text-center me-2'>Edit Recipe</h1>
                     <button className='btn btn-gold' onClick={deleteRecipe}>{deleteMessage}</button> 
                     <div className='title-box-buttons'>
                        <button className='btn btn-red' onClick={exitPage}>Exit</button>
                     </div>
                  </div>
                  <EditRecipe />
               </div>
            </div>
        </div>
    )
}