import React, {useState} from 'react'
import "../stylesheets/Post.css"
import axios from 'axios'
export default function Post({recipe}) {
   let bp = require("./Path.js");
   let storage = require("../tokenStorage.js");   

   const [saveStatus, setStatus] = useState("Save Status")
   const saveRecipe = async (event) =>{
        /*
      Endpoints
      "userId": "hndkdkn3939ndfd", 
      "recipeId": "ncdidnd8933nn7",
      "recipeName": "test0",
      "time": [2,30], 
      "difficulty": 3, 
      "description": "words", 
      "ingredients": ["sugar","salt"], 
      "equipment": ["spoon","fork"], 
      "instructions":["step1","step2"], 
      "image":"imageLink", 
      "rating":4,
      "numOfRatings": 3,
      "sumOfRatings": 12,
      “jwtToken”: “gsgsuhhshjsbsh72gsv”

      */

      // data values stored in localStorage
      console.log('in save function')
      let ud = JSON.parse(localStorage.getItem('user_data'))
      let userId = ud.id
      let RecipeId = recipe.RecipeId
      let recipeName = recipe.RecipeName
      let time = recipe.Time
      let difficulty = recipe.Difficulty
      let ingredients = recipe.Ingredients
      let equipment = recipe.Equipment
      let instructions = recipe.Instructions
      let image = recipe.Image
      let rating = recipe.Rating
      let numOfRatings = recipe.NumOfRatings
      let sumOfRatings = recipe.SumOfRatings
      let jwtToken = storage.retrieveToken()

      let obj = {userId:userId, RecipeId:RecipeId, recipeName:recipeName, time:time, 
                 difficulty:difficulty, ingredients:ingredients, equipment:equipment, 
                 instructions:instructions, image:image, rating:rating, numOfRatings:numOfRatings,
                 sumOfRatings:sumOfRatings, jwtToken:jwtToken};
      
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
               console.log('yay recipe saved')
               storage.storeToken(res.jwtToken);
            }
         })
         .catch(function (error)
         {
            console.log(error)
         })

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
              <button className="postSaveButton" >Save Recipe</button>
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