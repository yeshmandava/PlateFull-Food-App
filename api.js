require('express');
require('mongodb');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
require("dotenv").config();
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

    app.post('/api/register', async (req, res, next) => {
      const { firstName, lastName, email, login, password } = req.body;
      let error = '';
    
      const results = await User.find({ Login: login });
      if (results.length > 0) {
        error = 'Login Taken';
      } else {
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const verificationToken = uuid.v4(); // generate a unique verification token
    
          const newUser = new User({
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Login: login,
            Password: hashedPassword,
            verificationToken: verificationToken, // store the verification token in the database
          });
    
          await newUser.save();
    
          // send email with verification link to the user
          const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            auth: {
              user: 'PlateFull111@outlook.com',
              pass: 'Wsad@12345',
            },
            tls: {
              ciphers: 'SSLv3',
            },
          });
    
          const verificationLink = `http://localhost:5000/verify?token=${verificationToken}`;
          const mailOptions = {
            from: 'PlateFull111@outlook.com',
            to: email,
            subject: 'PlateFull: Verify your account',
            html: `Thanks you for creating an account with PlateFull! Click <a href="${verificationLink}">here</a> to verify your account.`,
          };
    
          await transporter.sendMail(mailOptions);

          return res.status(200).json({ message: 'Registration successful. Please check your email to verify your account.' });
        } catch (error) {
          console.error(error);
          error = error.toString();
        }
      }
      const ret = { error: error };
      res.status(200).json(ret);
    });

app.get('/verify', async (req, res) => {
  const { token } = req.query;
  try {
    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }
    // Verify user and save to database
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    // Send response indicating successful verification
    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}); 

    
    app.post('/api/login', async (req, res, next) => {

      const { login, password } = req.body;
      let error = '';
      let token = null;
      let user = null;
    
      try {
        const foundUser = await User.findOne({ Login: login });
        if (!foundUser) {
          error = 'User not found';
        }else if (!foundUser.isVerified) {
            error = 'User not verified';
        } else {
          const isMatch = await bcrypt.compare(password, foundUser.Password);
          if (!isMatch) {
            error = 'Incorrect password';
          } else {
            // generate JWT token
            token = jwt.sign({ userId: foundUser._id }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: '1h'
            });
            // extract user info
            user = {
              id: foundUser._id,
              firstName: foundUser.FirstName,
              lastName: foundUser.LastName
            };
          }
        }
      } catch (e) {
        error = e.toString();
      }
    
      if (error) {
        return res.status(401).json({ error });
      }
    
      res.json({ jwtToken:token, user });
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

      let token = require('./createJWT.js');
      const { userId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, numOfRatings, sumOfRatings, jwtToken } = req.body;
      
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
    

      
      var error = '';
      try 
      {
        const newRecipe = new Recipe({UserId: userId, RecipeName: recipeName, Time: time, Difficulty: difficulty, 
          Description: description, Ingredients: ingredients, Equipment: equipment, 
          Instructions: instructions, Image: image, Rating: rating, NumOfRatings:numOfRatings, SumOfRatings:sumOfRatings});

        newRecipe.save();
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
      //var ret = { error: error };
      res.status(200).json(ret);

    });

    app.post('/api/saverecipe', async (req, res, next) =>
    {

      let token = require('./createJWT.js');
      const { userId, recipeId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, numOfRatings, sumOfRatings, jwtToken} = req.body;
      
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
    

      
      var error = '';
      try 
      {
        const newSave = new SavedRecipe({UserId: userId, RecipeId: recipeId,RecipeName: recipeName, Time: time, Difficulty: difficulty, 
          Description: description, Ingredients: ingredients, Equipment: equipment, 
          Instructions: instructions, Image: image, Rating: rating, NumOfRatings:numOfRatings, SumOfRatings: sumOfRatings});
        newSave.save();
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
      //var ret = { error: error };
      res.status(200).json(ret);

    }); 


    app.post('/api/searchrecipes', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error

      let  error = '';
	  
	  
	  
      let token = require('./createJWT.js');
      const { userId, search, jwtToken} = req.body;

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
	    var _userId = userId.trim();

      const results = await Recipe.find({ "UserId":{ $regex: _userId + '.*'},"RecipeName": { $regex: _search + '.*'} });

      
      var refreshedToken = null;
      try
      {
          refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
          console.log(e.message);
      }
		
      var ret = { results:results, error: error, jwtToken: refreshedToken };

      //comment out
	    //var ret = { results:results, error: error};
      
      res.status(200).json(ret);

    });

    app.post('/api/searchsavedrecipes', async (req, res, next) => 
    {
      // incoming: userId, search
      // outgoing: results[], error

      let  error = '';
	  
	  
	  
      let token = require('./createJWT.js');
      const { userId, search, jwtToken } = req.body;

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
	    var _userId = userId.trim();
      //   const db = client.db();
      //   const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*', $options: 'r' } }).toArray();
      const results = await SavedRecipe.find({ "UserId":{ $regex: _userId + '.*'},"RecipeName": { $regex: _search + '.*'} });

      
      var refreshedToken = null;
      try
      {
          refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
          console.log(e.message);
      }
		
      var ret = { results:results, error: error, jwtToken: refreshedToken };
	    //var ret = { results:results, error: error};
      
      res.status(200).json(ret);

    });

    app.post('/api/editrecipe', async (req, res, next) =>
    {

      let token = require('./createJWT.js');
      const { recipeId, recipeName, time, difficulty, description, ingredients, equipment, instructions, image, rating, numOfRatings, sumOfRatings, jwtToken} = req.body;
     
        
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
      //var ret = { error: error };
      res.status(200).json(ret);

    });

   
    
    app.post('/api/deleterecipe', async (req, res, next) =>
    {

      let token = require('./createJWT.js');
      const { recipeId, jwtToken } = req.body;
    
      
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
      
      

      var error = '';
      try 
      {

        await Recipe.deleteOne({_id: recipeId});
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
      //var ret = { error: error };
      res.status(200).json(ret);

    });

    app.post('/api/removesave', async (req, res, next) =>
    {

      let token = require('./createJWT.js');
      const { userId, recipeId, jwtToken } = req.body;
      
      
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
    


      var error = '';
      try 
      {

        await SavedRecipe.deleteOne({UserId: userId, RecipeId: recipeId});
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
      //var ret = { error: error };
      res.status(200).json(ret);

    });

    app.post('/api/raterecipe', async (req, res, next) =>
    {

      let token = require('./createJWT.js');
      const { recipeId, rating, numOfRatings, sumOfRatings, submitRating, jwtToken} = req.body;
	  
      let sum = sumOfRatings+submitRating;
      let num = numOfRatings+1;
      let newRating = sum/num;
      
        
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
      //var ret = { error: error };
      res.status(200).json(ret);

    });

}
