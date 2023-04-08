import React, {useState} from 'react'
import "../stylesheets/Feed.css"
import Share from "./Share"
import PostList from './PostList'

import axios from "axios"

export default function Feed() {
  let bp = require("./Path.js");
  let storage = require("../tokenStorage.js");
  const [recipeList, setRecipes] = useState([]);
  const [message, setMessage] = useState("");
  const searchRecipes = async (event) => 
  {
    var postName = "";
    const obj = {userId: "", search: "", jwtToken: storage.retrieveToken()}
    const js = JSON.stringify(obj)

    console.log(storage.retrieveToken());

    var config = {
			method: "post",
			url: bp.buildPath("api/searchrecipes"),
			headers: {
				"Content-Type": "application/json",
			},
			data: js,
		};

    axios(config)
      .then(function (response)
      {
        var res = response.data;
        if (res.error){
          setMessage("Search failed");
        } 
        else
        {
          setRecipes(res.results);
          console.log(res.results);
        }
      })
      .catch(function (error) 
      {
        console.log("in error")
        console.log(error);
      })
  }
  return (
  
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        <button onClick={searchRecipes}>Search</button>
        <PostList recipeList = {recipeList}/>
      </div>
    </div>
  )
}