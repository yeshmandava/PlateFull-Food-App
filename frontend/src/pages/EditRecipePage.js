import React from 'react'
import EditForm from '../components/edit_components/EditForm'

export default function EditRecipePage() {
   const currentRecipe = localStorage.getItem('current_recipe')
   
   return (
    <div>
        <EditForm currentRecipe = {currentRecipe}/>
    </div>
  )
}
