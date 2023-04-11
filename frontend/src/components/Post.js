import React, {useState, useEffect} from 'react'
import "../stylesheets/Post.css"
import axios from 'axios'
export default function Post({recipe, savedNames}) {
   let bp = require("./Path.js");
   let storage = require("../tokenStorage.js");   
   const [saveMessage, setMessage] = useState('')   // console.log(recipe)

   const [isSaved, setSave] = useState(false)
   
  
   // checks if the recipe has already been saved by the user
   const checkStatus = () =>{
      if (savedNames.indexOf(recipe.RecipeName)!= -1)
      {
         console.log(recipe.RecipeName);
         setSave(true)
      }
      let tempMessage;
      if (isSaved) {tempMessage = 'Unsave Recipe'}
      else {tempMessage = 'Save Recipe'}
   }
   useEffect(() => {checkStatus()}, [])
   useEffect(() => {
      let tempMessage;
      if (isSaved) {tempMessage = 'Unsave Recipe'}
      else {tempMessage = 'Save Recipe'}
      setMessage(tempMessage)

   }, [isSaved])


   const saveRecipe = async (event) =>{
      if (isSaved) {return}
      
      console.log(recipe);
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
            }
         })
         .catch(function (error)
         {
            console.log(error)
         })
      setMessage('Unsave')
   }
  
   return (
    <div className="post">
        <div className="postWrapper">

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
              <button className="postSaveButton" onClick={saveRecipe} >{saveMessage}</button>
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