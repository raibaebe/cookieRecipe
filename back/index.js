const express = require('express');
const path = require('path')
const app = express();
const userRouter = require('../back/controllers/UserController')
const recepieRouter = require('../back/controllers/recepieController')
const cors = require("cors");

const port = 5000;
app.use(express.static(path.join(__dirname,"../front")));
app.get("/", (request, responce) =>{
    responce.sendFile(path.join(__dirname, "../front/index.html"));
});

app.get("/main", (req, res) =>{
    res.sendFile(path.join(__dirname, "../front/index.html"));
});

app.get("/trial/:id", (req, res) => TrialController.getTrial(req, res));

app.use(cors());
app.use(express.json());
app.use('/auth', userRouter);
app.use('/recepie', recepieRouter);

app.listen(port)