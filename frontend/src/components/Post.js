import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import "../stylesheets/Post.scss"
import axios from 'axios'
export default function Post({recipe, savedNames}) {
   let bp = require("./Path.js");
   let storage = require("../tokenStorage.js");   
   
   const [isSaved, setSave] = useState(false)
   const [saveMessage, setMessage] = useState('')
   const [isClicked, setClicked] = useState(false)

   const checkClick = () => {
      setClicked(!isClicked)
   }
   
   let navigate = useNavigate();
   // checks if the recipe has already been saved by the user
   const checkStatus = () =>{
      if (savedNames.indexOf(recipe.RecipeName)!= -1)
      {
         setSave(true)
      }
      let tempMessage;
      if (isSaved) {tempMessage = 'Unsave Recipe'}
      else {tempMessage = 'Save Recipe'}
      setMessage(tempMessage)
   }
   
   useEffect(() => {checkStatus()}, [])
   useEffect(() => {
      let tempMessage;
      if (isSaved) {tempMessage = 'Unsave Recipe'}
      else {tempMessage = 'Save Recipe'}
      setMessage(tempMessage)
   }, [isSaved])

   function toggleStatus(e)
   {
      // i think this should stop the card from flipping when save is also clicked.
      e.stopPropagation();
      if (isSaved)
      {
         removeSave();
      }
      else
      {
         saveRecipe();
      }
   }

   // saves post whose save button is pressed
   // calls api/saverecipe to associate a user with that saved recipe
   const saveRecipe = async (event) =>{
      // data values stored in localStorage
      let ud = JSON.parse(localStorage.getItem('user_data'))
      let userId = ud.id

      let obj = {
         userId:userId, 
         recipeId:recipe._id, 
         recipeName:recipe.RecipeName, 
         time:recipe.Time, 
         difficulty:recipe.Difficulty, 
         ingredients:recipe.Ingredients, 
         equipment:recipe.Equipment, 
         instructions:recipe.Instructions, 
         image:recipe.Image, 
         rating:recipe.Rating, 
         numOfRatings:recipe.NumOfRatings,
         sumOfRatings:recipe.SumOfRatings, 
         jwtToken:storage.retrieveToken()
      };
      
      let js = JSON.stringify(obj)

      let config = 
      {
         method: "post",
         url: bp.buildPath("api/saverecipe"),
         headers: {
         "Content-Type": "application/json",
         },
         data: js,  
      }
      axios(config)
         .then(function (response)
         {
            let res = response.data
            if (res.error)
            {
               console.log('failed to save recipe')
            }
            else
            {
               storage.storeToken(res.jwtToken);
               setSave(true)
            }
         })
         .catch(function (error)
         {
            console.log(error)
         })
      // setMessage('Unsave')
   }

   // removes the association between the current user and a recipe
   // calls api/removeSave
   function removeSave()
   {
      let ud = JSON.parse(localStorage.getItem('user_data'))
      let userId = ud.id
      let obj ={
         userId:userId, 
         recipeId:recipe._id,
         jwtToken:storage.retrieveToken() 
      }
      let js = JSON.stringify(obj)
      let config = 
      {
         method: "post",
         url: bp.buildPath("api/removesave"),
         headers: {
         "Content-Type": "application/json",
         },
         data: js,  
      }
      axios(config)
         .then(function (response)
         {
            let res = response.data
            if (res.error)
            {
               console.log('failed to unsave recipe')
            }
            else
            {
               storage.storeToken(res.jwtToken);
               setSave(false)
            }
         })
         .catch(function (error)
         {
            console.log(error)
         })
   }

   function openFullRecipe(event)
   {
      localStorage.setItem('current_recipe', JSON.stringify(recipe))
      console.log(JSON.parse(localStorage.getItem('current_recipe')))
      navigate('/current-recipe')
   }
  
   return (
    <div className="post" onClick={checkClick}>
        <div className={isClicked ? "postWrapperSwapped" : "postWrapper"}>
            
               <div className="topHalf">
                  <div className="topLeft">
                     <div className="postName">Recipe: {recipe.RecipeName}</div>
                     <div className="postDescription">
                        Description: {recipe.Description}
                     </div>
                  </div>

                  <div className="topRight">
                     <img className="postPhoto"  src="https://static.wikia.nocookie.net/kenneths-td-big-brother/images/0/01/TDBB8Logo.png" alt=""/>
                  </div>
               </div>

               <div className="bottomHalf">
                  <div className="bottomLeft">
                     <div className="postTime">Time (hrs): {recipe.Time}</div>
                     <div className="postDifficulty">Difficulty: {recipe.Difficulty}/5</div>
                     <div className="postServes">Serves:</div> 
                  </div>
                  <div className="bottomRight">
                     <button className="postSaveButton" onClick={toggleStatus} >{saveMessage}</button>
                     <button onClick = {openFullRecipe}>Open Recipe</button>
                  </div>
               </div>
        </div>

        <div className={isClicked ? "postWrapperBackSwapped" : "postWrapperBack"}>
            <div className="topHalf">
               <div className="topLeft">
                  <div className="postName">Recipe: {recipe.RecipeName}</div>
                  <div className="postDescription">
                     Description: {recipe.Description}
                  </div>
               </div>

               <div className="topRight">
                  <img className="postPhoto"  src="https://static.wikia.nocookie.net/kenneths-td-big-brother/images/0/01/TDBB8Logo.png" alt=""/>
               </div>
            </div>
            <div className="bottomHalf">
                     <div className="ingredients">Ingredients: {recipe.Ingredients}</div>
               </div>
         </div>
    </div>
  )
}
<div className="shareTop">
<img className="shareProfileImg"  src="" alt=""/>
<input placeholder="What's in your mind?" className="shareInput"/>
</div>