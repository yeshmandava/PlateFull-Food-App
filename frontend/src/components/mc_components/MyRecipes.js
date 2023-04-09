import React, {useState} from 'react';
import '../../stylesheets/Cookbook.css';
import Post from '../Post';
import axios from 'axios';
import PostList from '../PostList'

export default function MyRecipes()
{
   var bp = require('../Path.js');
   var storage = require('../../tokenStorage.js');
   const [myRecipes, setMyRecipes] = useState([]);
   var ud = JSON.parse(localStorage.getItem('user_data'));
   console.log(ud)
   var userId=ud.id;
   var jwtToken = storage.retrieveToken();

    const getMyRecipes = async (event) =>  {
        var obj = {userId:userId, search:'',jwtToken: jwtToken};
        console.log(obj)
        console.log(localStorage.getItem('user_data'))
        var js = JSON.stringify(obj);

        var config = 
         {
            method: "post",
            url: bp.buildPath("api/searchrecipes"),
            headers: {
            "Content-Type": "application/json",
            },
            data: js,
         };

      //   axios(config)
      //   .then(function (response) 
      //    {
      //       var res = response.data;
      //       if (res.error) {
      //          console.log('search failed')
      //       } 
      //       else 
      //       {
      //          storage.storeToken(res.jwtToken);
      //          console.log(res.results);
      //          setMyRecipes(res.results);
      //       }
      //    })
      //   .catch(function (error)
      //    {
      //       console.log('in error')
      //       console.log(error);
      //    });
    }
    getMyRecipes();
    return(
        <div className="container">
            <button id="back-btn-my-recipe" className="button">
                Insert back arrow
            </button>
            <div className="carousel-wrapper">
                <div className="carousel">
                    <PostList recipeList = {myRecipes}/>
                </div>
            </div>
            <button id="next-btn-my-recipe" className="button">
                Insert next arrow
            </button>
        </div>
    )
}