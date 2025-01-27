const express = require('express');
const path = require('path')
const app = express();
const userRouter = require('../back/controllers/UserController')
const cors = require("cors");

const port = 5000;

app.get("/", (request, responce) =>{
    responce.send("SalemAlem");
});

app.get("/main", (req, res) =>{
    res.sendFile(path.join(__dirname, "../front/index.html"));
});

app.get("/trial/:id", (req, res) => TrialController.getTrial(req, res));

app.use(cors());
app.use(express.json());
app.use('/auth', userRouter);

app.listen(port)