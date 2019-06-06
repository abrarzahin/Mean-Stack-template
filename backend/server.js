const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(bodyParser.text());
app.use(cors());

app.post('/api/message',(req,res)=>{
    console.log(req.body);
    res.status(200).send();
})

app.listen(port,()=>console.log('App running on port',port));