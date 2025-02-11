const DB = require("../db");

class recepieDAO {
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

    async getRecepie() {
        try {
            const result = await DB.query(
                "SELECT id, title, ingredients, instructions, picture_url, category FROM recipe"
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

    async getRecepieid(id) {
        try {
            const result = await DB.query(
                "SELECT id, title, ingredients, instructions, picture_url FROM recipe WHERE id=$1", [id]
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

    async updateRecepie(id, recepie) {
        try {
            await DB.query(
                "UPDATE recipe SET title=$1, ingredients=$2, instructions=$3, picture_url=$4, category=$5 WHERE id=$6",
                [recepie.title, recepie.ingredients, recepie.instructions, recepie.picture_url, recepie.category, id]
            );
            return { success: true, message: "Recepie updated successfully" };
        } catch (error) {
            console.error("Error in updateRecepie:", error.message);
            throw new Error("Failed to update recepie. Please try again later.");
        }
    }

    async deleteRecepie(id) {
        try {
            await DB.query(
                "DELETE FROM recipe WHERE id=$1",
                [id]
            );
            return { success: true, message: "Recepie deleted successfully" };
        } catch (error) {
            console.error("Error in deleteRecepie:", error.message);
            throw new Error("Failed to delete recepie. Please try again later.");
        }
    }
}

module.exports = new recepieDAO();