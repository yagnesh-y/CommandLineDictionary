var Promise = require('bluebird')
var superagent = require('superagent')

module.exports = {
    get: function(params) {
        return new Promise(function(resolve, reject){
            Bookmark.find(params, function(err, bookmarks){
                if(err){
                    reject(err)
                    return
                }
                var list =[]
                bookmarks.forEach(function(bookmark, i){
                    list.push(bookmark.summary())
                })

                resolve(list)
            })
        })
    },
    getById: function(id){
         return new Promise(function(resolve, reject){
            Bookmark.findById(id, function(err, bookmark){
                if(err){
                    reject(new Error('Bookmark not found'))
                    return
                }
                if(bookmark == null){
                    reject(new Error('Bookmark not found'))
                }
                resolve(bookmark.summary())
            })
        })
    },

    definition: function(word){
        var API='http://api.wordnik.com:80/v4/word.json/'+word+'/definitions?limit=1&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
        return new Promise(function(resolve, reject){
            superagent
            .get(API)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject(err);
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
                    reject(err);
                    return
                }
                if( response.body.length === 0 ){
                    reject(`No synonyms found for the word ${word}.`)
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
                    reject(err);
                    return
                }
                if( response.body.length === 0 ){
                    reject(`No antonyms found for the word ${word}.`)
                    return
                }
                resolve(response.body[0].words)
            })
        })
    },

    example: function(word){
        var API='http://api.wordnik.com:80/v4/word.json/'+word+'/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
        return new Promise(function(resolve, reject){
            superagent
            .get(API)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject(err.message);
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

    completeWordDetails: function(word){
        var API='http://api.wordnik.com:80/v4/word.json/'+word+'/definitions?limit=1&includeRelated=true&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
        return new Promise(function(resolve, reject){
            superagent
            .get(API)
            .query(null)
            .end(function(err, response){
                if(err){
                    reject(err.message);
                    return
                }
                if(response.body.length == 0){
                    reject(`No details found for the word ${word}.`)
                    return
                }
                resolve(response.body[0])
            })
        })
    },
}