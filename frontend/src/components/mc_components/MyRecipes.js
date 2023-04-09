import React, {useState} from 'react';
import '../../stylesheets/Cookbook.css';
import axios from 'axios';
import MCPostList from './MCPostList'

export default function MyRecipes(event)
{
   var bp = require('../Path.js');
   var storage = require('../../tokenStorage.js');

   // states
   const [myRecipes, setMyRecipes] = useState([]);
   
   
   console.log(localStorage.getItem('token_data'))
   // sends a fetch request to pull up recipes made by user
   function getMyRecipes()
   {

      console.log(storage.retrieveToken())
      // preparing fetch payload
      var ud = JSON.parse(localStorage.getItem('user_data'));
      var userId=ud.id;
      var jwtToken = storage.retrieveToken();

      // creating fetch payload
      var obj = {userId:userId, search:'',jwtToken:jwtToken};
      console.log(obj)
      var js = JSON.stringify(obj)
      var config = 
      {
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
         if (res.error) {
            console.log('search failed')
         } 
         else 
         {
            storage.storeToken(res.jwtToken);
            return res.results;
         }
      })
      .catch(function (error)
      {
         console.log('in error')
         console.log(error);
      });
   }
   
   function renderFeed()
   {
      let ret = getMyRecipes()
      setMyRecipes(ret);
      console.log(myRecipes) 
   }

   renderFeed()
   return(
      <div className="container">
         <button id="back-btn-my-recipe" className="button">
               Insert back arrow
         </button>
         <div className="carousel-wrapper">
               <div className="carousel">
                  
                  <MCPostList recipeList = {myRecipes}/>
               </div>
         </div>
         <button id="next-btn-my-recipe" className="button">
               Insert next arrow
         </button>
      </div>
   )
}