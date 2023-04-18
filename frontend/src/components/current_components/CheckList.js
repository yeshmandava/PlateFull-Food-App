import React from 'react'
import ListItem from './ListItem'

export default function CheckList({list}) {
  return (
    <ul>
      {
         list.map((item, index) =>{
            return (<ListItem item={item} key={index} />)
         })
      }
    </ul>
  )
}
