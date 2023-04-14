import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import '../../stylesheets/MCPost.css'
export default function MCPost({recipe}) {
   let bp = require("../Path.js");
   const [saveStatus, setStatus] = useState("Save Status")
   const navigate = useNavigate();
   
   function openEdit(event)
   {
      event.preventDefault();
      localStorage.setItem('current_recipe', JSON.stringify(recipe))
      navigate('/edit-recipe');
      
   }
   return (
    <div className="mc-post">
        <div className="mc-postWrapper">

          <div className="topHalf">
            <div className="topLeft">
              <div className="mc-postName">{recipe.RecipeName}</div>
              <div className="mc-postDescription">
                {recipe.Description}
              </div>
            </div>

            <div className="topRight">
              <img className="mc-postPhoto"  src="https://static.wikia.nocookie.net/kenneths-td-big-brother/images/0/01/TDBB8Logo.png" alt=""/>
            </div>

          </div>

          <div className="bottomHalf">
            <div className="bottomLeft">
              <div className="mc-postTime">{recipe.Time}</div>
              <div className="mc-postDifficulty">{recipe.Difficulty}</div>
              <div className="mc-postServes">Serves:</div> 
            </div>
            <div className="bottomRight">
               <button onClick={openEdit}>Edit Recipes</button>
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