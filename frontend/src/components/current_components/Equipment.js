import React from 'react'
import CheckList from './CheckList';

export default function EquipmentSlides({equipmentList}) {
  return (
   <div className='slide-container'>
      <div className='info-card'>
         <div className='info-card-header'>
            <h3>Equipment</h3>
         </div>
         <div className='info-card-body-wrapper'>
            <div className='info-card-body'>
               <CheckList list={equipmentList}/>
            </div>
         </div>
      </div>
   </div> 
  )
}
