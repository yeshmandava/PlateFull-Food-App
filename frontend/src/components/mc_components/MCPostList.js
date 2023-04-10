import React, {useState} from 'react'
import MCPost from './MCPost'
export default function MCPostList({recipeList})
{
   return(
      recipeList.map(recipe => {
         return(
            <MCPost key = {recipe._id} recipe = {recipe}/>
         )
      })
   )
}