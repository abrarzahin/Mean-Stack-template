const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');


const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/messageBoard';

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', ()=>
  console.log('connected to mongodb'));

  const Message = mongoose.model('Message', {
    userName: String,
    msg: String
  });

  const User = mongoose.model('User', {name: String});


app.use(bodyParser.json());
app.use(cors());

app.post('/api/message',async (req,res)=>{
 

    const message= new Message(req.body);

    message.save();

    const foundUser= await User.findOne({name: message.userName});
    console.log(foundUser);
    if(!foundUser) ( new User({name: message.userName})).save();

  res.status(200).send();
})

app.get('/api/message', async (req, res) => {
  const docs = await Message.find();

  if(!docs) return res.json({error: "error getting messages"});

  res.json(docs);
})

mongoose.connect(url);



//MongoClient.connect(url, function (err, client) {
//
//  if(err) return console.log('mongodb error', err);
//
//  console.log("Connected successfully to server");
//
//   db = client.db(dbName);
// 
//});

app.listen(port,()=>console.log('App running on port',port));