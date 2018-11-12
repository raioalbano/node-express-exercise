const celebrityService = {};
//Custom Search Engine ID: just bring one result from en.wikipedia.org
const cs = '010913423786667336909:emlo2tlwes0';
//Google API Key
const key = 'AIzaSyDVcYUbHLCiq737pLQZ5OhVxMx5lTtGtIg';
//import google custom search library
const {google} = require('googleapis');
const customsearch = google.customsearch('v1');
//import celebrityAux with the auxiliary methods
const celebrityAux= require('./celebrityAux');

celebrityService.listCelebritiesProfessions = '';

//Recursive method, synchronize call for Google Custom Search API.
//Receives a list of names, and the next name is the callback of the previous
//And the callback function is the last callback
//input: celebrities names
//output: updated listCelebritiesProfessions with all celebrities and their professions
celebrityService.findProfession = (celebrityNames, callback) =>{
    var celebrityName = celebrityNames.shift();
    customsearch.cse.list({
        cx: cs,
        q: celebrityName,
        num:1,
        auth: key,
    }).then(r =>{
        var profession = celebrityAux.findOutProfession(r);
        var celPro = `Celebrity: ${celebrityName} Profession: ${profession}`;
        console.log(celPro);
        celebrityService.listCelebritiesProfessions += `<br>${celPro}`;
        if (celebrityNames.length == 0) {
            callback(profession);
        } else {
            celebrityService.findProfession(celebrityNames, callback);
        }
    });

};


module.exports = celebrityService;