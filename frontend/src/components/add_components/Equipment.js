import React, {useState, useEffect} from 'react'

export default function Equipment({equipmentSetter}) {
   const [equipmentList, changeList] = useState([])
   let equipmentRef = '';
   
   // adds curent contents of equipment input into equipment list
   function addToList(event)
   {
      event.preventDefault();
      
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
    <div className='form-card'>
      <form>
         <input type='text' ref={(c) => equipmentRef = c} placeholder='Equpipment'></input>
         <input type='submit' className='btn btn-dark my-2' onClick={addToList}></input>
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
 