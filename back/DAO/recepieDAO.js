const DB = require("../db")

class recepieDAO
{
    async createRecepie(recepie) {
        try {
            await DB.query(
                "INSERT INTO recepie (title, ingredients, instructions, picture_url, author_id) VALUES ($1, $2, $3, $4, $5)",
                [recepie.title, recepie.ingredients, recepie.instructions, recepie.picture_url, recepie.author_id]
            );
            return { success: true, message: "Recepie created successfully" };
        } catch (error) {
            console.error("Error in createRecepie:", error.message);
            throw new Error("Failed to create recepie. Please try again later.");
        }
    }

    async getRecepie() {
        try {
            const result = await DB.query(
                "SELECT title, ingredients, instructions, picture_url FROM recepie "
            );
            if (result.rows.length === 0) {
                return null; 
            }
            return result.rows[0];
        } catch (error) {
            console.error("Error in getRecepie:", error.message);
            throw new Error("Failed to retrieve recepie. Please try again later.");
        }
    }
}

module.exports = new recepieDAO();