const URL = "http://localhost:3000/tweets";
let nextPageUrl = null;

//Selectors
const userSearch = document.getElementById('user-search-input');

// Functions 
const getTwitterData = (query, nextPage) => {
    query = encodeURIComponent(query);
    currentSearch = query;
    let fullURL = `${URL}?q=${query}&count=10`;
    if(nextPage && nextPageUrl){
        fullURL = nextPageUrl;
    }
    fetch(fullURL)
    .then(response => {
        return response.json();
    }).then(data => {
        buildTweets(data.statuses, nextPage);
        saveNextPage(data.search_metadata);
    })
}

const buildTweets = (tweets, nextPage=false) => {
    console.log(nextPage);
    let twitterContent = '';
    tweets.map(tweet => {
        const createdDate = moment(tweet.created_at).fromNow();
        twitterContent += `
            <div class="tweet-container">
                <div class="tweet-user-info">
                    <div class="tweet-user-profile" style="background-image: url(${tweet.user.profile_image_url_https})">

                    </div>
                    <div class="tweet-user-name-container">
                        <div class="tweet-user-fullname">
                            ${tweet.user.name}
                        </div>
                        <div class="tweet-user-username">
                            ${tweet.user.screen_name}
                        </div>
                    </div>
                </div>
                `;
                if(tweet.extended_entities 
                    && tweet.extended_entities.media
                    && tweet.extended_entities.media.length > 0){
                    twitterContent += buildImages(tweet.extended_entities.media);
                    twitterContent += buildVideo(tweet.extended_entities.media);
                }
                twitterContent += `
                <div class="tweet-text-container">
                    ${tweet.full_text}
                </div>
                <div class="tweet-date-container">
                    ${createdDate}
                </div>
            </div>
        `;
    })

    let nextPageSection = `
    <div class="next-page-container" id="next-round">
        <div id="next-page" onclick="onNextPage()">
            <i id="next-round-inner" class="fas fa-arrow-down"></i>
        </div>
    </div>`;
    
    if(nextPage){
        console.log('nextpage')
        document.getElementById('next-round').remove();
        document.querySelector('.tweets-list').insertAdjacentHTML('beforeend', twitterContent);
        document.querySelector('.tweets-list').innerHTML += nextPageSection;
    } else {
        document.querySelector('.tweets-list').innerHTML = twitterContent;
        document.querySelector('.tweets-list').innerHTML += nextPageSection;
    }
    
   
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

const buildVideo = (mediaList) => {
    let videoContent = `<div class="tweet-video-container">`;
    let videoExists = false;
    mediaList.map((media)=>{
        if(media.type == "video" || media.type == 'animated_gif'){
            videoExists = true;
            const video = media.video_info.variants.find((video)=>video.content_type == 'video/mp4');
            const videoOptions = getVideoOptions(media.type);
            videoContent += `
            <video ${videoOptions}>
                <source src="${video.url}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            `
        }
    })
    videoContent += `</div>`;
    return (videoExists ? videoContent : '');
}

const getVideoOptions = (mediaType) => {
    if(mediaType == 'animated_gif'){
        return "loop autoplay";
    } else {
        return "controls";
    }
}

const selectTrend = (e) => {
    const trendText = e.innerText;
    getTwitterData(trendText);
}

const saveNextPage = (metadata) => {
    if(metadata.next_results){
        nextPageUrl = `${URL}${metadata.next_results}`;
    } else {
        nextPageUrl = null;
    }
}

const onNextPage = () => {
    if(nextPageUrl) {
        console.log(nextPageUrl)
        getTwitterData(currentSearch, true);
    }
}

//Event listeners
userSearch.addEventListener('keyup', () =>{
    getTwitterData(userSearch.value);
})

// just playing around with the event object
document.getElementById('list').addEventListener('click',(e) => {
    if(e.target.id === 'next-round' 
    || e.target.id === 'next-round-inner'
    || e.target.id === 'next-page'){

    }

    
})