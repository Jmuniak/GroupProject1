$(function() {

    let $searchMovie = $("#searchMovie");
    let $utellyResult = $("#utellyResult");
    let $resultMessage = $("#resultMessage");
    let $resultDiv = $("#resultDiv");
    let $imdbResult = $("#imdbResult");
    let $resultMessageIMDB = $("#resultMessageIMDB");
    let $resultDivIMBD = $("#resultDivIMDB");
    let $gBoxResult = $("#gBoxResult");
    let searchValue = [];

    $resultMessage.hide();
    $resultDivIMBD.hide();


    $("#gboxForm").submit(function(event) {
        event.preventDefault();
        console.log('submitted the form');
        let gboxSearch = $("#gboxSearch").val();
        console.log(gboxSearch);
        let GBOX_API_KEY = "7cbaa5da2a59678a995910c255de77709361f8bd";
        // for title search /v2/search?api_key=YOUR_API_KEY&type=movie&field=title&query=Terminator(gboxSearch)
        // for shows search /v2/search?api_key=YOUR_API_KEY&type=show&field=title&query=Terminator(gboxSearch)
        // for person search /v2/search?api_key=YOUR_API_KEY&type=person&query=Harrison+Ford
        // I think we could have the url string broken up to be more dynamic and use only one search field and a if statement.
        // Cycle down through the options until one of them returns something positive, then run functions from the response data.
        // It would be a lot easier to use multiple search bars for this part. 
        // 
        let gboxTitleSearchURL = "http://api-public.guidebox.com/v2/search?api_key=" + GBOX_API_KEY + "&type=movie&field=title&query=" + gboxSearch;
        console.log("ajax start");
        $.get({
                url: gboxTitleSearchURL,
                dataType: 'json',
            })
            .then(function(response) {
                console.log(response);

                let dataGBOX = response;

                console.log("------------ GBOX --------")
                console.log("datas" + dataGBOX);

                $gBoxResult.empty();

                if (dataGBOX.total_results > 0) {

                    dataGBOX.results.forEach(dGbox => {

                        console.log(dGbox);

                        let divCardH = $("<div>")
                            .addClass("card horizontal")
                            .appendTo($gBoxResult);

                        let divImg = $("<div>")
                            .addClass("card-image")
                            .appendTo(divCardH);

                        let img = $("<img>")
                            .attr("src", dGbox.poster_240x342)
                            .appendTo(divImg);

                        let cardStacked = $("<div>")
                            .addClass("card-stacked")
                            .appendTo(divCardH);

                        let cardContent = $("<div>")
                            .addClass("card-content")
                            .appendTo(cardStacked);

                        let titleData = $("<p>")
                            .html(dGbox.title + "<br>" + dGbox.release_year + "<br>" + dGbox.rating)
                            .appendTo(cardContent);

                        // let cardButton = $("<div")
                        //     .addClass("card-action")

                        // .appendTo(cardContent);

                        // let buttonDropdown = $("<a>")
                        //     .addClass("dropdown-trigger btn")
                        //     .attr({
                        //         "href": "#",
                        //         "data-target": "streamingList"
                        //     })
                        //     .text("Streaming List!")
                        //     .appendTo(cardButton);

                        // let streamingList = $("<ul>")
                        //     .addClass("dropdown-content")
                        //     .attr("id", "streamingList")
                        //     .appendTo(buttonDropdown);

                        // let apiUrlUtelly = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?country=us&term=";
                        // let rapidHost = "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com";
                        // let rapidKey = "e8c18e9a6emsh93df675062d03fdp10e88bjsn4870cb0d0bec";

                        // $.get({
                        //     url: apiUrlUtelly + gboxSearch,
                        //     dataType: 'json',
                        //     headers: {
                        //         "x-rapidapi-host": rapidHost,
                        //         "x-rapidapi-key": rapidKey

                        //     }
                        // }).then(function(response) {

                        //     let uDatas = response.results;
                        //     console.log("------------ Utely --------");
                        //     console.log(uDatas);

                        //     let rLocation = uDatas.locations.forEach(function(dLoc) {

                        //         let streamingListItems = $("<li>")
                        //             .appendTo(streamingList);

                        //         let linkListItem = $("<a>")
                        //             .attr("href", dLoc.url)
                        //             .text(dLoc.display_name)
                        //             .appendTo(streamingListItems);
                        //     });
                        // });


                    });


                } else {
                    console.log("No Result!")
                }



            })
        console.log("ajax done");
    });

    /* Functions
    ======================================================================= */

    let iMDBApiCall = function(searchTerm) {

        console.log("searchT" + searchTerm);
        let apiUrliMDB = "https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&s=";
        let hostIMDB = "movie-database-imdb-alternative.p.rapidapi.com";
        let apiKeyIMDB = "e8c18e9a6emsh93df675062d03fdp10e88bjsn4870cb0d0bec";

        $.get({
            url: apiUrliMDB + searchTerm,
            dataType: 'json',
            headers: {
                "x-rapidapi-host": hostIMDB,
                "x-rapidapi-key": apiKeyIMDB

            }
        }).then(function(response) {

            let dataIMDB = response.Response;
            console.log("------------ IMDB --------")
            console.log(dataIMDB);

            $resultDiv.empty();

            if (dataIMDB === "True") {

                $resultMessageIMDB.show();
                $resultMessageIMDB.text("Here is some simillar movie!");
                console.log("Got something");
            } else {
                console.log("Next time");
            }
        });
    }

    // Get data from OMD database
    // let movie = "The Matrix";
    // let queryURL = "https://www.omdbapi.com/?s=" + movie + "&apikey=trilogy";

    // $.get(queryURL)
    //     .then(function(response) {

    //         let omDB = response.Search;
    //         console.log("------------ OMDB --------")
    //         console.log(omDB);




    // // Get movie information from The Movie DB

    // let keyApi = "fa797fcbd4bd5cb308e4eaaae9007e07";

    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://api.themoviedb.org/3/movie/now_playing?api_key=" + keyApi + "&language=en-US&page=1",
    //     "method": "GET",
    //     "headers": {},
    //     "data": "{}"
    // }

    // $.ajax(settings).done(function(response) {

    //     console.log("------------The Movie BD --------")
    //     console.log(response.results);
    // });


    // // Get Movie by title 

    // let urlHost = "https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&s=";
    // let superHero = "Batman";
    // let hostIMDB = "movie-database-imdb-alternative.p.rapidapi.com";
    // let apiKeyIMDB = "e8c18e9a6emsh93df675062d03fdp10e88bjsn4870cb0d0bec";

    // $.get({
    //     url: urlHost + superHero,
    //     dataType: 'json',
    //     headers: {
    //         "x-rapidapi-host": hostIMDB,
    //         "x-rapidapi-key": apiKeyIMDB

    //     }
    // }).then(function(response) {

    //     let dataIMDB = response.Search;
    //     console.log("------------ IMDB --------")
    //     console.log(dataIMDB);
    // });





});