import React, {useState, useEffect} from 'react';
import MCPostList from './MCPostList';

import axios from 'axios'

export default function DiscoveredRecipes()
{
   const bp = require('../Path');
   const storage = require('../../tokenStorage')

   const [recipeList, setRecipes] = useState([])


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
            console.log(res);
            if (res.error)
            {
               console.log('Search failed')
            }
            else
            {
               setRecipes(res.results)
               storage.storeToken(res.jwtToken)
            }
         })
         .catch(function (error)
         {
            console.log(error);
         })
   }

   useEffect(() =>{getSavedRecipes()}, [])
   return(
      <div id="my-recipes">
         <h2>Discovered Plates</h2>
         <div className="myRecipe-wrapper">
            <button id="back-btn-disc-recipe" className="button">
               Insert back arrow
            </button>
            <div className="carousel-wrapper">
               <div className="carousel">
                  <MCPostList recipeList = {recipeList}/>
               </div>
            </div>
            <button id="next-btn-disc-recipe" className="button">
                  Insert next arrow
            </button>  
         </div>
      </div>
   )
}