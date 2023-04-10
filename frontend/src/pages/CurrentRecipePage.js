import React, {useState} from 'react';
import RecipeTopBar from '../components/RecipeTopBar';
import RecipeStart from '../components/RecipeStart';
import RecipePrep from '../components/RecipePrep';


export default function CurrentRecipe() {

    return(
        <div>
            <RecipeTopBar/>
             <RecipeStart/>
            {/*<RecipePrep/>*/}
        </div>
    )
}