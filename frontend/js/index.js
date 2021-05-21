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
        console.log(data)
    })
}


//Event listeners
userSearch.addEventListener('keyup', () =>{
    getTwitterData(userSearch.value);
})