import React, {useState} from 'react'

import axios from 'axios';

export default function EditForm() {
   var bp = require('../Path.js');
   const storage = require('../../tokenStorage')
   const currentRecipe = JSON.parse(localStorage.getItem('current_recipe'))

   var ud = JSON.parse(localStorage.getItem('user_data'))
   var userId = ud.id;
   var recipeName = '';
   var time = '';
   var difficulty = '';
   var description = '';
   
   // interact with state variables
   var ingredient = '';
   var equipmentItem = '';
   var instruction = '';

   var image = 'placeholder'; //this should be an image link

   const [message, setMessage] = useState('');
   const [ingredientList, setIngredients] = useState([]);
   const [equipmentList, setEquipment] = useState([]);
   const [instructionList, setInstructions] = useState([]);
   // function that registers new user
   const addRecipe = async event =>
   {
      event.preventDefault();
      var ingredients = JSON.stringify(ingredientList);
      var equipment = JSON.stringify(equipmentList);
      var instructions = JSON.stringify(instructionList);
      
      var obj = 
      {
         recipeId: currentRecipe._id,
         recipeName:recipeName.value,
         time:time.value,
         userId:userId,
         difficulty:difficulty.value,
         description:description.value,
         ingredients:ingredients,
         equipment:equipment,
         instructions:instructions,
         image:image,
         rating:currentRecipe.Rating,
         numOfRatings: currentRecipe.NumOfRatings,
         sumOfRatings:currentRecipe.SumOfRatings,
         jwtToken: storage.retrieveToken()
      }
      var js = JSON.stringify(obj);

      let config = 
      {
         method: "post",
         url: bp.buildPath("api/addrecipe"),
         headers: {
         "Content-Type": "application/json",
         },
         data: js,  
      }
      axios(config)
         .then(function(response){
            let res = response
            console.log(res)
            console.log(res)
            if (res.error)
            {
               setMessage( "Register API Error:" + res.error);
            }
            else
            {
               setMessage('Recipe Edited');
            }
         })
         .catch(function(error)
         {
            setMessage(error.toString());
         })
      // defining the data to be input to the register api
   }
        
    return(
        <div>
            <h2>Edit Recipe</h2>
            <form onSubmit={addRecipe}>
               
               <input type="text" id="recipeName" ref={(c) => recipeName = c} placeholder={currentRecipe.RecipeName} />
               <br />
               <input type="text" id="time" ref={(c) => time = c} placeholder ={currentRecipe.Time} />

               <br />
               <select id="difficulty" ref={(c) => difficulty= c}>
                  <option value="1">1 - I could do this in my sleep</option>
                  <option value="2">2 - this isn't too bad</option>
                  <option value="3">3 - this is possible</option>
                  <option value="4">4 - come prepared</option>
                  <option value="5">5 - I hope you are a chef</option>
               </select>
               <br />
               <textarea id="description" ref={(c) => description= c} placeholder={currentRecipe.Description} />
               <br />
               <input type="text" id="ingredient" ref={(c) => ingredient = c} placeholder="Ingredient" />
               <br />
               <input type="submit" id="add-ingredient-button" className="buttons" value = "add-ingredient-button" onClick={e=> {
                  e.preventDefault();
                  setIngredients(prevIngredients =>
                  {
                     return prevIngredients.concat(ingredient.value);
                  })

                  }} />
               <div  id="ingredients">
                  <ol>
                     {
                     ingredientList.map(ingredient => {
                        return (
                        <li>{ingredient}</li>
                        )
                     })
                     }
                  </ol>
               </div>
            
               <input type="text" id="equipment" ref={(c) => equipmentItem= c} placeholder="Equipment" />
               <br />
               <input type="submit" id="add-equipment-button" className="buttons" value = "add-equipment-button" onClick={e=> {
                  e.preventDefault();
                  setEquipment(prevEquipment =>
                  {
                     return prevEquipment.concat(equipmentItem.value);
                  })
                  }} />
               <div id="equipment">
                  <ol>
                     {
                     equipmentList.map(equipment => {
                        return (
                        <li>{equipment}</li>
                        )
                     })
                     }
                  </ol>
               </div>
            
               <input type="text" id="instruction" ref={(c) => instruction= c} placeholder="Instruction" />
               <br />
               <input type="submit" id="add-instruction-button" className="buttons" value = "add-instruction-button" onClick={e=> {
                  e.preventDefault();
                  setInstructions(prevInstructions =>
                  {
                     return prevInstructions.concat(instruction.value);
                  })
                  }} />
               <div id="instructions">
                  <ol>
                     {
                     instructionList.map(instruction => {
                        return (
                        <li>{instruction}</li>
                        )
                     })
                     }
                  </ol>
               </div>
      
               <br />
               <br />
               <button onClick={addRecipe} value="Add recipe">
                  add recipe
               </button>
               <span>{message}</span>
               
            </form> 
        </div>
    );
}
