import React, { useState } from 'react';
import "../stylesheets/Sidebar.css"
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';


export default function Sidebar() {

  const [sidebarr, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebarr);



  return (
    <div className="sidebar">
      <Link to='#' className='menu-arrow'>
          <FaIcons.FaChevronRight onClick={showSidebar} />
        </Link>
      <nav className={sidebarr ? 'nav-menu active' : 'nav-menu'}>
        <div className="sidebarWrapper nav-menu-items" onClick={showSidebar}>
          <div className="sidebarTopImgContainer">
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            <img className="sidebarTopImg" src="https://static.wikia.nocookie.net/kenneths-td-big-brother/images/b/b7/ByronS8.png" alt=""/> 
          </div>
          
          <hr className="sidebarHr"/>
          <ul className="sidebarList">

            <li className="sidebarListItem">
              <Link to="/home">
                <img className="sidebarIcon" src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt=""/> 
                <span className="sidebarListItemText">Home</span>
              </Link>
            </li>
            <li className="sidebarListItem">
            <Link to="/cookbook">
              <img className="sidebarIcon" src="https://cdn-icons-png.flaticon.com/512/481/481490.png" alt=""/> 
              <span className="sidebarListItemText">My Cookbook</span>
            </Link>

            </li>
            <li className="sidebarListItem">
              <Link to="/add-recipe">
                <img className="sidebarIcon" src="https://cdn-icons-png.flaticon.com/512/6662/6662930.png" alt="Add Recipe Icon"/> 
                <span className="sidebarListItemText">Add a Recipe</span>
              </Link>
            </li>
            <li className="sidebarListItem">
            <img className="sidebarIcon" src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt=""/> 
              <span className="sidebarListItemText">Profile</span>
            </li>
            <li className="sidebarListItem">
              <Link to="/">
                <img className="sidebarIcon" src="https://cdn.icon-icons.com/icons2/2518/PNG/512/logout_icon_151219.png" alt=""/> 
                <span className="sidebarListItemText">Logout</span>
              </Link>
            </li>
          </ul>

          <hr className="sidebarHr"/>
        

        

        </div>
      </nav>
    </div>
    
  )
}
