const DB = require('../db')

class TrialDao{
    async findByID(id)
    {
        const result = DB.query('Select * from devtry where id = $1', [id]);
        console.log(result);
        return (await result).rows[0];
    }
}

module.exports = new TrialDao();