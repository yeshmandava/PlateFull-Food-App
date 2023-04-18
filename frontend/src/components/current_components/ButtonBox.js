import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export default function ButtonBox({recipe}) {
   const bp = require('../Path');
   const storage = require('../../tokenStorage')
   const navigate = useNavigate();

   const [savedNames, setNames] = useState([])
   const [isSaved, setSave] = useState(false)
   const [saveMessage, setMessage] = useState('')

   // chain of useEffects that manage the save button status
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
   
   // function that fetches all saved recipes
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

      // requests to api/saverecipe
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
   
   // function that checks the save status of save button and sets button message
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
   
   // function that handles deciding whether to save or unsave recipe
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
               console.log('save')
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
               console.log('unsave')

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
   return( 
      <div className='button-box-wrapper'>
         <div className="button-box">
            <button className="btn btn-red" onClick={exitPage}>Exit</button>
            <button className="btn btn-green" onClick={toggleStatus}>{saveMessage}</button>
         </div>
      </div>
  )
}
