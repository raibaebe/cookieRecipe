const recipeDao = require("../DAO/recepieDAO");
const RecipeEntity = require("../Enities/RecipesEntity");
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../front/images/user_images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

router.post('/add', async (req, res) => {
    try {
        //for while without pictures

        const { title, ingredients, instructions, author_id, category, imagePath} = req.body;

        //error handling
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "All fields are required" });
        }
        //the picture url is null

        const recipe = new RecipeEntity(title, ingredients, instructions, imagePath, author_id, category);

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
        return res.status(200).json(recepies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get('/list/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const recipe = await recipeDao.getRecepieid(id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        return res.status(200).json(recipe);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const { title, ingredients, instructions, picture_url, category } = req.body;
    try {
        const recipe = new RecipeEntity(title, ingredients, instructions, picture_url, null, category);
        const result = await recipeDao.updateRecepie(id, recipe);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await recipeDao.deleteRecepie(id);
        return res.status(200).json(result);
    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


const upload = multer({ storage });

router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("loh");
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ path: `../front/images/user_images/${req.file.filename}` }); 
});

module.exports = router;

