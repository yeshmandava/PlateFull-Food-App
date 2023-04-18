import React, {useState, useEffect} from 'react'

export default function Ingredients({defaultList, ingredientSetter}) {
   const [ingredientList, changeList] = useState(defaultList)
   let ingredientRef = '';
   
   // adds curent contents of Ingredient input into Ingredient list
   function addToList(event)
   {
      
      event.preventDefault();
      if (ingredientRef.value.trim()==='')
      {
         alert('Please enter an ingredient')
         return
      }
      changeList(prevList =>{
         return [...prevList, ingredientRef.value]
      });
   }

   // updates list in NewRecipe Parent
   
   useEffect(() =>{
      ingredientSetter(ingredientList)
      ingredientRef.value = '';
   },[ingredientList])
   
   function clearList(){
      changeList([]);
   }
   return (
    <div className='form-card text-center'>
      <form className='text-start'>
         <h4 className='form-heading mb-3'>Ingredients</h4>

         <label>Add your ingredients</label>
         <input type='text' ref={(c) => ingredientRef = c} placeholder='Ingredient' className='mb-3'/>
         
         <input type='submit' className='btn btn-dark my-2' onClick={addToList}/>
         <div className='text-center'>
            <button className='btn btn-gold' onClick={clearList}>Clear Ingredients</button>
         </div>
         <ul>
         {
            ingredientList.map(ingredient =>{
               return(
                  <li>{ingredient}</li>
               )
            })
         }
         </ul>
         
      </form>
    </div>
  )
}
