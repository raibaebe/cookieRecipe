const userDao = require("../DAO/userDAO");
const UserEntity = require("../Enities/UserEntity");
const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();

    router.post('/register', async (req, res) => 
        {
            try
            {
                const {userName, email, password} = req.body;
                if (!userName || !email || !password) {
                    return res.status(400).json({ message: "All fields are required" });
                }
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = new UserEntity(userName, email, hashedPassword);
                await userDao.createUser(user);

                return res.status(201).json({ message: "User registered successfully" });
                
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal Server Error" });
    }
    });

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
            return res.status(200).json({message:"Sign in Successful", username: userData.username});
        }catch(error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });

    // router.get('/register', (req, res) =>{
    //     res.send("Hi");
    // });


module.exports = router;