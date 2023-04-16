import React, {useState} from 'react';


import BasicInfo from './BasicInfo'
import TimeDiff from './TimeDiff'
import Ingredients from './Ingredients'
import Equipment from './Equipment'
import Instructions from './Instructions'

import axios from 'axios';

export default function NewRecipe(){
   // const [recName, changeName] = useState('')
   // const [recDesc, changeDesc] = useState('')
   // const [recTime, changeTime] = useState('')
   // const [recDiff, changeDiff] = useState('5')
   // const [recIngredients, setIngredients] = useState([]);
   // const [recEquipment, setEquipment] = useState([]);
   // const [recInstructions, setInstructions] = useState([]);
   
   const [message, setMessage] = useState('');

   let bp = require('../Path.js');
   const storage = require('../../tokenStorage.js')
   
   let ud = JSON.parse(localStorage.getItem('user_data'))
   let userId = ud.id;
   let recName;
   let recDesc;
   let recImage;
   let recTime;
   let recDiff;
   let recIngredients;
   let recEquipment;
   let recInstructions;
   


   // function that registers new user
   
   const addRecipe = async event =>
   {
      event.preventDefault();
      // let ingredients = JSON.stringify(recIngredients);
      // let equipment = JSON.stringify(recEquipment);
      // let instructions = JSON.stringify(recInstructions);
      
      let obj = 
      {
        userId:userId,
        recipeName:recName,
        time:recTime,
        difficulty:recDiff,
        description:recDesc,
        ingredients:recIngredients,
        equipment:recEquipment,
        instructions:recInstructions,
        image:recImage,
        jwtToken: storage.retrieveToken()
      }
      // console.log (obj)
      let js = JSON.stringify(obj);

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

   function addBasicInfo(newName, newDesc)
   { 
      recName = newName;
      recDesc = newDesc;

      console.log(recName);
      console.log(recDesc);
   }
   function addImage(newImage){
      recImage = newImage
      console.log(recImage)
   }
   function addTimeDiff(newTime, newDiff)
   {
      recTime = newTime
      recDiff = newDiff
      console.log(recTime)
      console.log(recDiff)
   }

   function addIngredients(newIngredients)
   {
      recIngredients = newIngredients
   }
   
   function addEquipment(newEquipment)
   {
      recEquipment = newEquipment
   }
   function addInstruction(newInstruction)
   {
      recInstructions = newInstruction
   }
   return(
      // BasicInfo: recipe name + description
      // TimeExp: time, difficulty
      // Ingredients: ingredients
      // Equipment:
      // Instruction:instructions
      <section id='add-form' >
         <div className='slider snaps-inline'>
            <BasicInfo defaultName='Recipe Name' defaultDesc='Recipe Description' basicSetter={addBasicInfo} imageSetter={addImage}/>
            <TimeDiff defaultTime='Time in Hrs' timeDiffSetter={addTimeDiff}/>
            <Ingredients ingredientSetter={addIngredients}/>
            <Equipment equipmentSetter={addEquipment}/>
            <Instructions instructionSetter={addInstruction}/>
         </div>
         <button onClick={addRecipe}>Add New Recipe</button>
         <span>{message}</span>
      </section>
      
   );   
        
    
}