import React, {useState, useEffect} from 'react'
import Post from './Post'

import axios from 'axios';

export default function PostList({recipeList})
{
   const bp = require('./Path');
   const storage = require('../tokenStorage')
   const [savedNames, setNames] = useState([])
   // gets a list of saved recipes
   const getSavedRecipes = async event =>
   {
      let ud = JSON.parse(localStorage.getItem('user_data'));
      let userId = ud.id
      let jwtToken = storage.retrieveToken()

      let obj = {userId:userId, search:'', jwtToken:jwtToken}
      let js = JSON.stringify(obj)

      let config = {
         method: 'post',
         url: bp.buildPath('api/searchsavedrecipes'),
         headers: {
            "Content-Type": "application/json",
         },
         data:js,
      }

      axios(config) 
         .then(function(response)
         {
            let res = response.data
            if (res.error)
            {
               console.log('Search failed')
            }
            else
            {
               // setSaved(res.results)
               let tempNames = []
               res.results.map(recipe => {tempNames.push(recipe.RecipeName)})
               setNames(tempNames)
               storage.storeToken(res.jwtToken)
            }
         })
         .catch(function (error)
         {
            console.log(error);
         })
   }
   useEffect(() => {getSavedRecipes()}, [])

   return(
      recipeList.map(recipe => {
         return(
            <Post key = {recipe._id} recipe = {recipe} savedNames= {savedNames} />
         )
      })
   )
}