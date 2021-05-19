const { default: axios } = require('axios');
const { query } = require('express');
const express = require('express')
const app = express()
const port = 3000

app.get('/tweets', (req, res) => {
  const URL = 'https://api.twitter.com/1.1/search/tweets.json';
  const QUERY = req.query.q;
  const COUNT = req.query.count;

  axios.get(URL, {
      params: {
          q: QUERY,
          count: COUNT
      },
      headers: {
          "Authorization": ""
      }
  }).then(response => {
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