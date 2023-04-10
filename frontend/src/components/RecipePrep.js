import React from 'react'
import "../stylesheets/Recipe.css"

export default function RecipePrep() {
  return (
    <div className="recipe">
        <div className="recipeContainer">
            
            <div className="ingrdientsContainer">
                <div className="ingredientsTitle">Ingredients</div>
                <div className="recipeIngredientAndStep">Ingredient</div>
            </div>

            <div className="stepsContainer">
                <div className="stepsTitle">Steps</div>
                <div className="recipeIngredientAndStep">Step</div>
            </div>
        </div>
    </div>
  )
}