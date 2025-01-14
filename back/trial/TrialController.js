const trialService = require('./trialService')

class TrialController{
    async getTrial(req, res)
    {
        const {id} = req.params;
        const trial = trialService.getTrialByID(id);
        if(!trial)
        {
            return res.status(404);
        }
        console.log("res" + trial);
        return res.json(trial);
    }
}

module.exports = new TrialController();