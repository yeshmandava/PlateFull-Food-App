import React from 'react'
import CheckList from './CheckList';

export default function Instructions({ingredientList}) {
  return (
      <div className='slide-container'>
         <div className='info-card'>
            <div className='info-card-header'>
               <h3>Ingredients</h3>
            </div>
            <div className='info-card-body-wrapper'>
               <div className='info-card-body'>
                  <CheckList list={ingredientList}/>
               </div>
            </div>
         </div>
      </div> 
  )
}
