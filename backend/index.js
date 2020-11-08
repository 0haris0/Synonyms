const express = require('express')
const app = express()

const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs')

const port = 3001
const data2 = require('./data/synonyms.json');
const data = require('./data/data.json');

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

//Function is Existing synonym in DB
const isExisting = (Synonym, secondSynonym) => {
    let isExisting = false;
    if (Array.from(data).length > 1) { //If have data
        Array.from(data).map((value) => { // Go through that data
            //If FirstWord and SecondWord defined as `word` or in array `synonyms`
            if ((value.word.toUpperCase() === Synonym.toUpperCase() || value.word.toUpperCase() === secondSynonym.toUpperCase()) && (value.synonyms.includes(Synonym) || (value.synonyms.includes(secondSynonym)))) {
                isExisting = true;
            } else {
                isExisting = false;
            }
        });
    }
    return isExisting;
}

//Create object Synonym
const Synonym = (id, word, key, synonyms) => {
    this.id = id;
    this.word = word;
    this.key = key;
    this.synonyms = Array.of(synonyms);
    let obj = {};
    obj.ID = this.id;
    obj.word = this.word;
    obj.key = this.key;
    obj.synonyms = this.synonyms;
    return obj;
};

//Just skip home endpoint
app.get('/', (req, res, next) => {
    next();
});

//For getting /word/ endpoint, return 404
app.get('/word/', (req, res, next) => {
    res.sendStatus(404);
    next();
});

//Return array of synonyms connected with it
app.get('/word/:search', (req, res, next) => {
    let result = [];
    data.map((value) => { //Go through every item in DB
        if (value.word.toUpperCase().includes(req.params.search.toUpperCase())) { //If `word` from DB include parameter from search
            result.push(value); //Push result into array
        }
    });
    if (result.length < 1) { // If result is empty (Not found search query)
        res.status(404).send({error: "Result not found"});
    } else {
        res.status(200).send(result);
    }
    next();
});

app.post('/word/add/', (req, res, next) => {

    // Initial data

    // Fetch ID (last from DB)
    let id = Array.from(data).length;

    // Post data (firstWord, secondWord)
    let firstWordInput = req.body.firstWord;
    let secondWordInput = req.body.secondWord;

    if (firstWordInput === null && secondWordInput === null) {
        res.status(400).send({"error": 'Please enter words!'});
    }

    //Create object from POSTed data
    let firstWord = Synonym(id, firstWordInput, 4, secondWordInput);
    let secondWord = Synonym(id + 1, secondWordInput, 4, firstWordInput);
    let result;
    let FilteredDataArray = [];

    //Check is in Database - is duplicated?
    let isInDatabase = isExisting(firstWord.word, secondWord.word)
    if (isInDatabase) {
        res.status(400).send({error: "There is already both words in database!"});
    }

    //If only one in database and is anything in database
    if (Array.from(data).length > 1) {
        FilteredDataArray = Array.from(data).filter((value, key) => {
                if ((value.word === firstWord.word) || (value.word === secondWord.word)) {
                    return (value);
                }
            }
        );
    }

    // If there isn't that synonyms in database
    if (FilteredDataArray.length === 0) {
        result = [
            ...data,
            firstWord,
            secondWord
        ];

    } else if (FilteredDataArray.length === 1) { // If there is already one synonym in database
        let newData = Object.values(data).filter(((value, index) => {
            // if object of filtered data is same as data from `DB`
            if (value === FilteredDataArray[0]) {
                // If data row doesn't have synonym into "Connecting array"
                if (!value.synonyms.includes(FilteredDataArray[0].word)) {
                    // Return that data row with pushed synonim into "Connecting array"
                    return (value.synonyms.push(secondWordInput));
                } else {
                    return (value);
                }
            } else {
                return (value);
            }
        }));

        result = [
            ...newData
        ]

    } else {
        let items = [];
        //Check from Filtered data which is already in database, and add it to their synonym
        if (FilteredDataArray.map((value, key) => {
            if (value.word.toUpperCase() === firstWord.word.toUpperCase()) { // Check is items from Array same as our "First" word
                value.synonyms.push(secondWord.word); // If it is, then push
            } else {
                value.synonyms.push(firstWord.word); // If not then, it's second word.
            }
            items.push(value);
        }))
            result = [
                ...data,
                ...items
            ]
    }

    //Write to file whole object
    fs.writeFile('.././data/data.json', JSON.stringify(result), (err,) => {

        if (!err) {
            res.status(201).send({message: 'Synonyms added successfully!'});
        } else {
            throw err;
        }


    });

});


app.listen(port, () => {

})

module.exports = app;