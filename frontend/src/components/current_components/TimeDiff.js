import React from 'react'
{/* <option value="1">1 - I could do this in my sleep</option>
               <option value="2">2 - It isn't too bad</option>
               <option value="3">3 - Takes a little work</option>
               <option value="4">4 - Come prepared for a challenge</option>
               <option value="5">5 - I hope you are a chef</option> */}
export default function TimeDiff({recipe}) {
  function printDifficulty(difNum){
      if(difNum == 1) return '1/5 - I could do this in my sleep'
      else if(difNum == 2) return "2/5 - It isn't too bad"
      else if(difNum == 3) return '3/5 - Takes a little work'
      else if(difNum == 4) return '4/5 - Come prepared for a challenge'
      else if(difNum == 5) return '5/5 I hope you are a chef'
      else return '3/5 - Takes a little work'
      

  }
   return (
   <div className='slide-container'>
      <div className='info-card'>
         <div className='info-card-header'>
            <h3>Time and Difficulty</h3>
         </div>
         <div className='info-card-body-wrapper'>
            <div className='info-card-body'>
               <h4>Time:</h4>
               <p> {recipe.Time[0]} Hours and {recipe.Time[1]} minutes</p>
               <h4>Difficulty</h4>
               <p>{printDifficulty(recipe.Difficulty)}</p>
            </div>
         </div>
      </div>
   </div> 
  )
}
