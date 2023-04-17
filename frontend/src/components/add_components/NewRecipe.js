import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import BasicInfo from './BasicInfo'
import TimeDiff from './TimeDiff'
import Ingredients from './Ingredients'
import Equipment from './Equipment'
import Instructions from './Instructions'


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

export default function NewRecipe(){
   const navigate = useNavigate();

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
      if (!recName || !recDesc || !recTime || !recImage || !recTime || 
          !recDiff || recIngredients.length==0  || recEquipment.length==0 || recInstructions.length==0 )
      {
         let object = 
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
      console.log(object);
         alert('Please go back and fill all sections.')
         return
      }

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
               setTimeout(navigate, 2000, '/home')
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
      <section id='add-form'>
         <Swiper 
         pagination={{"type": "progressbar"}} 
         navigation={true} 
         className="mySwiper">
            <SwiperSlide>
               <BasicInfo 
               defaultName='Recipe Name' 
               defaultDesc='Recipe Description' 
               basicSetter={addBasicInfo} 
               imageSetter={addImage}
               />
            </SwiperSlide>
            <SwiperSlide>
               <TimeDiff 
               defaultHrs='Hours' 
               defaultMins='Minutes'
               timeDiffSetter={addTimeDiff}
               />
            </SwiperSlide>
            <SwiperSlide>
               <Ingredients ingredientSetter={addIngredients}/>
            </SwiperSlide>
            <SwiperSlide>
               <Equipment equipmentSetter={addEquipment}/>
            </SwiperSlide>
            <SwiperSlide>
               <Instructions instructionSetter={addInstruction}/>
            </SwiperSlide>
            <SwiperSlide >
               <div className='form-card text-center'>
                  <form className='text-center'>
                     <button className='btn btn-dark' onClick={addRecipe}>Add New Recipe</button>
                     <h1>{message}</h1>
                  </form>
               </div>
            </SwiperSlide>
         </Swiper>
         
      </section>
      
   );   
}
