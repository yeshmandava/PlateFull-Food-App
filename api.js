require('express');
require('mongodb');
require('dotenv').config();
const axios = require('axios');

const API_ID = process.env.EDAMAM_API_ID;
const API_KEY = process.env.EDAMAM_API_KEY;

exports.setApp = function(app,client)
{
    //load user model
    const User = require("./models/user.js");
    //load card model
    const Card = require("./models/card.js");
  
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

    app.post('/api/recipes', async (req,res) => {
      try{
        const {query} = req.body;
        const url = `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`;
        //const API_ID = process.env.EDAMAM_API_ID;
        //const API_KEY = process.env.EDAMAM_API_KEY;
      
        const response = await axios.get(url);
        const data = response.data;
        res.json(data.hits);
        //const recipes = response.data.hits.map(hit => hit.recipe);
        //res.json(recipes);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    })

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

}
