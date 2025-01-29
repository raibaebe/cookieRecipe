const userDao = require("../DAO/userDAO");
const UserEntity = require("../Enities/UserEntity");
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../controllers/AuthorizationMiddlware');

// This is a code for controlling users

//here is registring
    router.post('/register', async (req, res) => 
        {
            try
            {
                const {username, email, password} = req.body;
                if (!username || !email || !password) {
                    return res.status(400).json({ message: "All fields are required" });
                }
                const hashedPassword = await bcrypt.hash(password, 10);          //crypting user's password  
                const user = new UserEntity(username, email, hashedPassword);        
                await userDao.createUser(user);                                     //calling database function to save into

                return res.status(201).json({ message: "User registered successfully" });
                
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal Server Error" });
    }
    });

    //loging in users
    router.post('/login', async (req, res) => {
        try{
            const{email, password} = req.body;
            if(!email || !password)
            {
                return res.status(400).json({message: "All fields are required"});
            }
            const userData = await userDao.getUser(email);
            if (!userData || !(await bcrypt.compare(password, userData.password))) {
                return res.status(400).json({ message: "Invalid email or password" });
            }

            //creating json web token to check for if user is authed in the other codes.
            const token = jwt.sign(
                {
                    userId: userData.user_id,
                    username: userData.username,
                    email: userData.email
                }, 
                'secret-key',
                {expiresIn:'1h'}
            )
            return res.status(200).json({message:"Sign in Successful", username: userData.username, token:token});
        }catch(error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });

    //function to check if user is logged in and the token is not expired
    router.get('/account', verifyToken, (req, res) => 
    {
        res.status(200).json({ 
            message: 'Protected route accessed', 
            username: req.username, 
            email: req.email 
        });
    });

    // router.get('/register', (req, res) =>{
    //     res.send("Hi");
    // });


module.exports = router;