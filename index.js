#! /usr/bin/env node
var Wordnik = require('./api/Wordnik')

if(process.argv.length == 4) {
    var type = process.argv[2]
    var wordToSearch = process.argv[3]
    console.log('dadasdasa')

}
else {
    wordToSearch = process.argv[2]
    console.log('cool', wordToSearch)
}


    if(type === 'def'){
        Wordnik
            .definition(wordToSearch)
            .then(function(def){
                console.log(def)
            })
            .catch(function(err){
                console.log('Some error occurred trying to fetch definition', err)
            })
    }
    else if (type === 'syn'){
        Wordnik
            .synonym(wordToSearch)
            .then(function(synonyms){
                var allSynonyms=''
                synonyms.forEach(function(synonym){
                    allSynonyms+= synonym + '\n'
                })
                console.log(allSynonyms.trim())
            })
            .catch(function(err){
                console.log(err)
            })
    }
    else if (type === 'ant'){
        Wordnik
            .antonym(wordToSearch)
            .then(function(antonyms){
                var allAntonyms=''
                antonyms.forEach(function(antonym){
                    allAntonyms+= antonym + '\n'
                })
                console.log(allAntonyms.trim())
            })
            .catch(function(err){
                console.log(err)
            })
    }
    else if (type === 'ex'){
        Wordnik
            .example(wordToSearch)
            .then(function(examples){
                var allExamples=''
                examples.forEach(function(example){
                    allExamples+= example.text + '\n\n'
                })
                console.log(allExamples.trim())
            })
            .catch(function(err){
                console.log(err)
            })
    }
    else if (type === 'dict' || process.argv.length == 3)  {
        Wordnik
            .completeWordDetails(wordToSearch)
            .then(function(word){
                var completeDetails=''
                completeDetails+= `Definition: ${word.text} \n`
                //check if synonyms  & antonyms exists
                if(word.relatedWords.length > 0 ){
                    word.relatedWords.forEach(function(relatedWords){
                        if(relatedWords.relationshipType === 'synonym'){
                            completeDetails+= `Synonyms : ${relatedWords.word} \n`
                        }
                        else{
                            completeDetails+= 'Synonyms: Not Found \n'
                        }
                        if(relatedWords.relationshipType === 'antonym'){
                            completeDetails+= `Antonyms : ${relatedWords.word} \n`
                        }
                        else {
                            completeDetails+= 'Antononyms: Not Found \n'
                        }
                    })
                }
                //chheck if there are exampleUses
                if(word.exampleUses.length > 0 ){
                    completeDetails+= `Examples : Not Found ${word.exampleUses}`
                }
                else {
                    completeDetails+= 'Examples: Not Found'
                }
                console.log(completeDetails.trim())
            })
            .catch(function(err){
                console.log(err)
            })
    }
    else if (type === 'play' ){
        Wordnik.game(wordToSearch)

    }
    else {
        Wordnik.wordOfTheDay()

    }