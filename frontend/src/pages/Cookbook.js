import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import Banner from '../components/mc_components/Banner';
import MyRecipes from '../components/mc_components/MyRecipes'
import DiscoveredRecipes from '../components/mc_components/DiscoverdRecipes'
import "../stylesheets/Cookbook.scss";


export default function Cookbook()
{
    return(
        <div>
            <Banner />
            {/* <Sidebar /> */}
            <h2>My Plates</h2>
            <MyRecipes />
            <DiscoveredRecipes /> 
        </div>
    )
}
