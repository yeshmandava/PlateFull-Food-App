import React from 'react';
import NewRecipe from '../components/add_components/NewRecipe';
import {useNavigate} from 'react-router-dom'
import '../stylesheets/AddRecipePage.scss'
import Topbar from '../components/Topbar'
export default function AddRecipePage(){
   function exitPage(event)
   {
      event.preventDefault();
      navigate(-1);
   }
   const navigate = useNavigate();
   return(
        <div id='add-recipe-page' className="fill-screen bg-red-light">
            <Topbar />
            <div className="fill-screen bg-red-light">
               <div className='container-xl text-center my-5 pb-5 bg-red-light' >
                  <div className='title-box text-center mb-3'>
                     <h1 className='text-white d-block text-center'>Add New Recipe</h1>
                     <div className='title-box-buttons'>
                        <button className='btn btn-red' onClick={exitPage}>Exit</button>
                     </div>
                  </div>
                  <NewRecipe />
               </div>
            </div>
        </div>
    )
}