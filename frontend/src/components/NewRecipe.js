import React, {useState} from 'react';
import axios from 'axios';
import "../stylesheets/NewRecipe.css";

export default function NewRecipe(){
   var bp = require('./Path.js');
   const storage = require('../tokenStorage')
   
   var ud = JSON.parse(localStorage.getItem('user_data'))
   var userId = ud.id;
   var recipeName;
   var time;
   var difficulty;
   var description;
   
   // interact with state variables
   var ingredient;
   var equipmentItem;
   var instruction;

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
        userId:userId,
        recipeName:recipeName.value,
        time:time.value,
        difficulty:difficulty.value,
        description:description.value,
        ingredients:ingredients,
        equipment:equipment,
        instructions:instructions,
        image:image,
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
            if (res.error)
            {
               setMessage( "Register API Error:" + res.error);
            }
            else
            {
               setMessage('New Recipe Posted');
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
            <h2>Add new recipe</h2>
            <form className="recipeForm" onSubmit={addRecipe}>
               <div className="recipeFormWrap">
                  <div className="recipeNameToDescription">
                     
                     <h3>Recipe Name</h3>
                     <input type="text" id="recipeName" ref={(c) => recipeName = c} placeholder="Recipe name" />
                     <br />

                     <h3>Time</h3>
                     <input type="text" id="time" ref={(c) => time = c} placeholder ="Time (hrs)" />
                     <br />

                     <h3>Select Difficulty</h3>
                     <select id="difficulty" ref={(c) => difficulty= c}>
                        <option value="1">1 - I could do this in my sleep</option>
                        <option value="2">2 - this isn't too bad</option>
                        <option value="3">3 - this is possible</option>
                        <option value="4">4 - come prepared</option>
                        <option value="5">5 - I hope you are a chef</option>
                     </select>
                     <br />
                     <h3>Description</h3>
                     <textarea id="description" ref={(c) => description= c} placeholder="Description" />
                     <br />
                  </div>
                  <div className="ingredientsToInstructions">
                     <h3>Ingredients</h3>
                     <div className="boxAndButton">
                        <input type="text" id="ingredient" ref={(c) => ingredient = c} placeholder="Ingredient" />
                        <br />
                        <input type="submit" id="add-ingredient-button" className="buttons" value = "Add Ingredient" onClick={e=> {
                           e.preventDefault();
                           setIngredients(prevIngredients =>
                           {
                              
                              return prevIngredients.concat(ingredient.value);
                              
                           })

                           }} />
                     </div>
                     <div  id="ingredients">
                        <ul>
                           {
                           ingredientList.map(ingredient => {
                              return (
                              <li>{ingredient}</li>
                              
                              )
                           })
                           }
                        </ul>
                     </div>
                     <h3>Equipment</h3>
                     <div className="boxAndButton">
                        <input type="text" id="equipmentBox" ref={(c) => equipmentItem= c} placeholder="Equipment" />
                        <br />
                        <input type="submit" id="add-equipment-button" className="buttons" value = "Add Equipment" onClick={e=> {
                           e.preventDefault();
                           setEquipment(prevEquipment =>
                           {
                              return prevEquipment.concat(equipmentItem.value);
                           })
                           }} />
                     </div>
                     <div id="equipment">
                        <ul>
                           {
                           equipmentList.map(equipment => {
                              return (
                              <li>{equipment}</li>
                              )
                           })
                           }
                        </ul>
                     </div>
                     <h3>Instructions</h3>

                     <div className="boxAndButton">
                        <input type="text" id="instruction" ref={(c) => instruction= c} placeholder="Instruction" />
                        <br />
                        <input type="submit" id="add-instruction-button" className="buttons" value = "Add Instruction" onClick={e=> {
                           e.preventDefault();
                           setInstructions(prevInstructions =>
                           {
                              return prevInstructions.concat(instruction.value);
                           })
                           }} />
                     </div>

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
                  </div>
               </div>
               <br />
               <br />
               <button id="add-recipe-button" onClick={addRecipe} value="Add recipe">
                  add recipe
               </button>
               <span>{message}</span>
               
            </form> 
        </div>
    );
}