const express = require('express')
const app = express()
const port = 3001

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test123@synonyms.iawta.mongodb.net/synonyms_list?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true }, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1 });

async function searchSynonyms(wordString) {
    try {
        await client.connect();

        const database = client.db('synonyms_list');
        const collection = database.collection('Synonyms');
        let query = { word: wordString };
        let result = await collection.find(query).toArray();
        return result;
    } catch (e) {
        console.error(e);
    }
}
// perform actions on the collection object

app.get('/', (req, res, next) => {
    next();
})

app.get('/word/:search', (req, res) => {
    searchSynonyms(req.params.search).then(function (resolve, reject) {
        res.send(resolve);
    });
});

client.close();
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})