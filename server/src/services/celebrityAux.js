const celebrityAux = {};

//Dictionary of profession-keywords, it is used to build regex pattern
let dictionaryRoleToKeywords = [
    {desc: 'Sports Person', values: ['baseball','basketball','football',
        'soccer', 'golf', 'fisher','hockey', 'surf', 'volley', 'player', 
        'fighter', 'race', 'racing', 'swim' ]},
    {desc: 'Actor/actress', values: ['actor', 'actress']},
    {desc: 'Politician', values:['politician']},
    {desc: 'Author', values:['author']},
    {desc: 'Activist', values:['activist']},
    {desc: 'Musician', values: ['singer', 'musician', 'instrumentist', 'guitar', 'pianist']},
    {desc: 'Chef', values: ['chef']},
    {desc: 'Writer', values: ['writer', 'poet']},
    {desc: 'TV host', values:['host']},
    {desc: 'Journalist', values:['journalist', 'correspondent', 'anchor']},
    {desc: 'Editor', values:['Editor']},
    {desc: 'Model', values:['Model']},
    {desc: 'Lawyer', values:['lawyer', 'legal']},
    {desc: 'Artist', values:['artist']},
    {desc: 'Director', values:['director']}

];

//Find out the profession based on the result input, there are 2 ways of solving:
//1) based on the regex of each profession
//2) specific property hcard.role that wikipedia returns
//input: result of Google Custom API
celebrityAux.findOutProfession = (result) => {
    var item = result.data.items[0];
    var pro;
    if (item) {
        pro = guessProfessionAtSnippet(item.snippet);
        if(!pro){
            pro = findRoleAtResponse(item);
        }
    }
    return pro != null ? pro : 'n/a';

};

//Iterate over the dictionary to check if the regex of any profession matches
//with the description (snippet)
//input: snippet string
//output: guessed profession
var guessProfessionAtSnippet = (snippet) =>{
    for(let entry of dictionaryRoleToKeywords){
        var regex = new RegExp(entry.regexPattern, 'i');
        if (regex.test(snippet)){
            return entry.desc;
        }
    }
    return null;
}

//Checks if there is the hcard.role property inside the object 
//input: item object
//output: hcard.role or null if it doesn't exists
var findRoleAtResponse = (item) => {
    if(item.pagemap['hcard'] && item.pagemap.hcard[0].role){
        return item.pagemap.hcard[0].role;
    }
    return null;
};

//Build regex pattern, based on the list of values of the dictionary
//input: list of keywords
//output: regex pattern
var buildRegex = (list) => {
    var concatString = '';
    list.forEach(el=>{
        if (concatString){
            concatString += '|'+el;
        } else {
            concatString += el;
        }
    });
    return `.*(${concatString}).*`;
};

//Initiate regex pattern for every profession in the dictionary
var addRegex= () =>{
    dictionaryRoleToKeywords.forEach(el=>{
        el.regexPattern = buildRegex(el.values);
    });
};

addRegex();

module.exports = celebrityAux;