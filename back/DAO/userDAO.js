const DB = require("../db")

class UserDAO
{
    async createUser(user) {
        try {
            await DB.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
                [user.userName, user.email, user.password]
            );
            return { success: true, message: "User created successfully" };
        } catch (error) {
            console.error("Error in createUser:", error.message);
            throw new Error("Failed to create user. Please try again later.");
        }
    }

    async getUser(email) {
        try {
            const result = await DB.query(
                "SELECT username, email, password FROM users WHERE email = $1",
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