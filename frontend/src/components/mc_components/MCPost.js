import React, {useState} from 'react'
import axios from 'axios'
export default function Post({recipe}) {
   let bp = require("../Path.js");
   const [saveStatus, setStatus] = useState("Save Status")

   return (
    <div className="post">
        <div className="postWrapper">

          <div className="topHalf">
            <div className="topLeft">
              <div className="postName">{recipe.RecipeName}</div>
              <div className="postDescription">
                {recipe.Description}
              </div>
            </div>

            <div className="topRight">
              <img className="postPhoto"  src="https://static.wikia.nocookie.net/kenneths-td-big-brother/images/0/01/TDBB8Logo.png" alt=""/>
            </div>

          </div>

          <div className="bottomHalf">
            <div className="bottomLeft">
              <div className="postTime">{recipe.Time}</div>
              <div className="postDifficulty">{recipe.Difficulty}</div>
              <div className="postServes">Serves:</div> 
            </div>
            <div className="bottomRight">
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