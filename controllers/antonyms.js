var Wordnik = require('../api/Wordnik')

module.exports = function(wordToSearch){
    Wordnik
        .antonym(wordToSearch)
        .then(function(antonyms){
            var allAntonyms='Antonyms: \n'
            antonyms.forEach(function(antonym){
                allAntonyms+= antonym + '\n'
            })
            console.log(allAntonyms.trim())
        })
        .catch(function(err){
            console.log(err)
        })
}
