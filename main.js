$(function() {

    // Get data from UTELY API via RAPID KEY
    let apiUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?country=us&term=";
    let searchTerm = "avengers";
    let rapidHost = "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com";
    let rapidKey = "e8c18e9a6emsh93df675062d03fdp10e88bjsn4870cb0d0bec";

    $.get({
        url: apiUrl + searchTerm,
        dataType: 'json',
        headers: {
            "x-rapidapi-host": rapidHost,
            "x-rapidapi-key": rapidKey

        }
    }).then(function(response) {

        let utelyDatas = response.results;
        console.log("------------ Utely --------")
        console.log(utelyDatas);
    });


    // Get data from OMD database
    let movie = "The Matrix";
    let queryURL = "https://www.omdbapi.com/?s=" + movie + "&apikey=trilogy";

    $.get(queryURL)
        .then(function(response) {

            let omDB = response.Search;
            console.log("------------ OMDB --------")
            console.log(omDB);

        });


    // Get movie information from The Movie DB

    let keyApi = "fa797fcbd4bd5cb308e4eaaae9007e07";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/now_playing?api_key=" + keyApi + "&language=en-US&page=1",
        "method": "GET",
        "headers": {},
        "data": "{}"
    }

    $.ajax(settings).done(function(response) {

        console.log("------------The Movie BD --------")
        console.log(response.results);
    });


});