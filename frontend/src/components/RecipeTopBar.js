import React, {useState, useEffect} from 'react'
export default function RecipeTopBar({recipe}) {
   const hours = recipe.Time[0]
   const minutes = recipe.Time[1]
   return (
    <div className="recipeTopContainer">
        <div className='top-bar-content'>
            <div className="top-bar-brand">
                  <span className="logo">PlateFull</span>
            </div>
            <div className="recipeInfoContainer">
               <div className="recipeInfo">
                  <ul>
                        <li className="text-white">
                           <span className='fw-bold'>Recipe Name</span>: {recipe.RecipeName}
                        </li>
                        <li className="text-white ">
                           <span className='fw-bold'>Time:</span> {hours} hrs {minutes} mins 
                        </li>
                        <li className="text-white">
                           <span className='fw-bold'>Difficulty Rating:</span> {recipe.Difficulty} / 5 
                        </li>
                  </ul>
               </div>
            </div>
        </div>
        
    </div>
  )
}