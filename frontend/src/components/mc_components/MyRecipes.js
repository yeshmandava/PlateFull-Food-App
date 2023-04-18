import React, {useState, useEffect, useRef} from 'react'
import axios from "axios"

import MCPostList from './MCPostList'

export default function MyRecipes({functionAlert}) {
   // file path access variables
   let bp = require("../Path.js");
   let storage = require("../../tokenStorage.js");
  
   // states that work with api
   const [recipeList, setRecipes] = useState([]);
   
   const searchRecipes = async (event) => 
   {
      const ud = JSON.parse(localStorage.getItem('user_data'))
      const userId = ud.id;

      const obj = {userId: userId, search: "", jwtToken: storage.retrieveToken()}
      const js = JSON.stringify(obj)

      // request payload
      var config = {
         method: "post",
         url: bp.buildPath("api/searchrecipes"),
         headers: {
            "Content-Type": "application/json",
         },
         data: js,
      };

      axios(config)
      .then(function (response)
      {
         var res = response.data;
         if (res.error){
         } 
         else
         {
            // update token
            storage.retrieveToken('token_data', res.jwt)
            setRecipes(res.results);
         }
      })
      .catch(function (error) 
      {
         console.log("Search failed")
         console.log(error);
      })
   }
   useEffect(() => {searchRecipes()}, [])
   if (recipeList.length > 0)
   {
      return(
         <div id="my-recipes" className="my-3">
            <div className="slider snaps-inline">
               <MCPostList recipeList = {recipeList} isPoster={true}/>
            </div>
         </div>
      )
   }
   else{
      return (
         <div id="my-recipes" className="my-3">
            <h4 className='my-5'>Nothing Here Yet...</h4>
         </div>
      )
   }
}