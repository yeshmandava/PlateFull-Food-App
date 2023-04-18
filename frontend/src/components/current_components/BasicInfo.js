import React from 'react'
export default function BasicInfo({recipe}) {
  return (
    <div className='slide-container'>
      <div className='info-card'>
         <div className='info-card-header'>
            <h3>{recipe.RecipeName}</h3>
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
