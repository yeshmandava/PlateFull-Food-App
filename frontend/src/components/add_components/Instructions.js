import React, {useState, useEffect} from 'react'

export default function Instructions({defaultList, instructionSetter}) {
  const [instructionList, changeList] = useState(defaultList)
   let instructionRef = '';
   
   // adds curent contents of equipment input into equipment list
   function addToList(event)
   {
      event.preventDefault();
      if (instructionRef.value.trim()==='')
      {
         alert('Please enter an instruction')
         return
      }
      changeList(prevList =>{
         return [...prevList, instructionRef.value]
      });
   }

   // updates list in NewRecipe Parent and clears input
   useEffect(() =>{
      instructionSetter(instructionList)
      instructionRef.value = '';
   },[instructionList])
   function clearList(){
      changeList([]);
   }
   return (
    <div className='form-card'>
      <form>
         <h4 className='form-heading mb-3'>Instructions</h4>
         <textarea ref={(c) => instructionRef = c} placeholder='Instruction'></textarea>
         <input type='submit' className='btn btn-dark my-2' onClick={addToList}></input>
         <div className='text-center'>
            <button className='btn btn-gold' onClick={clearList}>Clear Ingredients</button>
         </div>
         <ul>
         {
            instructionList.map((equipment, index)=>{
               return(
                  <div><li>Step {index + 1} : {equipment}</li></div>
               )
            })
         }
         </ul>
         
      </form>
    </div>
  )
}
