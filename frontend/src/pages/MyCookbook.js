import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import Banner from '../components/mc_components/Banner';
import MyRecipes from '../components/mc_components/MyRecipes'
import DiscoveredRecipes from '../components/mc_components/DiscoverdRecipes'
function MyCookbook()
{
    return(
        <div>
            <Banner />
            {/* <Sidebar /> */}
            <MyRecipes />
            <DiscoveredRecipes /> 
        </div>
    )
}
export default MyCookbook;