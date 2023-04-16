import React from 'react'

export default function TimeDiff({defaultTime, timeDiffSetter}) {
   let timeRef = '';
   let diffRef = '';
   function transferInfo(event)
   {
      event.preventDefault();
      timeDiffSetter(timeRef.value, diffRef.value)
   }
   return (
      <div className='form-card'>
         <form>
            <input type='text' ref={(c) => timeRef = c} placeholder={defaultTime}></input>
            <select id="difficulty" ref={(c) => diffRef= c}>
               <option value="1">1 - I could do this in my sleep</option>
               <option value="2">2 - this isn't too bad</option>
               <option value="3">3 - this is possible</option>
               <option value="4">4 - come prepared</option>
               <option value="5">5 - I hope you are a chef</option>
            </select>
            <input type='submit' className='btn btn-dark my-2' onClick={transferInfo}></input>
         </form>
      </div>
  )
}
