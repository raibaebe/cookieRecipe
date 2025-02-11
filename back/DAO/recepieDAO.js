const DB = require("../db")

// const recipesTable = "recipe"

// class for making CRUD and all other database operations with recipe table

class recepieDAO
{
    //function to create (INSERT INTO) a recipe
    async createRecepie(recepie) {
        try {
            await DB.query(
                "INSERT INTO recipe (title, ingredients, instructions, picture_url, author_id, category) VALUES ($1, $2, $3, $4, $5, $6)",
                [recepie.title, recepie.ingredients, recepie.instructions, recepie.picture_url, recepie.author_id, recepie.category]
            );
            return { success: true, message: "Recepie created successfully" };
        } catch (error) {
            console.error("Error in createRecepie:", error.message);
            throw new Error("Failed to create recepie. Please try again later.");
        }
    }

    //function to get all    recipes
    async getRecepie() {
        try {
            const result = await DB.query(
                "SELECT title, ingredients, instructions, picture_url, category FROM recipe "
            );
            if (result.rows.length === 0) {
                return null; 
            }
            return result.rows;
        } catch (error) {
            console.error("Error in getRecepie:", error.message);
            throw new Error("Failed to retrieve recepie. Please try again later.");
        }
    }
    async getRecepieid(id){
        try{
            const result = await DB.query(
                "SELECT title, ingredients, instructions, picture_url FROM recipe WHERE author_id=$1",[id]
            );
            if (result.rows.length === 0) {
                return null; 
            }
            return result.rows;
        } catch (error) {
            console.error("Error in getRecepie:", error.message);
            throw new Error("Failed to retrieve recepie. Please try again later.");
        }
        
    }
}

module.exports = new recepieDAO();