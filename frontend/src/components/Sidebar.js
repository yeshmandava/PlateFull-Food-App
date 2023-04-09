import React from 'react'
import "../stylesheets/Sidebar.css"
import { Link } from 'react-router-dom';
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarTopImgContainer">
          <img className="sidebarTopImg" src="https://static.wikia.nocookie.net/kenneths-td-big-brother/images/b/b7/ByronS8.png" alt=""/> 
        </div>
        
        <hr className="sidebarHr"/>
        <ul className="sidebarList">

          <li className="sidebarListItem">
            <img className="sidebarIcon" src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt=""/> 
            <span className="sidebarListItemText">Home</span>
          </li>
          <li className="sidebarListItem">
          <Link to="/cookbook">
            <img className="sidebarIcon" src="https://cdn-icons-png.flaticon.com/512/481/481490.png" alt=""/> 
            <span className="sidebarListItemText">My Cookbook</span>
          </Link>

          </li>
          <li className="sidebarListItem">
          <img className="sidebarIcon" src="https://cdn-icons-png.flaticon.com/512/6662/6662930.png" alt=""/> 
            <span className="sidebarListItemText">Random Recipe</span>
          </li>
          <li className="sidebarListItem">
          <img className="sidebarIcon" src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt=""/> 
            <span className="sidebarListItemText">Profile</span>
          </li>
          <li className="sidebarListItem">
          <img className="sidebarIcon" src="https://cdn.icon-icons.com/icons2/2518/PNG/512/logout_icon_151219.png" alt=""/> 
            <span className="sidebarListItemText">Logout</span>
          </li>
        </ul>

        <hr className="sidebarHr"/>
        

        

      </div>
    </div>
    
  )
}
