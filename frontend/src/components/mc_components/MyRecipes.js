import React, {useState} from 'react';
import '../../stylesheets/Cookbook.css';
import Post from '../Post';
import axios from 'axios';

export default function MyRecipes()
{
    var bp = require('../Path.js');
    var storage = require('../../tokenStorage.js');

    const [searchResults,setResults] = useState('');
    const [postList,setCardList] = useState('');

    var ud=localStorage.getItem('user_data');
    var ud=JSON.parse(ud);

    var userId=ud.id;

    const getMyRecipes = async event =>  {
        event.preventDefault();

        // fix these vlues
        var obj = { userId:userId, search:'' };
        var js = JSON.stringify(obj);

        var config = {
        method: "post",
        url: bp.buildPath("api/login"),
        headers: {
            "Content-Type": "application/json",
            },
        data: js,
        };

        axios(config)
        .then(function (response) {
            var res = response.data;
            if (res.error) {
            // setMessage("User/Password combination incorrect");
            } else {
            storage.storeToken(res);

            var userId = res.id;
            var firstName = res.fn;
            var lastName = res.ln;

            var user = { firstName: firstName, lastName: lastName, id: userId };
            // SaveCookie(firstName, lastName, userId);
            localStorage.setItem("user_data", JSON.stringify(user));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return(
        <div className="container">
            <button id="back-btn-my-recipe" className="button">
                Insert back arrow
            </button>
            <div className="carousel-wrapper">
                <div className="carousel">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
            <button id="next-btn-my-recipe" className="button">
                Insert next arrow
            </button>
        </div>
    )
}