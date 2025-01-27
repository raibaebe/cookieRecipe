const recipeDao = require("../DAO/recepieDAO");
const RecipeEntity = require("../Enities/RecipesEntity");
const express = require('express');
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        //for while without pictures
        const { title, ingredients, instructions } = req.body;
        //error handling
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //the picture url is null
        const recipe = new RecipeEntity(title, ingredients, instructions, null);
        await recipeDao.createRecepie(recipe);                                  //calling recipe's DAO function to insert into db

        return res.status(201).json({ message: "Recepie added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/list', async (req, res) => {
    try {
        const recepies = await recipeDao.getRecepie();
        console.log(recepies);
        return res.status(200).json(recepies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
