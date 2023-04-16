import React from 'react'
import "../stylesheets/Recipe.css"

export default function RecipeStart({recipe}) {
   
   
   return (
      <div className="recipe">
         <div className="recipeContainer">
            <img className="recipeImage" src={recipe.Image.myFile} alt=""/> 
            <div className="recipeAndDescriptionContainer">
                  <div className="recipeName">{recipe.RecipeName}</div>
                  <div className="recipeDescription">{recipe.Description}</div>
            </div>
         </div>
      </div>
   )
}