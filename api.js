require('express');
require('mongodb');
const mongoose = require('mongoose');

exports.setApp = function(app,client)
{
    //load user model
    const User = require("./models/user.js");
    //load card model
    const Card = require("./models/card.js");

    const Recipe = require("./models/recipe.js");

    const SavedRecipe = require("./models/savedRecipe.js");

    app.post('/api/addcard', async (req, res, next) =>
    {
    // incoming: userId, color
    // outgoing: error
        
    // const { userId, card } = req.body;
    let token = require('./createJWT.js');
    const { userId, card, jwtToken } = req.body;
    
    try
    {
      if( token.isExpired(jwtToken))
      {
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }

    //const newCard = { Card: card, UserId: userId };
    const newCard = new Card({ Card: card, UserId: userId });
    var error = '';
    try 
    {
        // const db = client.db();
        // const result = db.collection('Cards').insertOne(newCard);
        newCard.save();
    }
      catch (e) 
    {
        error = e.toString();
    }


    var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = { error: error, jwtToken: refreshedToken };
      res.status(200).json(ret);

    });


    app.post('/api/register', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
      
      const {firstName, lastName, email, login, password} = req.body;
      var error = '';

      //const db = client.db("COP4331-LargeProject");

      // find() is timing out for some reason
      const results = await User.find({Login:login}); 

      if( results.length > 0 )
      {
        error = 'Login Taken';
      }
      else
      {
        const newUser = new User({FirstName: firstName, LastName: lastName, Email: email, Login: login, Password: password});
      
        try
        {
          //const db = client.db('COP4331-LargeProject');
          //const result = db.collection('Users').insertOne(newUser);
          newUser.save();
        }
        catch(e)
        {
          error = e.toString();
        }
      }



      //cardList.push( card );

      var ret = { error: error };
      res.status(200).json(ret);
    });


    app.post('/api/login', async (req, res, next) => 
    {
      // incoming: login, password
      // outgoing: id, firstName, lastName, error
          
      var error = '';

      const { login, password } = req.body;
      const results = await User.find({ Login: login, Password: password });

      var id = -1;
      var fn = '';
      var ln = '';

    
      let ret;

      if( results.length > 0 )
        {
          id = results[0]._id;
          fn = results[0].FirstName;
          ln = results[0].LastName;



         try
        {
            const token = require("./createJWT.js");
            ret = token.createToken( fn, ln, id );
        }
        catch(e)
        {
          ret = {error:e.message};
        }
        }
        else
        {
            ret = {error:"Login/Password incorrect"};
        }
      
        res.status(200).json(ret);
    });

    app.post('/api/searchcards', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error

      let  error = '';
      let token = require('./createJWT.js');
      const { userId, card, jwtToken } = req.body;

      try
      {
          if( token.isExpired(jwtToken))
          {
              var r = {error:'The JWT is no longer valid', jwtToken: ''};
              res.status(200).json(r);
              return;
          }
      }
      catch(e)
      {
          console.log(e.message);
      }

      var _search = search.trim();
      //   const db = client.db();
      //   const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*', $options: 'r' } }).toArray();
      const results = await Card.find({ "Card": { $regex: _search + '.*', $options: 'r' } });
    
      
      var _ret = [];
      for( var i=0; i<results.length; i++ )
      {
          _ret.push( results[i].Card );
      }
      
      var refreshedToken = null;
      try
      {
          refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
          console.log(e.message);
      }

      var ret = { results:_ret, error: error, jwtToken: refreshedToken };
      
      res.status(200).json(ret);

    });



    app.post('/api/addrecipe', async (req, res, next) =>
    {

        //let token = require('./createJWT.js');
        const { userId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, numOfRatings, sumOfRatings} = req.body;
      //const { userId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, jwtToken } = req.body;
        /*
        try
        {
          if( token.isExpired(jwtToken))
          {
            var r = {error:'The JWT is no longer valid', jwtToken: ''};
            res.status(200).json(r);
            return;
          }
        }
        catch(e)
        {
          console.log(e.message);
        }
      */
      

        const newRecipe = new Recipe({UserId: userId, RecipeName: recipeName, Time: time, Difficulty: difficulty, 
                      Description: description, Ingredients: ingredients, Equipment: equipment, 
                      Instructions: instructions, Image: image, Rating: rating, NumOfRatings:numOfRatings, SumOfRatings:sumOfRatings});
        var error = '';
        try 
        {

            newRecipe.save();
        }
          catch (e) 
        {
            error = e.toString();
        }

      /*
          var refreshedToken = null;
          try
          {
          refreshedToken = token.refresh(jwtToken);
          }
          catch(e)
          {
          console.log(e.message);
          }
      */

      //var ret = { error: error, jwtToken: refreshedToken };
      var ret = { error: error };
      res.status(200).json(ret);

    });

    app.post('/api/saverecipe', async (req, res, next) =>
    {

        //let token = require('./createJWT.js');
        const { userId, recipeId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, numOfRatings, sumOfRatings} = req.body;
      //const { userId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, jwtToken } = req.body;
        /*
        try
        {
          if( token.isExpired(jwtToken))
          {
            var r = {error:'The JWT is no longer valid', jwtToken: ''};
            res.status(200).json(r);
            return;
          }
        }
        catch(e)
        {
          console.log(e.message);
        }
      */
      

        const newSave = new SavedRecipe({UserId: userId, RecipeId: recipeId,RecipeName: recipeName, Time: time, Difficulty: difficulty, 
                      Description: description, Ingredients: ingredients, Equipment: equipment, 
                      Instructions: instructions, Image: image, Rating: rating, NumOfRatings:numOfRatings, SumOfRatings: sumOfRatings});
        var error = '';
        try 
        {
            // const db = client.db();
            // const result = db.collection('Cards').insertOne(newCard);
            newSave.save();
        }
          catch (e) 
        {
            error = e.toString();
        }

    /*
        var refreshedToken = null;
        try
        {
        refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
        console.log(e.message);
        }
    */

      //var ret = { error: error, jwtToken: refreshedToken };
      var ret = { error: error };
      res.status(200).json(ret);

    }); 


    app.post('/api/searchrecipes', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error

      let  error = '';
	    const { userId, search} = req.body;
	  
	  
	  /*
      let token = require('./createJWT.js');
      const { userId, card, jwtToken } = req.body;

      try
      {
          if( token.isExpired(jwtToken))
          {
              var r = {error:'The JWT is no longer valid', jwtToken: ''};
              res.status(200).json(r);
              return;
          }
      }
      catch(e)
      {
          console.log(e.message);
      }
		*/
		
      var _search = search.trim();
	    var _userId = userId.trim();

      const results = await Recipe.find({ "UserId":{ $regex: _userId + '.*'},"RecipeName": { $regex: _search + '.*'} });

      /*
      var refreshedToken = null;
      try
      {
          refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
          console.log(e.message);
      }
		*/
     // var ret = { results:_ret, error: error, jwtToken: refreshedToken };
	    var ret = { results:results, error: error};
      
      res.status(200).json(ret);

    });

    app.post('/api/searchsavedrecipes', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error

      let  error = '';
	    const { userId, search} = req.body;
	  
	  
	  /*
      let token = require('./createJWT.js');
      const { userId, card, jwtToken } = req.body;

      try
      {
          if( token.isExpired(jwtToken))
          {
              var r = {error:'The JWT is no longer valid', jwtToken: ''};
              res.status(200).json(r);
              return;
          }
      }
      catch(e)
      {
          console.log(e.message);
      }
		*/
		
      var _search = search.trim();
	    var _userId = userId.trim();
      //   const db = client.db();
      //   const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*', $options: 'r' } }).toArray();
      const results = await SavedRecipe.find({ "UserId":{ $regex: _userId + '.*'},"RecipeName": { $regex: _search + '.*'} });

      /*
      var refreshedToken = null;
      try
      {
          refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
          console.log(e.message);
      }
		*/
     // var ret = { results:_ret, error: error, jwtToken: refreshedToken };
	    var ret = { results:results, error: error};
      
      res.status(200).json(ret);

    });

    app.post('/api/editrecipe', async (req, res, next) =>
    {

      //let token = require('./createJWT.js');
      const { recipeId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, numOfRatings, sumOfRatings} = req.body;
      //const { userId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, jwtToken } = req.body;
        /*
        try
        {
          if( token.isExpired(jwtToken))
          {
            var r = {error:'The JWT is no longer valid', jwtToken: ''};
            res.status(200).json(r);
            return;
          }
        }
        catch(e)
        {
          console.log(e.message);
        }
      */
      
      //var _recipeId = recipeId.trim();

        var error = '';

        try 
        {
          
          //console.log(mongoose.isValidObjectId(recipeId));
          await Recipe.updateOne({_id: recipeId},{RecipeName:recipeName,Time:time,Difficulty:difficulty,
            Description:description,Ingredients:ingredients, Equipment:equipment, Instructions:instructions, Image:image,
            Rating:rating, NumOfRatings:numOfRatings, SumOfRatings:sumOfRatings});

        }
          catch (e) 
        {
            error += "Recipe:"+e.toString()+" ";
        }

        try 
        {
          
          //console.log(mongoose.isValidObjectId(recipeId));
          await SavedRecipe.updateOne({RecipeId: recipeId},{RecipeName:recipeName,Time:time,Difficulty:difficulty,
            Description:description,Ingredients:ingredients, Equipment:equipment, Instructions:instructions, Image:image,
            Rating:rating, NumOfRatings:numOfRatings, SumOfRatings:sumOfRatings});

        }
          catch (e) 
        {
            error += "SavedRecipe:"+e.toString();
        }

        

    /*
        var refreshedToken = null;
        try
        {
        refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
        console.log(e.message);
        }
    */

      //var ret = { error: error, jwtToken: refreshedToken };
      var ret = { error: error };
      res.status(200).json(ret);

    });

   
    
    app.post('/api/deleterecipe', async (req, res, next) =>
    {

        //let token = require('./createJWT.js');
        const { recipeId } = req.body;
      //const { userId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, jwtToken } = req.body;
        /*
        try
        {
          if( token.isExpired(jwtToken))
          {
            var r = {error:'The JWT is no longer valid', jwtToken: ''};
            res.status(200).json(r);
            return;
          }
        }
        catch(e)
        {
          console.log(e.message);
        }
      */
      

        var error = '';
        try 
        {

          await Recipe.deleteOne({_id: recipeId});
        }
          catch (e) 
        {
            error = e.toString();
        }

    /*
        var refreshedToken = null;
        try
        {
        refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
        console.log(e.message);
        }
    */

      //var ret = { error: error, jwtToken: refreshedToken };
      var ret = { error: error };
      res.status(200).json(ret);

    });

    app.post('/api/removesave', async (req, res, next) =>
    {

        //let token = require('./createJWT.js');
        const { userId, recipeId } = req.body;
      //const { userId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, jwtToken } = req.body;
        /*
        try
        {
          if( token.isExpired(jwtToken))
          {
            var r = {error:'The JWT is no longer valid', jwtToken: ''};
            res.status(200).json(r);
            return;
          }
        }
        catch(e)
        {
          console.log(e.message);
        }
      */


        var error = '';
        try 
        {

          await SavedRecipe.deleteOne({UserId: userId, RecipeId: recipeId});
        }
          catch (e) 
        {
            error = e.toString();
        }

    /*
        var refreshedToken = null;
        try
        {
        refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
        console.log(e.message);
        }
    */

      //var ret = { error: error, jwtToken: refreshedToken };
      var ret = { error: error };
      res.status(200).json(ret);

    });

    app.post('/api/raterecipe', async (req, res, next) =>
    {

      //let token = require('./createJWT.js');
      const { recipeId, rating, numOfRatings, sumOfRatings, submitRating} = req.body;
	  
      let sum = sumOfRatings+submitRating;
      let num = numOfRatings+1;
      let newRating = sum/num;
      //const { userId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, jwtToken } = req.body;
        /*
        try
        {
          if( token.isExpired(jwtToken))
          {
            var r = {error:'The JWT is no longer valid', jwtToken: ''};
            res.status(200).json(r);
            return;
          }
        }
        catch(e)
        {
          console.log(e.message);
        }
      */
      

        var error = '';

        try 
        {
          
          //console.log(mongoose.isValidObjectId(recipeId));
          await Recipe.updateOne({_id: recipeId},{Rating:newRating, NumOfRatings:num, SumOfRatings:sum});

        }
          catch (e) 
        {
            error += "Recipe:"+e.toString()+" ";
        }

        try 
        {
          
          //console.log(mongoose.isValidObjectId(recipeId));
          await SavedRecipe.updateOne({RecipeId: recipeId},{Rating:newRating, NumOfRatings:num, SumOfRatings:sum});

        }
          catch (e) 
        {
            error += "SavedRecipe:"+e.toString();
        }

        

    /*
        var refreshedToken = null;
        try
        {
        refreshedToken = token.refresh(jwtToken);
        }
        catch(e)
        {
        console.log(e.message);
        }
    */

      //var ret = { error: error, jwtToken: refreshedToken };
      var ret = { error: error };
      res.status(200).json(ret);

    });

}
