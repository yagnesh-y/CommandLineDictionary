var Wordnik = require('../api/Wordnik')

module.exports = function(wordToSearch){
    Wordnik
        .synonym(wordToSearch)
        .then(function(synonyms){
            var allSynonyms='Synonyms: \n'
            synonyms.forEach(function(synonym){
            allSynonyms+= synonym + '\n'
            })
            console.log(allSynonyms.trim())
        })
        .catch(function(err){
            console.log(err)
        })
}
