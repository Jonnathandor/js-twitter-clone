# js-twitter-clone

## GOAL
Create a twitter interface that allows users to search and view tweets. 
User Stories

* As a user, I want to be able to search tweets.
* As a user, I want to be able to trending hashtags.
* As a user, I want to be able to click trending hashtags.
* As a user, I want to load only 15 tweets at the time.
* As a user, I want to be able to load more tweets if I reach the 15th hashtag

## Diagrams
* https://app.diagrams.net/#G1AyRsqmcVLv3YnS0_istezpF-6xmCxq2J

## Business Requirements

* Pages
    * Home Page	
        * Has a trending section 
        * Has a tweets section (empty on first load)
        * Has a search tweets section.
    * Tweet structure
        * Shows the tweet text
        * Shows images(if present)
        * Shows video(if present)
        * Shows gifs(if present)
        * Shows creation time
        * Shows the profile name of the owner
        * Shows the profile username of the owner
        * Shows the picture profile of the owner
    * Trending section
        * Displays a list of the trending topics
        * The trending elements are clickable
	
* Technical Requirements
    * Uses the twitter API 
    * Uses moment.js library
    * Uses Javascript
    * Uses CSS 
    * Uses HTML