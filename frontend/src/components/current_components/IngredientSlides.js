import React from 'react'

// swiper imports
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css"

export default function IngredientSlides({recipe}) {
  return ( 
   <div className='slide-container'>
   <div className='info-card'>
      <div className='info-card-header'>
         <h3>Ingredients</h3>
      </div>
      <div className='info-card-body-wrapper'>
         <div className='info-card-body'>
            <p>{recipe.Description}</p>
         </div>
      </div>
   </div>
 </div> 
  )
}
