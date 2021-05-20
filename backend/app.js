const express = require('express')
const app = express()
const port = 3000

const Twitter = require('./helpers/twitter');
const twitter = new Twitter();



app.get('/tweets', (req, res) => {
  
    const QUERY = req.query.q;
    const COUNT = req.query.count;

    twitter.get(QUERY, COUNT).then(response => {
        console.log(response.data);
        res.status(200).send(response.data);
    }).catch(error => {
        console.log(error);
        res.status(400).send(err);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})