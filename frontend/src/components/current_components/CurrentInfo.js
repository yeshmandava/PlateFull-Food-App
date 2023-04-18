import React from 'react'
import BasicInfo from './BasicInfo'
import TimeDiff from './TimeDiff'
import Ingredients from './Ingredients'
import Equipment from './Equipment'
import ButtonBox from './ButtonBox'
import default_recipe_image from '../../img/default_recipe_image.png'

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


export default function CurrentInfo({recipe}) {
   const ingredients = recipe.Ingredients;
   const equipment = recipe.Equipment;
   const instructions = recipe.Instructions;
   console.log(recipe)
   return (
    <div className='container-xl text-center my-5'>
      <Swiper 
      pagination={{"type": "progressbar"}} 
      navigation={true} 
      className="mySwiper"
      >
         <SwiperSlide>
            <div className = 'slide-container'>
               <img src={("data:image/jpeg;base64," + recipe.Image.myFile) || default_recipe_image} alt = "recipe image" />
            </div>
         </SwiperSlide>
         <SwiperSlide>
            <BasicInfo recipe={recipe}/>
         </SwiperSlide>
         <SwiperSlide>
            <TimeDiff recipe={recipe}/>
         </SwiperSlide>
         <SwiperSlide>
            <Ingredients ingredientList={ingredients}/>
         </SwiperSlide>
         <SwiperSlide>
            <Equipment equipmentList={equipment}/>
         </SwiperSlide>

         {
            instructions.map((instruction, index) =>{
               return(
                  <SwiperSlide key={index}>
                     <div className='slide-container'>
                        <div className='info-card'>
                           <div className='info-card-header'>
                              <h3>Step {index + 1} / {instructions.length} </h3>
                           </div>
                           <div className='info-card-body-wrapper'>
                              <div className='info-card-body'>
                                 <p>{instruction}</p>
                                 
                              </div>
                           </div>
                        </div>
                     </div> 
                  </SwiperSlide> 
               )               
            })
         }
      </Swiper>
      <ButtonBox recipe={recipe}/>
    </div>
  )
}
