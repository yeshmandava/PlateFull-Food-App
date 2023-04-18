import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

import BasicInfo from '../add_components/BasicInfo';
import TimeDiff from '../add_components/TimeDiff';
import Ingredients from '../add_components/Ingredients';
import Equipment from '../add_components/Equipment';
import Instructions from '../add_components/Instructions';


import axios from 'axios';

// swiper imports
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css"
import "swiper/css/navigation"
import "swiper/css/pagination"

// import Swiper core and required modules
import SwiperCore, {
   Pagination,Navigation
 } from 'swiper/core';
 
// install Swiper modules
SwiperCore.use([Pagination,Navigation]);

export default function EditRecipe() {
   const navigate = useNavigate();
   const [message, setMessage] = useState('');

   let bp = require('../Path.js');
   const storage = require('../../tokenStorage.js')
   
   const currentRecipe = JSON.parse(localStorage.getItem('current_recipe'))
   let recId = currentRecipe._id
   let recName = currentRecipe.RecipeName;
   let recTime = currentRecipe.Time;
   let recDiff = currentRecipe.Difficulty;
   let recDesc = currentRecipe.Description;
   let recIngredients = currentRecipe.Ingredients;
   let recEquipment = currentRecipe.Equipment;
   let recInstructions = currentRecipe.Instructions;
   let recImage = currentRecipe.Image;


   // function that registers new user
   
   const editRecipe = async event =>
   {
      event.preventDefault();
      if (!recName || !recDesc || !recTime || !recImage || !recTime || 
          !recDiff || recIngredients.length===0  || recEquipment.length===0 || recInstructions.length===0 ){
            alert('Please Complete All Sections')
            return
      }
      
      let obj = 
      {
         recipeId:recId,
         recipeName:recName,
         time:recTime,
         difficulty:recDiff,
         description:recDesc,
         ingredients:recIngredients,
         equipment:recEquipment,
         instructions:recInstructions,
         image:recImage,
         numOfRatings:currentRecipe.NumOfRatings,
         sumOfRatings:currentRecipe.SumOfRatings,
         jwtToken: storage.retrieveToken()
      }
      let js = JSON.stringify(obj);
      let config = 
      {
         method: "post",
         url: bp.buildPath("api/editrecipe"),
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
               setMessage('Recipe Edited');
               setTimeout(navigate, 2000, -1)
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
   }
   function addTimeDiff(newHrs, newMins, newDiff)
   {
      recTime = [newHrs, newMins]
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
      <section id='edit-form'>
         <Swiper 
         pagination={{"type": "progressbar"}} 
         navigation={true} 
         className="mySwiper">
            <SwiperSlide>
               <BasicInfo 
               defaultName={recName} 
               defaultDesc={recDesc}
               defaultImage={recImage.myFile} 
               basicSetter={addBasicInfo} 
               imageSetter={addImage}
               />
            </SwiperSlide>
            <SwiperSlide>
               <TimeDiff 
               defaultHrs={recTime[0]} 
               defaultMins={recTime[1]}
               timeDiffSetter={addTimeDiff}
               />
            </SwiperSlide>
            <SwiperSlide>
               <Ingredients defaultList={recIngredients} ingredientSetter={addIngredients}/>
            </SwiperSlide>
            <SwiperSlide>
               <Equipment defaultList={recEquipment} equipmentSetter={addEquipment}/>
            </SwiperSlide>
            <SwiperSlide>
               <Instructions defaultList={recInstructions} instructionSetter={addInstruction}/>
            </SwiperSlide>
            <SwiperSlide >
               <div className='form-card text-center'>
                  <form className='text-center'>
                     <button className='btn btn-dark' onClick={editRecipe}>Edit Recipe</button>
                     <h1>{message}</h1>
                  </form>
               </div>
            </SwiperSlide>
         </Swiper>
         <div className='text-center'></div>
      </section>
   )
}
