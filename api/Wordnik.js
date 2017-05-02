var Promise = require('bluebird')
var superagent = require('superagent')

module.exports = {
   
    definition: function(word){
        var API='http://api.wordnik.com:80/v4/word.json/'+word+'/definitions?limit=1&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
        return new Promise(function(resolve, reject){
            superagent
            .get(API)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject('Server Problem: Unable to fetch definition for the word');
                    return
                }
                resolve(response.body[0].text)            
            })
        })
    },

    synonym: function(word){
        var API='http://api.wordnik.com:80/v4/word.json/'+word+'/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
        return new Promise(function(resolve, reject){
            superagent
            .get(API)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject('Server Problem: Unable to fetch synonym for the word');
                    return
                }
                if( response.body.length === 0 ){
                    reject('No synonyms found for the word ')
                    return
                }
                resolve(response.body[0].words)            
            })
        })
    },

    antonym: function(word){
        var API='http://api.wordnik.com:80/v4/word.json/'+word+'/relatedWords?useCanonical=false&relationshipTypes=antonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
        return new Promise(function(resolve, reject){
            superagent
            .get(API)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject('Server Problem: Unable to fetch antonyms for the word');
                    return
                }
                if( response.body.length === 0 ){
                    reject('No antonyms found for the word')
                    return
                }
                resolve(response.body[0].words)
            })
        })
    },

    example: function(word){
        var API='http://api.wordnik.com:80/v4/word.json/'+word+'/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=3&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
        return new Promise(function(resolve, reject){
            superagent
            .get(API)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject(`Server Problem: Unable to fetch examples for the word ${word}`);
                    return
                }
                if(response.body.examples.length == 0){
                    reject(`No examples found for the word ${word}.`)
                    return
                }
                resolve(response.body.examples)
            })
        })
    },

    wordOfTheDay: function(){
        var API='http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
        return new Promise(function(resolve, reject){
            superagent
            .get(API)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject('Server Problem: Unable to fetch wordOfTheDay');
                    return
                }
                if(!response.body){
                    reject(`No details found for the word ${word}.`)
                    return
                }
                resolve(response.body)
            })
        })
    },

    randomWord: function(){
        var API='http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
        return new Promise(function(resolve, reject){
            superagent
            .get(API)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject('Server Problem: Unable to fetch random word');
                    return
                }
                if(!response.body){
                    reject(`No random words found!`)
                    return
                }
                resolve(response.body)
            })
        })
    }
}