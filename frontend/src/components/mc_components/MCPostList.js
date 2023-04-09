import React, {useState} from 'react'
import MCPost from './MCPost'
export default function PostList({recipeList})
{
   return(
      recipeList.map(recipe => {
         return(
            <MCPost recipe = {recipe}/>
         )
      })
   )
}