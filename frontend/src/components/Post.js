import React from 'react'
import "../stylesheets/Post.css"

export default function post() {
  return (
    <div className="post">
        <div className="postWrapper">

          <div className="topHalf">
            <div className="topLeft">
              <div className="postName">Recipe</div>
              <div className="postDescription">
                Description
              </div>
            </div>

            <div className="topRight">
              <img className="postPhoto"  src="https://static.wikia.nocookie.net/kenneths-td-big-brother/images/0/01/TDBB8Logo.png" alt=""/>
            </div>

          </div>

          <div className="bottomHalf">
            <div className="bottomLeft">
              <div className="postTime">Time:</div>
              <div className="postDifficulty">Difficulty:</div>
              <div className="postServes">Serves:</div>
            </div>
            <div className="bottomRight">
              <button className="postSaveButton">Save Recipe</button>
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