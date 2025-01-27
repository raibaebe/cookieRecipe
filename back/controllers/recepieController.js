const recepieDao = require("../DAO/recepieDAO");
const RecepieEntity = require("../Entities/RecepieEntity");
const express = require('express');
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        console.log("aliloh");
        const { title, ingredients, instructions } = req.body;
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const recepie = new RecepieEntity(title, ingredients, instructions);
        await recepieDao.createRecepie(recepie);

        return res.status(201).json({ message: "Recepie added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/list', async (req, res) => {
    try {
        const recepies = await recepieDao.getRecepie();
        return res.status(200).json(recepies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
