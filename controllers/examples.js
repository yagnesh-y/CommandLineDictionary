var Wordnik = require('../api/Wordnik')

module.exports = function(wordToSearch) {
    Wordnik
        .example(wordToSearch)
        .then(function(examples){
            var allExamples='Examples: \n'
            examples.forEach(function(example){
                allExamples+= example.text + '\n'
            })
            console.log(allExamples.trim())
        })
        .catch(function(err){
            console.log(err)
        })
} 