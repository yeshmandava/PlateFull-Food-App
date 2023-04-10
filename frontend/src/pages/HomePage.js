import React, {useState, useRef, useEffect } from 'react'
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import "../stylesheets/Home.css";

export default function Home() {
   
   return (
    <div>
        <Topbar/>
        
        <div className="homeContainer">
          <Sidebar/>
          <Feed/>
          <Rightbar/>
        </div>
       
    </div>
  )
}
