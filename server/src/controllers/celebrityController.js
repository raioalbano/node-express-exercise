const CelebrityService = require('../services/celebrityService');
const celebritiesJson = require('./celebritiesJson');
const CelebrityController = {};

//List celebrities and their professions
//input: celebrities names at celebritiesJson.js
//output: list of celebrities and their professions at console and browser
CelebrityController.findProfessions = (req, res) =>{
    CelebrityService.listCelebritiesProfessions = '';
    function callback() {
        res.send(CelebrityService.listCelebritiesProfessions);
        console.log('END')
    }
    CelebrityService.findProfession(celebritiesJson.celebrityList, callback);
};

module.exports = CelebrityController;