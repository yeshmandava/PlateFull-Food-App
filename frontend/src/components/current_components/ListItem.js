import React from 'react'

export default function ListItem({item}) {
  return (
      <li>
         <div className='ingredient-wrapper'>
            <h4>{item}</h4>
            <div className='checkbox-wrapper'>
               <input type='checkbox' className='checkbox-lg checkbox-green'/>
            </div>
         </div> 
      </li>
      
  )
}
