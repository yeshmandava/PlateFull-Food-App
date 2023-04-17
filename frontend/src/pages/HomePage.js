import React, {useState} from 'react'
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";

import "../stylesheets/Home.scss";

export default function Home() {
   
   return (
    <div id='homepage'>
        <Topbar/>
        <div className="homeContainer">
          <Sidebar/>
          <Feed/>
          <Rightbar/>
        </div>
    </div>
  )
}
