import React from 'react'
import "../stylesheets/RecipeTopBar.css"

export default function RecipeTopBar() {
  return (
    <div className="recipeTopContainer">
        <div className="recipeTopBarLeft">
            <span className="logo">PlateFull</span>
        </div>

        <div className="recipeTopBarCenter">
            <div class="recipeInfoContainer">
                <div className="recipeInfo">Recipe Name</div>
                <div class="recipeTimeAndDifficultyContainer">       
                    <span className="recipeInfo">Time:</span>
                    <span className="recipeInfo">Difficulty Rating - </span>
                </div>
                <div className="recipeInfo">Feeds: </div>
            </div>
        </div>

        <div className="recipeButtons">
            <div className="saveAndExitContainer">
                <button className="recipeToggleSave">Toggle Save</button>
                <button className="recipeExit">Exit</button>
            </div>
        </div>
    </div>
  )
}