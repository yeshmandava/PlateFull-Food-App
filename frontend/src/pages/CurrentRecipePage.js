import React, {useState, useEffect} from 'react';
import RecipeTopBar from '../components/RecipeTopBar';
import RecipeStart from '../components/RecipeStart';

export default function CurrentRecipe() {
   
    return(
        <div>
            <RecipeTopBar/>
             <RecipeStart/>
            {/*<RecipePrep/>*/}
        </div>
    )
}