const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb+srv://group18:COP4331@cop4331-foodapp.btj0k.mongodb.net/?retryWrites=true&w=majority';
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(url);
client.connect(console.log("mongodb connected"));

app.post('/api/register', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error
	
  const {email, login, password, restaurant} = req.body;
  var error = '';

  const db = client.db("COP4331-LargeProject");
  const results = await db.collection('Users').find({Login:login}).toArray();

  if( results.length > 0 )
  {
    error = 'Login Taken';
  }
  else
  {
    const newUser = {Email:email, Login:login, Password:password, Restaurant:restaurant};
  
    try
    {
      //const db = client.db('COP4331-LargeProject');
      const result = db.collection('Users').insertOne(newUser);
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

  const db = client.db("COP4331-LargeProject");
  const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

  var id = -1;
  var eml = '';
  var lgn = '';
  var pass = '';
  var rest = '';

  let found = "Not Found";
  if( results.length > 0 )
  {
    //id = results[0].UserID;
    id = results[0]._id;
    eml = results[0].Email;
    lgn = results[0].Login;
    pass = results[0].Password;
    rest = results[0].Restaurant;

    //ln = results[0].LastName;
    found="";
  }

  //var ret = { id:id, firstName:fn, lastName:ln, error:''};
  var ret = { ID:id, email:eml, login:lgn, password:pass, resturant:rest, error:found};
  res.status(200).json(ret);
});


app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;

  var _search = search.trim();
  
  const db = client.db('COP4331Cards');
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});


app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(5000); // start Node + Express server on port 5000.