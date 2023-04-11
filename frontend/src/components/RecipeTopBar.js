import React, {useState, useEffect} from 'react'
import axios from 'axios';
import "../stylesheets/RecipeTopBar.css"
import { useNavigate } from "react-router-dom"

export default function RecipeTopBar({recipe}) {

   const bp = require('./Path');
   const storage = require('../tokenStorage')
   const navigate = useNavigate();

   const [savedNames, setNames] = useState([])
   const [isSaved, setSave] = useState(false)
   const [saveMessage, setMessage] = useState('')

   useEffect(() => {
      getSavedRecipes();
      checkStatus()
   }, [])
   useEffect(() => {checkStatus()}, [savedNames])
   useEffect(() => {
      let tempMessage;
      if (isSaved) {tempMessage = 'Unsave Recipe'}
      else {tempMessage = 'Save Recipe'}
      setMessage(tempMessage)
   }, [isSaved])
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
            if (res.error)
            {
               console.log('Search failed')
            }
            else
            {
               // setSaved(res.results)
               let tempNames = []
               res.results.map(recipe => {tempNames.push(recipe.RecipeName)})
               
               setNames(tempNames)
             
               storage.storeToken(res.jwtToken)
            }
         })
         .catch(function (error)
         {
            console.log(error);
            
         })
   }
   
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
   
   

   function toggleStatus()
   {
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
      // setMessage('Save')
   }
   function exitPage(event)
   {
      event.preventDefault();
      navigate(-1);
   }
   return (
    <div className="recipeTopContainer">
        <div className="recipeTopBarLeft">
            <span className="logo">PlateFull</span>
        </div>

        <div className="recipeTopBarCenter">
            <div className="recipeInfoContainer">
                <div className="recipeInfo">Recipe Name: {recipe.RecipeName}</div>
                <div className="recipeTimeAndDifficultyContainer">       
                    <span className="recipeInfo">Time: {recipe.Time}</span>
                    <span className="recipeInfo">Difficulty Rating: {recipe.Difficulty} </span>
                </div>
                <div className="recipeInfo">Feeds: </div>
            </div>
        </div>

        <div className="recipeButtons">
            <div className="saveAndExitContainer">
                <button className="recipeToggleSave" onClick={toggleStatus}>{saveMessage}</button>
                <button className="recipeExit" onClick={exitPage}>Exit</button>
            </div>
        </div>
    </div>
  )
}