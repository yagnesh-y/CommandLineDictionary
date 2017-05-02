var Wordnik = require('../api/Wordnik')
var synonyms = require('./synonyms')
var antonyms = require('./antonyms')
var definition = require('./definition')
var prompt = require('prompt');

module.exports = function() {
    Wordnik
        .randomWord()
        .then(function(res){
            wordToSearch = res.word
            var randomCall = [
                definition,
                synonyms,
                antonyms
            ]
            //generate random number b/w 0 & 2
            var random = Math.floor(Math.random() * randomCall.length)
            console.log(`ramdo,e os ${random}`)
            randomCall[random](wordToSearch)
              return new Promise(function(resolve, reject){
                resolve('Hola')
              })
            
        }).then(function(res){
          console.log(res)
        })
        .catch(function(err){
            console.log(err)
        })
  
}