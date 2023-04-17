import React from 'react'

export default function TimeDiff({defaultHrs, defaultMins, timeDiffSetter}) {
   let hourRef = '';
   let minuteRef = '';
   let diffRef = '';
   let submitRef ='';
   function transferInfo(event)
   {
      event.preventDefault();
      if (hourRef.value === '' || minuteRef.value ==='' || diffRef.value ==='')
      {
         alert('Please fill out all fields.')
         return
      }
      timeDiffSetter(hourRef.value, minuteRef.value, diffRef.value)
      submitRef.value = 'Done';
   }
   return (
      <div className='form-card text-center'>
         <form className='text-start'>
            <h4 className='form-heading mb-3'>Time and Difficulty</h4>
            <label>How long does it take?</label>
            <input type='number' ref={(c) => hourRef = c} placeholder={defaultHrs} className='mb-3'/>
            <p>Hrs</p>
            <input type='number' ref={(c) => minuteRef = c} placeholder={defaultMins} className='mb-3'></input>
            
            <label>How how difficult is the Recipe?</label>
            <select id="difficulty" ref={(c) => diffRef= c} className='mb-3'>
               <option value="1">1 - I could do this in my sleep</option>
               <option value="2">2 - It isn't too bad</option>
               <option value="3">3 - It is possible</option>
               <option value="4">4 - Come prepared</option>
               <option value="5">5 - I hope you are a chef</option>
            </select>
            <input type='submit' className='btn btn-dark my-2' ref={(c) => submitRef = c}onClick={transferInfo}></input>
         </form>
      </div>
  )
}
