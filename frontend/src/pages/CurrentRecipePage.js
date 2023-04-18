import React from 'react';
import RecipeTopBar from '../components/RecipeTopBar';
import CurrentInfo from '../components/current_components/CurrentInfo'
import '../stylesheets/CurrentRecipePage.scss'

export default function CurrentRecipe() {
   const recipe = JSON.parse(localStorage.getItem('current_recipe'))

   return(
      <div id='current-recipe-page'>
         <RecipeTopBar recipe={recipe}/>
         <CurrentInfo recipe={recipe}/>
         
      </div>
    )
}