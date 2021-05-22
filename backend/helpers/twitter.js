const { default: axios } = require('axios');
require('dotenv').config();
const URL = 'https://api.twitter.com/1.1/search/tweets.json';

class Twitter {
    get(query, count, max_id){
        return axios.get(URL, {
            params: {
                q: query,
                count: count,
                tweet_mode: "extended",
                max_id: max_id
            },
            headers: {
                "Authorization": `Bearer ${process.env.TWITTER_API_TOKEN}`
            }
        })
    }
}

module.exports = Twitter;