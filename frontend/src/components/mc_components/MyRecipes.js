import React, {useState} from 'react';
import '../../stylesheets/Cookbook.css';
import Post from '../Post';
import axios from 'axios';
import PostList from '../PostList'

export default function MyRecipes()
{
   var bp = require('../Path.js');
   var storage = require('../../tokenStorage.js');
   const [recipeList,setRecipes] = useState([]);
   let
   var ud=JSON.parse(localStorage.getItem('user_data'));
   var userId=ud.id;
   var tok = storage.retrieveToken();

    const getMyRecipes = async event =>  {
        event.preventDefault();

        // fix these vlues
        var obj = { userId:userId, search:'',jwtToken: tok};
        var js = JSON.stringify(obj);

        var config = 
         {
            method: "post",
            url: bp.buildPath("api/searchsavedrecipes"),
            headers: {
            "Content-Type": "application/json",
            },
            data: js,
         };

        axios(config)
        .then(function (response) 
         {
            var res = response.data;
            if (res.error) {
            // setMessage("User/Password combination incorrect");
            } else {
            storage.storeToken(res.jwtToken);
            console.log(res.results);
            setRecipes(res.results);
            }
         })
        .catch(function (error)
         {
            console.log(error);
         });
    }
    
    getMyRecipes();
    return(
        <div className="container">
            <button id="back-btn-my-recipe" className="button">
                Insert back arrow
            </button>
            <div className="carousel-wrapper">
                <div className="carousel">
                    <PostList recipeList = {recipeList}/>
                </div>
            </div>
            <button id="next-btn-my-recipe" className="button">
                Insert next arrow
            </button>
        </div>
    )
}