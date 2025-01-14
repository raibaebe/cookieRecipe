const express = require('express');
const path = require('path')
const app = express();
const TrialController = require('./trial/trialController.js');

const port = 5000;

app.get("/", (request, responce) =>{
    responce.send("SalemAlem");
});

app.get("/main", (req, res) =>{
    res.sendFile(path.join(__dirname, "../front/index.html"));
});

app.get("/trial/:id", (req, res) => TrialController.getTrial(req, res));

app.listen(port)