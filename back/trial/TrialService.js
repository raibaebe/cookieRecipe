const trialDao = require('./trialDAO');
const trialEntity = require('./trialEntity');

class TrialService{
    async getTrialByID(id)
    {
        const trialData = await trialDao.findByID(id);
        if(!trialData)
        {
            return null;
        }
        console.log(trialData);
        return new trialEntity(trialData.id, trialData.name);
    }
}

module.exports = new TrialService();