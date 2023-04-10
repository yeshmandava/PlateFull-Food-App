import React from 'react'
import "../stylesheets/Recipe.css"

export default function RecipeStart() {
  return (
    <div className="recipe">
        <div className="recipeContainer">
            <img className="recipeImage" src="" alt=""/> 
            <div className="recipeAndDescriptionContainer">
                <div className="recipeName">Recipe Name</div>
                <div className="recipeDescription">Description</div>
            </div>
        </div>
    </div>
  )
}