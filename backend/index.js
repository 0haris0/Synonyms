const express = require('express')
const app = express()
var cors = require('cors')
const port = 3001
const data2 = require('./data/synonyms.json');
const data = require('./data/data2.json');

app.use(cors());

app.get('/', (req, res, next) => {
    next();
})
app.get('/word/', (req, res, next) => {
    res.sendStatus(404);
    next(); 
});

app.get('/word/:search', (req, res, next) => {
    let result = [];
    data.map((value)=>{
        if(value.word.toUpperCase().includes(req.params.search.toUpperCase())){
            result.push(value);
        }
    });
    if(result.length > 0){
        res.send(result);
    }else{
        res.send(result);
    }   
    next();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})