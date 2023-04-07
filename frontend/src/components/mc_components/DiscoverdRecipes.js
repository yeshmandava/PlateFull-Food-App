import React, {useState} from 'react';
import Post from '../Post';

import '../../stylesheets/Cookbook.css';

export default function DiscoveredRecipes()
{
    return(
        <div className="container">
            <button id="back-btn-disc-recipe" className="button">
                Insert back arrow
            </button>
            <div className="carousel">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
            <button id="next-btn-disc-recipe" className="button">
                Insert next arrow
            </button>
        </div>
    )
}