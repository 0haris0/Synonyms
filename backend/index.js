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

const isExisting = (Synonym) => {
    Array.from(data).map((value) => {
        if (value.word.toUpperCase === Synonym.toUpperCase) {
            return true;
        } else {
            return value;
        }
    });
}

const Synonym = {
    ID : null,
    word : null,
    key : null,
    synonyms : [],
    get ID(){
        return Array.from(data).length;
    },
    set word(word) {
        this.word = word;
    },
    set key(key) {
        this.key = key
    },
    set synonyms(synonyms) {
        this.synonyms.push(synonyms);
    }
};

function fillSynonym(DataArray, FirstWord, SecondWord) {
    let synonym = {
        "ID": null,
        "word": null,
        "key": null,
        "synonyms": []
    };
    let invertedSynonym = {
        "ID": null,
        "word": null,
        "key": null,
        "synonyms": []
    }
    let bothSynonyms = [];

    synonym["ID"] = DataArray.lastIndexOf(DataArray);
    synonym["word"] = FirstWord;
    synonym["key"] = 1;
    synonym["synonyms"].push(SecondWord);

    invertedSynonym["ID"] = DataArray.lastIndexOf(DataArray);
    invertedSynonym["word"] = SecondWord;
    invertedSynonym["key"] = 1;
    invertedSynonym["synonyms"].push(FirstWord);


    bothSynonyms.push(synonym)
    bothSynonyms.push(invertedSynonym);
    return (Object.values(bothSynonyms));
}

app.get('/', (req, res, next) => {
    next();
})
app.get('/word/', (req, res, next) => {
    res.sendStatus(404);
    next();
});

app.get('/word/:search', (req, res, next) => {
    let result = [];
    data.map((value) => {
        if (value.word.toUpperCase().includes(req.params.search.toUpperCase())) {
            result.push(value);
        }
    });
    if (result.length > 0) {
        res.send(result);
    } else {
        res.send(result);
    }
    next();
});

app.post('/word/add/', (req, res,) => {
    /*console.log('Parametri: ', JSON.parse(req.body));
    let firstWord = req.params.firstWord;♠
    let secondWord = req.params.secondWord;
    if (firstWord === undefined || secondWord === undefined) {
        res.status(400).send({error: "Please enter both words"});
    } else {
        let alreadyHave = isExisting(firstWord);
        let alreadyHaveSecond = isExisting(secondWord);
        if (alreadyHave && alreadyHaveSecond) {
            res.status(400).send({error: "There is already both words in database!"});
        }

    let synonym = {
        "ID": null,
        "word": null,
        "key": null,
        synonyms: []
    };
    let firstWord = "Clean";
    let secondWord = "Wash";

    let DataArray ;
    DataArray= Array.from(JSON.stringify(data) + JSON.stringify(fillSynonym(DataArray,firstWord,secondWord)));
    //DataArray.push(fillSynonym(DataArray,firstWord,secondWord));
    console.log(Array.from(DataArray), 'data Array');

    let FilteredDataArray = Array.from(DataArray).filter((value) => (value.word === firstWord) || (value.word === secondWord));
    // If not in database
    if (FilteredDataArray.length === 0) {

        let newData = fillSynonym(DataArray,firstWord,secondWord);
        fs.appendFile('./data/data.json', newData, (err, ) => {

            if (err) throw  err;
            console.log('DONE');
        })
    } else if (FilteredDataArray.length > 0) {

        console.log('test');
        res.send('test', 405);
    }
    /* let ovaj = fs.readFile('./data/data.json', synonym.toString(), ( err => {
         if (err)
             console.log(err);
         res.send(test);

     }));
}
/*
        // If there is already that word in database
        test.map((value, key) => {
            if (value.word === firstWord || secondWord) { //Check is these word in database already
                if (value.synonyms.includes(firstWord || secondWord))
                    res.send({error: 'There is already that synonym'});
                else {
                    res.send('test')
                }
            }
        });
*/

    let firstWord = new Synonym("Wash", 3, "Clean");
    let secondWord = new Synonym("Clean", 4, "Wash");
    this.data = {
        ...data,
        firstWord,
        secondWord
    }
    const result = Object.assign({}, {data}, {firstWord}, {secondWord})
    console.log(this.data);
    //console.log(JSON.stringify(firstWord) + ',' + JSON.stringify(secondWord));
    //console.log(JSON.stringify(data).substr(1, JSON.stringify(data).length - 2));

});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})