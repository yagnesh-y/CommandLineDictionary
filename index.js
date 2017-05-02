#! /usr/bin/env node
var Wordnik = require('./api/Wordnik')
var definition = require('./controllers/definition')
var synonyms = require('./controllers/synonyms')
var antonyms = require('./controllers/antonyms')
var examples = require('./controllers/examples')
var wordOfTheDay = require('./controllers/wordOfTheDay')
var game = require('./controllers/game')

var wordToSearch

process.argv.length == 4 ? wordToSearch = process.argv[3] : wordToSearch = process.argv[2]
var type = process.argv[2]

switch(type){
    case 'def':
        definition(wordToSearch)
        break
    case 'syn':
        synonyms(wordToSearch)
        break
    case 'ant':
        antonyms(wordToSearch)
        break
    case 'ex':
        examples(wordToSearch)
        break
    case 'dict' || process.argv.length == 3:
        definition(wordToSearch)
        synonyms(wordToSearch)
        antonyms(wordToSearch)
        examples(wordToSearch)
        break
    case 'play':
        game()
        break
    default:
        wordOfTheDay(wordToSearch)
        break
        
}