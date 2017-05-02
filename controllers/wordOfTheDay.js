var Wordnik = require('../api/Wordnik')
var synonyms = require('./synonyms')
var antonyms = require('./antonyms')
var examples = require('./examples')

module.exports = function(wordToSearch){
    Wordnik
        .wordOfTheDay(wordToSearch)
        .then(function(word){
            wordToSearch = word.word
                console.log(`word of the day : ${wordToSearch} \n`)
                console.log(`Definition: \n ${word.definitions[0].text} \n`)

                //check if there are exampleUses
                if(word.examples.length > 0 ){
                    console.log('Examples: \n')
                    word.examples.forEach(function(example){
                        console.log(`${example.text.trim()} \n`)
                    })
                }
                else {
                    examples(wordToSearch)
                }

                //return synonms and atnomys for the wordOfTheDay
            synonyms(wordToSearch)
            antonyms(wordToSearch)
        })
        .catch(function(err){
            console.log(err)
        })
}
