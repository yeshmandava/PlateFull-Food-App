import React, {useState, useEffect, useRef} from 'react'
import "../stylesheets/Home.scss";
import Share from "./Share"
import PostList from './PostList'

import axios from "axios"

export default function Feed() {
   // file path access variables
   let bp = require("./Path.js");
   let storage = require("../tokenStorage.js");
  
   // states that work with api
   const [recipeList, setRecipes] = useState([]);
   const [message, setMessage] = useState("");

   // states that work with search bar
   const [searchQuery, setQuery] = useState('');
   const searchRef = useRef();
   
   // sends a fetch request to searchrecipe apie
   // value of search has been passed into Feed.js as a prop: 'searchQuery'
   const searchRecipes = async (event) => 
   {
      const obj = {userId: "", search: searchQuery, jwtToken: storage.retrieveToken()}
      const js = JSON.stringify(obj)

      // request payload
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
            // update token
            storage.retrieveToken('token_data', res.jwt)
            setRecipes(res.results);
         }
      })
      .catch(function (error) 
      {
         console.log("Search failed")
         console.log(error);
      })
   }
   useEffect(() => {searchRecipes()}, [])
   useEffect(() => 
   {
      searchRecipes()
   } , [searchQuery])
   const handleSearch = (event) =>
   {
      setQuery(event.target.value)
   }
   return (
      <div className="feedWrapper">
      <div className="feed">
         <form id='search-form'>
            <input type="text" placeholder="Search" ref={searchRef} onChange={handleSearch}/>
         </form>
         <PostList recipeList = {recipeList}/>
      </div>
      </div>
   )
}