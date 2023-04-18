import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import default_recipe_image from '../img/default_recipe_image.png'
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
         console.log(recipe.RecipeName)
      }
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
                     <img className="postPhoto"  src={("data:image/jpeg;base64," + recipe.Image.myFile) || default_recipe_image}alt=""/>
                  </div>
               </div>

               <div className="bottomHalf">
               <div className="bottomHalfOne">
                  <div className="postTime">Time (hrs): {recipe.Time}</div>
                  <div className="postDifficulty">Difficulty: {recipe.Difficulty}/5</div>
               </div>
               <div className="bottomHalfTwo">
                  <button className="postSaveButton" onClick={toggleStatus} >{saveMessage}</button>
                  <button className="postOpenButton" onClick = {openFullRecipe}>Open Recipe</button>
               </div>
            </div>
        </div>

        <div className={isClicked ? "postWrapperBackSwapped" : "postWrapperBack"}>
            <div className="backCard">
               <div className= "backLeft">
                  <h2 className="backTitle">Ingredients</h2>
                  <div className="ingredients">
                  {recipe.Ingredients.map((ingredient, index) => (
                  <div key={index}>{ingredient}</div>
        ))}

                     {recipe.Ingredients}</div>
               </div>

               <div className="wall"></div>

               <div className= "backRight">
                  <h2 className="backTitle">Equipment</h2>
                  <div className="equipment">
                  {recipe.Equipment.map((equipment, index) => (
                  <div key={index}>{equipment}</div>
        ))}

                     {recipe.Equipment}</div>

               </div>
            </div>
         </div>
    </div>
  )
}
<div className="shareTop">
<img className="shareProfileImg"  src="" alt=""/>
<input placeholder="What's in your mind?" className="shareInput"/>
</div>