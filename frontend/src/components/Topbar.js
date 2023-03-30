import React from 'react'
import "../stylesheets/Topbar.css"

export default function Topbar() {
  return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">PlateFull</span>
            </div>

            <div className="topbarCenter">
                <div className="searchbar">
                    <input placeholder="Search" className="searchInput"/>
                </div>
            </div>

            <div className="topbarRight">
                <div className="topbarLinks">
                </div>

            <img src="https://static.wikia.nocookie.net/kenneths-td-big-brother/images/b/b7/ByronS8.png" alt="" className="topbarImg"/> 
        </div>
    </div>
  )
}
