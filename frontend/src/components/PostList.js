import React, {useState} from 'react'
import Post from './Post'
export default function PostList({recipeList})
{
   return(
      recipeList.map(recipe => {
         return(
            <Post recipe = {recipe}/>
         )
      })
   )
}