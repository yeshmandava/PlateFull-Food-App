import React, {useState} from 'react';
import NewRecipe from '../components/add_components/NewRecipe';
import '../stylesheets/AddRecipePage.scss'
import Topbar from '../components/Topbar'
export default function AddRecipePage(){
    return(
        <div>
            <Topbar />
            <div className='container-xl text-center my-5'>
               <h1>Add New Recipe</h1>
                  <NewRecipe />
            </div>
        </div>
    )
}