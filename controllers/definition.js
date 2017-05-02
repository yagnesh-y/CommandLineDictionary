var Wordnik = require('../api/Wordnik')

module.exports = function(wordToSearch){
    Wordnik
    .definition(wordToSearch)
    .then(function(def){
        console.log(`Definition: \n${def}`)
    })
    .catch(function(err){
        console.log('Some error occurred trying to fetch definition', err)
    })

}
