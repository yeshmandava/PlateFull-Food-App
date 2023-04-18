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

   if (recipeList.length > 0)
   {
      return(
         <div id="discovered-recipes" className="my-3">
            <div className="slider snaps-inline">
               {recipeList && <MCPostList recipeList = {recipeList} isPoster={false}/>}
            </div>
         </div>
      )
   }
   else{
      return (
         <div id="discovered-recipes" className="my-3">
            <h4 className='my-5'>Nothing Here Yet...</h4>
         </div>
      )
   }
}