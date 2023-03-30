import React, {useState} from 'react';


export default function NewRecipe(){
   var bp = require('./Path.js');

   var userId = 'placeholder';
   var recipeName = 'placeholder';
   var time = 'placeholder';
   var difficulty = 'placeholder';
   var description = 'placeholder';
   
   // use state variables
   var ingredient = 'placeholder'
   var equipmentItem = 'placeholder';
   var instruction = 'placeholder';

   var image = 'placeholder'; //this should be an image link
   var rating = 0;
   var numOfRatings = 0;
   var sumOfRatings = 0;


   const [message, setMessage] = useState('');
   const [ingredientList, setIngredients] = useState(['placeholder']);
   const [equipmentList, setEquipment] = useState(['placeholder']);
   const [instructionList, setInstructions] = useState(['placeholder']);
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
        rating:rating,
        numOfRatings:numOfRatings,
        sumOfRatings:sumOfRatings,
      }
      console.log(obj)
      
      var js = JSON.stringify(obj);


      // defining the data to be input to the register api
      try
      {
         const response = await fetch(
            bp.buildPath('api/addRecipe'), 
            {
               method:'POST',
               body:js,
               headers:
               {'Content-Type': 'application/json'}
            }
         );

         var txt = await response.text();
         var res = JSON.parse(txt);

         if (res.error.length > 0)
         {
            setMessage( "Register API Error:" + res.error);
         }
         else
         {
            setMessage('New Recipe Posted');
            }
         }
         catch(e)
         {
            setMessage(e.toString());
         }

      };
        
    return(
        <div>
            <h2>Add new recipe</h2>
            <form onSubmit={addRecipe}>
               
               <input type="text" id="recipeName" ref={(c) => recipeName = c} placeholder="Recipe name" />
               <br />
               <input type="text" id="time" ref={(c) => time = c} placeholder ="Time (hrs)" />

               <br />
               <select id="difficulty" ref={(c) => difficulty= c}>
                  <option value="1">1 - I could do this in my sleep</option>
                  <option value="2">2 - this isn't too bad</option>
                  <option value="3">3 - this is possible</option>
                  <option value="4">4 - come prepared</option>
                  <option value="5">5 - I hope you are a chef</option>
               </select>
               <br />
               <textarea id="description" ref={(c) => description= c} placeholder="Description" />
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