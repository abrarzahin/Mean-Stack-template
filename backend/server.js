const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'messageBoard';
let db;

app.use(bodyParser.text());
app.use(cors());

app.post('/api/message',(req,res)=>{
    console.log(req.body);
    db.collection('messages').insertOne({'msg': req.body});
    res.status(200).send();
})

async function GetMessages(){
         const docs =await db.collection('messages').find({}).toArray();
          console.log(docs);
 
}

MongoClient.connect(url, function (err, client) {

  if(err) return console.log('mongodb error', err);

  console.log("Connected successfully to server");

   db = client.db(dbName);

   GetMessages()
 
});

app.listen(port,()=>console.log('App running on port',port));