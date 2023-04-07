import React from 'react'
import "../stylesheets/Feed.css"
import Share from "./Share"
import Post from "./Post"

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
        <Post/>
      </div>
    </div>
  )
}