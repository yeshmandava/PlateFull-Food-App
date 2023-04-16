import React, {useState, useEffect} from 'react'

export default function Instructions({instructionSetter}) {
  const [instructionList, changeList] = useState([])
   let instructionRef = '';
   
   // adds curent contents of equipment input into equipment list
   function addToList(event)
   {
      event.preventDefault();
      
      changeList(prevList =>{
         return [...prevList, `Step ${instructionList.length + 1}: ${instructionRef.value}`]
      });
   }

   // updates list in NewRecipe Parent and clears input
   useEffect(() =>{
      instructionSetter(instructionList)
      instructionRef.value = '';
   },[instructionList])

   return (
    <div className='form-card'>
      <form>
         <input type='text' ref={(c) => instructionRef = c} placeholder='Instruction'></input>
         <input type='submit' className='btn btn-dark my-2' onClick={addToList}></input>
         <ul>
         {
            instructionList.map(equipment =>{
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
