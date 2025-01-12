const express = require('express');

const app = express();

const port = 5000;

//get
//post

//put
//patch
//delete
//

app.get("/", (request, responce) =>{
    responce.send("SalemAlem");
});

app.listen(port)