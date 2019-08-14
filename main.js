$(function () {

    let $searchMovie = $("#searchMovie");
    let $utellyResult = $("#utellyResult");
    let $resultMessage = $("#resultMessage");
    let $resultDiv = $("#resultDiv");

    $resultMessage.hide();


    $("#gboxForm").submit(function (event) {
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
            .then(function (response) {
                console.log(response);
                let dataGBOX = response.data;
                console.log("------------ GBOX --------")
                console.log(dataGBOX);
            })
        console.log("ajax done");
    });

    /* Event when the Form is submited
    ======================================================================= */

    $searchMovie.submit(function (event) {

        event.preventDefault();

        let $searchInput = $("#searchInput").val().trim();

        let searchValue = $searchInput;

        utellyApiCall(searchValue);
        iMDBApiCall(searchValue);
    })


    /* Functions
    ======================================================================= */



    // function to get movie streaming service
    let utellyApiCall = function (searchTerm) {

        let apiUrlUtelly = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?country=us&term=";
        let rapidHost = "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com";
        let rapidKey = "e8c18e9a6emsh93df675062d03fdp10e88bjsn4870cb0d0bec";


        $.get({
            url: apiUrlUtelly + searchTerm,
            dataType: 'json',
            headers: {
                "x-rapidapi-host": rapidHost,
                "x-rapidapi-key": rapidKey

            }
        }).then(function (response) {

            let uDatas = response.results;
            console.log("------------ Utely --------")
            console.log(uDatas);
            $resultDiv.empty();

            if (uDatas.length > 0) {

                $resultMessage.show();
                $resultMessage.text("Awesome we got some Movie Result!");

                uDatas.forEach(uD => {

                    console.log(uD.picture);
                    let rCarDiv = $("<div>")
                        .addClass("card");

                    let rCardDivImg = $("<div>")
                        .addClass("card-image")
                        .appendTo(rCarDiv);

                    let rImg = $("<img>")
                        .attr("src", uD.picture)
                        .appendTo(rCardDivImg);

                    let rSpanImg = $("<span>")
                        .addClass("card-title")
                        .text(uD.name)
                        .appendTo(rCardDivImg);

                    let rCardContent = $("<div>")
                        .addClass("card-content")
                        .appendTo(rCarDiv);

                    let rDiv = $("<div>");

                    let rLocation = uD.locations.forEach(function (dLoc) {

                        let rPW2W = $("<p>")
                            .html("<b>Where to Watch:</b> " + dLoc.display_name)
                            .appendTo(rDiv);

                        let rIcon = $("<img>")
                            .attr("src", dLoc.icon)
                            .appendTo(rDiv);

                        let rALink = $("<a>")
                            .attr("href", dLoc.url)
                            .html("<br>Click here to Watch")
                            .appendTo(rDiv);

                        //console.log(dLoc.display_name);
                    });

                    //rLocation.appendTo(rDiv);

                    rDiv.appendTo(rCardContent);

                    rCarDiv.appendTo($resultDiv);
                });

            } else {

                $resultMessage.show();
                $resultMessage.text("Sorry no streaming plae available! Check similar Movie!");
                iMDBApiCall(searchValue);
            }
        });

    }




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