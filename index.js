const express = require('express');
const {router} = require('./task/task.js');
const bodyParser = require('body-parser');
const cors = require('cors');
//const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);

app.listen(3000,(err)=>{
        if(err)
                console.log('Server Error');
        else
                console.log("Server Listening on port 3000")
});
