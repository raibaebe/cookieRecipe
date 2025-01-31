const DB = require("../db")

//class for making CRUD operation for Users

class UserDAO
{
    //function to INSER INTO
    async createUser(user) {
        try {
            //query
            await DB.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
                [user.username, user.email, user.password]
            );
            return { success: true, message: "User created successfully" };
        } catch (error) {
            console.error("Error in createUser:", error.message);
            throw new Error("Failed to create user. Please try again later.");
        }
    }

    //FUNCTION TO SELECT FROM USRES
    async getUser(email) {
        try {
            //query
            const result = await DB.query(
                "SELECT id, username, email, password FROM users WHERE email = $1",
                [email]
            );
            if (result.rows.length === 0) {
                return null; 
            }
            return result.rows[0];
        } catch (error) {
            console.error("Error in getUser:", error.message);
            throw new Error("Failed to retrieve user. Please try again later.");
        }
    }
}

module.exports = new UserDAO();