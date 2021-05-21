const URL = "http://localhost:3000/tweets";

//Selectors
const userSearch = document.getElementById('user-search-input');

// Functions 

const getTwitterData = (query) => {
    query = encodeURIComponent(query);
    const fullURL = `${URL}?q=${query}&count=10`;
    fetch(fullURL)
    .then(response => {
        return response.json()
    }).then(data => {
        buildTweets(data.statuses)
    })
}

const buildTweets = (tweets, nextPage) => {
    let twitterContent = '';
    tweets.map(tweet => {
        twitterContent += `
            <div class="tweet-container">
                <div class="tweet-user-info">
                    <div class="tweet-user-profile">

                    </div>
                    <div class="tweet-user-name-container">
                        <div class="tweet-user-fullname">
                            Jonnathan Garcia
                        </div>
                        <div class="tweet-user-username">
                            @jonnathandor
                        </div>
                    </div>
                </div>
                `;
                if(tweet.extended_entities && tweet.extended_entities.media.length > 0){
                    twitterContent += buildImages(tweet.extended_entities.media)
                }
                twitterContent += `
                <div class="tweet-text-container">
                    ${tweet.full_text}
                </div>
                <div class="tweet-date-container">
                    20 hours ago
                </div>
            </div>
        `;
    })
    
    document.querySelector('.tweets-list').innerHTML = twitterContent;
}

const buildImages = (images) => {
    let imagesContent = `<div class="tweet-images-container">`;
    let imageExists = false;
    images.map(image => {
        if(image.type == 'photo'){
            imageExists = true;
            imagesContent += `<div class="tweet-image" style="background-image: url(${image.media_url_https})"></div>`
        }
    });

    imagesContent += `</div>`

    return imageExists ? imagesContent : '';
}


//Event listeners
userSearch.addEventListener('keyup', () =>{
    getTwitterData(userSearch.value);
})