import React, {useState} from 'react';

export default function NewRecipe(){
    var bp = require('./Path.js');

   var userId = 'placeholder';
   var recipeName = 'placeholder';
   var time = 'placeholder';
   var difficulty = 'placeholder';
   var description = 'placeholder';
   var ingredients = null;
   var equipment = null;
   var instructions = null;
   var image = 'placeholder'; //this should be an image link
   var rating = 0;
   var numOfRatings = 0;
   var sumOfRatings = 0;


   const [message, setMessage] = useState('');
   
   // function that registers new user
   const addRecipe = async event =>
   {
      event.preventDefault();

      var obj = 
      {
        userId:userId.value,
        recipeName:recipeName.value,
        time:time.value,
        difficulty:difficulty.value,
        description:description.value,
        ingredients:ingredients.value,
        equipment:equipment.value,
        instructions:instructions.value,
        image:image.value,
        rating:rating.value,
        numOfRatings:numOfRatings.value,
        sumOfRatings:sumOfRatings.value,
      }
      
      var js = JSON.stringify(obj);


      // defining the data to be input to the register api
      try
      {
         const response = await fetch(
            bp.buildPath('api/register'), 
            {
               method:'POST',
               body:js,
               headers:
               {'Content-Type': 'application/json'}
            }
         );

         var txt = await response.text();
         var res = JSON.parse(txt);

         if (res.error.length > 0)
         {
            setMessage( "Register API Error:" + res.error);
         }
         else
         {
            setMessage('New User Registered');
            }
         }
         catch(e)
         {
            setMessage(e.toString());
         }

      };
        
    return(
        <div>
           <form onSubmit={newRecipe}>
            </form> 
        </div>
    );
}