import React, {useState, useEffect} from 'react'

export default function Ingredients({ingredientSetter}) {
   const [ingredientList, changeList] = useState([])
   let ingredientRef = '';
   
   // adds curent contents of Ingredient input into Ingredient list
   function addToList(event)
   {
      event.preventDefault();
      
      changeList(prevList =>{
         return [...prevList, ingredientRef.value]
      });
   }

   // updates list in NewRecipe Parent
   useEffect(() =>{
      ingredientSetter(ingredientList)
      ingredientRef.value = '';
   },[ingredientList])

   return (
    <div className='form-card'>
      <form>
         <input type='text' ref={(c) => ingredientRef = c} placeholder='Ingredient'></input>
         <input type='submit' className='btn btn-dark my-2' onClick={addToList}></input>
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
