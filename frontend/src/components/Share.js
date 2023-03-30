import React from 'react'
import "../stylesheets/Share.css"


export default function Share() {
  return (
    <div className="share">
        <div className="shareWrapper">
            <hr className="shareHr"/>
            <div className="shareBottom">

              <div className="shareOptions">
                <div className="shareOption">
                  <img className="shareIcon" src="https://cdn-icons-png.flaticon.com/512/685/685655.png" alt=""/>
                  <span className="shareOptionText">Photo or Video</span>
                </div>
                <div className="shareOption">
                  <img className="shareIcon" src="https://cdn-icons-png.flaticon.com/512/1620/1620735.png" alt=""/>
                  <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                  <img className="shareIcon" src="https://cdn-icons-png.flaticon.com/512/535/535239.png" alt=""/>
                  <span className="shareOptionText">Location</span>
                </div>
              </div>
              <button className="shareButton">Share</button>
            </div>
        </div>
    </div>
  )
}

