import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import '../../stylesheets/MCPost.css'
import default_recipe_image from '../../img/default_recipe_image.png'
export default function MCPost({recipe, isPoster}) {
   let bp = require("../Path.js");
   const [saveStatus, setStatus] = useState("Save Status")
   const navigate = useNavigate();
   
   const ud = JSON.parse(localStorage.getItem('user_data'))
   const userId = ud.id;

   
   
   function openEdit(event)
   {
      event.preventDefault();
      localStorage.setItem('current_recipe', JSON.stringify(recipe))
      navigate('/edit-recipe');
   }

   function openFullRecipe(event)
   {
      localStorage.setItem('current_recipe', JSON.stringify(recipe))
      console.log(JSON.parse(localStorage.getItem('current_recipe')))
      navigate('/current-recipe')
   }
   return (
    <div className="mc-post">
        <div className="mc-postWrapper">

         <div className="mc-post-top">
            <div className="mc-post-name">
               <h4>{recipe.RecipeName}</h4>
            </div>
         
            <div className="photo-wrapper">
              <img className='mc-postPhoto' src={recipe.Image.myFile || default_recipe_image} alt="recipe image"/>
            </div>
         </div>
         
          <div className="mc-post-body">
            <div className='mc-post-desk'>
               {recipe.Description}
            </div>
            <div className="mc-post-stats">
              <h4 className="stat">{recipe.Time[0]} Hrs {recipe.Time[1]} Mins</h4>
              <h4 className="stat">Diff: {recipe.Difficulty} / 5</h4>
            </div>
            <div className='mc-post-buttonBox'>
               <button className='btn btn-gold' onClick={openFullRecipe}>Open</button>
               {
                  isPoster && 
                  <button className='btn btn-red' onClick={openEdit}>Edit</button>
               }
            </div>
          </div>
        </div>
    </div>
  )
}
<div className="shareTop">
<img className="shareProfileImg"  src="" alt=""/>
<input placeholder="What's in your mind?" className="shareInput"/>
</div>