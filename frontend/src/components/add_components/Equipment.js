import React, {useState, useEffect} from 'react'

export default function Equipment({equipmentSetter}) {
   const [equipmentList, changeList] = useState([])
   let equipmentRef = '';
   
   // adds curent contents of equipment input into equipment list
   function addToList(event)
   {
      event.preventDefault();
      if (equipmentRef.value.trim()==='')
      {
         alert('Please enter an piece of equipment')
         return
      }
      changeList(prevList =>{
         return [...prevList, equipmentRef.value]
      });
   }

   // updates list in NewRecipe Parent and clears input
   useEffect(() =>{
      equipmentSetter(equipmentList)
      equipmentRef.value = '';
   },[equipmentList])

   return (
    <div className='form-card text-center'>
      <form className='text-start'>
         <h4 className='form-heading mb-3'>Equipment</h4>

         <label>What equipment do you need?</label>
         <input type='text' ref={(c) => equipmentRef = c} placeholder='Equipment' className='mb-3'/>
         <input type='submit' className='btn btn-dark my-2' onClick={addToList}/>
         <ul>
         {
            equipmentList.map(equipment =>{
               return(
                  <li>{equipment}</li>
               )
            })
         }
         </ul>
         
      </form>
    </div>
  )
}
 