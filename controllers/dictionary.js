var Promise = require('bluebird')
var Wordnik = require('../api/Wordnik')
var definition = require('./controllers/definition')
var synonyms = require('./controllers/synonyms')
var antonyms = require('./controllers/antonyms')
var examples = require('./controllers/examples')

module.exports = function(wordToSearch){
    Promise.all([
        definition(wordToSearch), synonyms(wordToSearch), antonyms(wordToSearch), examples(wordToSearch)
    ]).then(function(){
        console.log('completed')
    })
}
