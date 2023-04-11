import React, {useState} from 'react';
import RecipeTopBar from '../components/RecipeTopBar';
import RecipeStart from '../components/RecipeStart';
import axios from 'axios';
export default function CurrentRecipe() {
   
   const bp = require('../components/Path')
   const storage = require('../tokenStorage')
   const recipe = JSON.parse(localStorage.getItem('current_recipe'))
   
   const ud = JSON.parse(localStorage.getItem('user_data'))
   const userId = ud.id
   const isPoster = recipe.UserId.trim() === userId.trim()

   // deletes recipe from recipes table on database
   const [deleteMessage, setMessage] = useState('Delete')

   function deleteRecipe(event)
   {
      event.preventDefault();
      if (window.confirm('This Will Permanently Delete the Recipe') == false)
         {return}
      
      console.log((isPoster) ? 'true' : 'false')
      if (isPoster)
      {
         let obj ={
            recipeId:recipe._id,
            jwtToken:storage.retrieveToken() 
         }
         let js = JSON.stringify(obj)
         let config = 
         {
            method: "post",
            url: bp.buildPath("api/deleterecipe"),
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
                  console.log('in pass the function')
               }
            })
            .catch(function (error)
            {
               console.log('in errors')
               console.log(error)
            })
            setMessage('Deleted Post')
      }
      else
      {
         return
      }
   }
   return(
      <div>
         <RecipeTopBar recipe={recipe}/>
         {
            isPoster && <button onClick={deleteRecipe}>{deleteMessage}</button>
         }
         <RecipeStart recipe={recipe}/>
         {/*<RecipePrep/>*/}
      </div>
    )
}