import React, {useState, useEffect, useRef} from 'react'
import MCPostList from './MCPostList'

import axios from "axios"

export default function MyRecipes() {
   // file path access variables
   let bp = require("../Path.js");
   let storage = require("../../tokenStorage.js");
  
   // states that work with api
   const [recipeList, setRecipes] = useState([]);
   const [message, setMessage] = useState("");
   
   const searchRecipes = async (event) => 
   {
      // sends a fetch request to searchrecipe apie
      // value of search has been passed into Feed.js as a prop: 'searchQuery'
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
            setMessage("Search failed");
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
   
   return (
      <div id="my-recipes">
         <div className="container-lg my-5">
            
            <div className="slider-wrapper my-2">
               <button id="back-btn-disc-recipe" className="btn btn-dark">
                  Insert back arrow
               </button>   
               <div className="slider">
                  <MCPostList recipeList = {recipeList}/>
               </div>
               <button id="next-btn-disc-recipe" className="btn btn-dark">
                  Insert next arrow
            </button> 
            </div>
             
         </div>
      </div>
   )

  
}