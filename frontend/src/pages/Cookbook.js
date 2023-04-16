
import React, {useState, useRef} from 'react';
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar';

import MyRecipes from '../components/mc_components/MyRecipes'
import DiscoveredRecipes from '../components/mc_components/DiscoverdRecipes'
import "../stylesheets/Cookbook.scss";
export default function Cookbook()
{
   const [testState, changeTest] = useState('unchanged');
   function test(newMessage)
   {
      changeTest(newMessage);
      alert(testState);
   }

   return(
      <div className="container-xl text-center my-5">
         <Topbar />
         <Sidebar />
         <h2>My Plates</h2>
         <MyRecipes functionAlert={test}/>
         <h2>Discovered Plates</h2>
         <DiscoveredRecipes /> 
      </div>
    )
}
