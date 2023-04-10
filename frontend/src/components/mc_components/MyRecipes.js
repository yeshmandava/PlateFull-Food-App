import React, {useState, useEffect, useRef} from 'react'
import "../../stylesheets/Cookbook.css";
import MCPostList from './MCPostList'

import axios from "axios"

export default function MyRecipes() {
   // file path access variables
   let bp = require("../Path.js");
   let storage = require("../../tokenStorage.js");
  
   // states that work with api
   const [recipeList, setRecipes] = useState([]);
   const [message, setMessage] = useState("");
   
   // sends a fetch request to searchrecipe apie
   // value of search has been passed into Feed.js as a prop: 'searchQuery'
   const ud = JSON.parse(localStorage.getItem('user_data'))
   const userId = ud.id;
   console.log(userId);
   const searchRecipes = async (event) => 
   {
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
         console.log(res)
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
      <div className="container">
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