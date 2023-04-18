import React, {useState} from 'react'
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";

import "../stylesheets/Home.scss";

export default function Home() {
   
   return (
    <div id='homepage'>
        <Topbar/>
        <div className="homeContainer">
          <Feed/>
        </div>
    </div>
  )
}
