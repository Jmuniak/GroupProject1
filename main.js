$(function () {
    M.AutoInit();

    let $searchMovie = $("#searchMovie");
    let $utellyResult = $("#utellyResult");
    let $resultMessage = $("#resultMessage");
    let $resultDiv = $("#resultDiv");
    let $imdbResult = $("#imdbResult");
    let $resultMessageIMDB = $("#resultMessageIMDB");
    let $resultDivIMDB = $("#resultDivIMDB");
    let $titleSearchResult = $("#titleSearchResult");
    let $resultMessagegBox = $("#resultMessagegBox");
    let searchValue = [];
    let utDatas = [];
    let GBOX_API_KEY = "4d70e7bce2dce36115cecdf657c823250d0ced70";

    $resultMessage.hide();
    $resultDivIMDB.hide();
    $resultMessagegBox.hide();


    // IMBD Title Search
    $("#searchForm").submit(function (event) {
        event.preventDefault();

        let titleSearch = $("#titleSearch").val();
        let hostIMDB = "movie-database-imdb-alternative.p.rapidapi.com";
        let apiKeyIMDB = "e8c18e9a6emsh93df675062d03fdp10e88bjsn4870cb0d0bec";
        let titleSearchURL = "https://movie-database-imdb-alternative.p.rapidapi.com/?page=1&s=" + titleSearch;
        console.log("ajax start");
        $.get({
            url: titleSearchURL,
            dataType: 'json',
            headers: {
                "x-rapidapi-host": hostIMDB,
                "x-rapidapi-key": apiKeyIMDB
            }
        })
            .then(function (response) {
                let titleSearchData = response;
                console.log(titleSearchData);
                console.log(titleSearchData.Search);
                $titleSearchResult.empty();

                if (titleSearchData > 0) {

                    let divRow = $("<div>")
                        .addClass("row")
                        .appendTo($titleSearchResult);

                    titleSearchData.Search.forEach(dIMDB => {

                        let divCol = $("<div>")
                            .addClass("col s12	m12 l6 xl6")
                            .appendTo(divRow);

                        let divCardH = $("<div>")
                            .addClass("card horizontal animated rollIn")
                            .appendTo(divCol);

                        let divImg = $("<div>")
                            .addClass("card-image animated fadeIn")
                            .appendTo(divCardH);

                        let img = $("<img>")
                            .attr("src", dIMDB.Poster)
                            .appendTo(divImg);

                        let cardStacked = $("<div>")
                            .addClass("card-stacked")
                            .appendTo(divCardH);

                        let cardContent = $("<div>")
                            .addClass("card-content animated zoomIn")
                            .appendTo(cardStacked);

                        let titleData = $("<p>")
                            .addClass("titleData animated fadeIn")
                            .text(dIMDB.Title)
                            .appendTo(cardContent);

                        let yearRData = $("<p>")
                            .html(`Released Year: <b>${dIMDB.Year}</b>`)
                            .appendTo(cardContent);

                        let cardAction = $("<div>")
                            .addClass("card-action")
                            .attr({
                                "id": dIMDB.imdbID,
                                "data-movie": dIMDB.Title
                            })
                            .appendTo(cardContent);

                        // let trailerButton = $("<button>")
                        //     .addClass("blue btn")
                        //     .attr({
                        //         "id": "trailButton",
                        //         "data-Value": dIMBD.imbdID
                        //     })
                        //     .text("Watch Trailer")
                        //     .appendTo(cardContent);

                        let buttonDropdown = $("<a>")
                            .addClass("dropdown-trigger blue-grey btn")
                            .attr({
                                "id": "dropButton",
                                "href": "#",
                                "dataValue": dIMDB.imdbID,
                                "data-target": dIMDB.imdbID + 17, // change droplist to another form of movie id. also look into the auto init being later since the list is created after the doc is loaded
                                "data-title": dIMDB.Title
                            })
                            .text("Streaming List!")
                            .appendTo(cardContent);

                        let streamingList = $("<ul>")
                            .addClass("dropdown-content")
                            .attr({
                                "id": dIMDB.imdbID + 17,
                                "data-drop": dIMDB.imdbID
                            })
                            .appendTo(cardContent);
                    });
                }
                else {
                    console.log("No Result!")
                    $resultMessagegBox.show()
                        .text("Please check your spelling and try again!")
                        .addClass("redBold")
                        .appendTo($titleSearchResult);
                }
            })
        console.log("ajax done");
    });

    // this is the old code, I changed the results to limit 30 so we can see which one is the main trailer. Would need to add code to use this method.
    // $("body").on("click", "#trailButton", function (event) {
    //     event.preventDefault();

    //     let gboxMovieID = $(this).attr("data-Value");
    //     console.log(gboxMovieID);
    //     let gBoxStreamUrl = "https://api-public.guidebox.com/v2/movies/" + gboxMovieID + "/?api_key=" + GBOX_API_KEY + "&sources=subscription";
    //     $.get({
    //         url: gBoxStreamUrl,
    //         dataType: 'json',
    //     }).then(function (mTrailer) {
    //         console.log(mTrailer);
    //         // add the link in so its watchable. User materialize Modal for that. use the over view in the modal
    //         // also add an if statement for if there is no trailer link for the user to watch. "something went wrong, trailer unavailable."
    //     });
    // });


    // this is the NEWEST code that gives us a massive response which we can use for subscription sources, overview, trailer, purchase locations, and much more.
    // focus on getting the streaming list to populate correctly with materialize. 
    // $("body").on("click", "#dropButton", function (event) {
    //     event.preventDefault();
    //     M.AutoInit();
    //     let $_this = $(this);
    //     let dataMovieID = $_this.attr("dataValue");
    //     let cardA = $(`[id=${dataMovieID}]`);
    //     let ulDrop = $(`[data-drop=${dataMovieID}]`);
    //     let searchMV = $_this.attr("data-title");
    //     // console.log("SearchMOvie - " + searchMV);
    //     // console.log("CardAction - " + cardA);
    //     // console.log("DataMOvieID - " + dataMovieID);
    //     // cardA.empty();
    //     let gboxMovieID = $(this).attr("dataValue");
    //     console.log(gboxMovieID);
    //     let gBoxStreamUrl = "https://api-public.guidebox.com/v2/movies/" + gboxMovieID + "/?api_key=" + GBOX_API_KEY + "&sources=subscription";
    //     $.get({
    //         url: gBoxStreamUrl,
    //         dataType: 'json',
    //     }).then(function (mStream) {
    //         console.log(mStream);
    //         // start with an if statement
    //         // if subscription_web_sources has content do the following
    //         let subWebSources = mStream.subscription_web_sources;
    //         console.log(subWebSources);
    //         // for each through subwebsources. grab display_name and the link
    //         // populate the <li> with those results. 
    //         // if subscription_web_sources doesn't have content "sorry not available for streaming"
    //         if (subWebSources.length > 0) {
    //             ulDrop.empty();

    //             subWebSources.forEach(elem => {
    //                 M.AutoInit();
    //                 let streamingListItems = $("<li>")
    //                     // .addClass("divider")
    //                     // .attr("tabindex", -1)
    //                     .appendTo(ulDrop);

    //                 let rALink = $("<a>")
    //                     .text(elem.display_name)
    //                     .attr({
    //                         "href": elem.link,
    //                         "target": "_blank"
    //                     })
    //                     .appendTo(streamingListItems);

    //                 // let rIcon = $("<img>")
    //                 //     .attr("src", dLoc.icon)
    //                 //     .appendTo(rALink);
    //                 // console.log(rALink);


    //             });
    //         };
    //     });
    //     console.log(M)
    //     M.AutoInit();
    //     $('.dropdown-trigger').dropdown();
    // });

    //============================old code that may be very useful still================= // 

    // Utelly function
    // // Run when the streaming list button is clicked
    // $("body").on("click", "#dropButton", function (event) {

    //     event.preventDefault();

    //     let $_this = $(this);
    //     let dataMovieID = $_this.attr("dataValue");
    //     let cardA = $(`[id=${dataMovieID}]`);
    //     let ulDrop = $(`[data-drop=${dataMovieID}]`);
    //     let searchMV = $_this.attr("data-title");
    //     // console.log("SearchMOvie - " + searchMV);
    //     // console.log("CardAction - " + cardA);
    //     // console.log("DataMOvieID - " + dataMovieID);
    //     //cardA.empty();

    //     //Getting streaming possibility from Utelly

    //     let apiUrlUtelly = "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?country=us&term=";
    //     let rapidHost = "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com";
    //     let rapidKey = "e8c18e9a6emsh93df675062d03fdp10e88bjsn4870cb0d0bec";

    //     $.get({
    //         url: apiUrlUtelly + searchMV,
    //         dataType: 'json',
    //         headers: {
    //             "x-rapidapi-host": rapidHost,
    //             "x-rapidapi-key": rapidKey

    //         }
    //     }).then(function (response) {

    //         let uDatas = response.results;
    //         console.log(uDatas);

    //         if (uDatas.length > 0) {

    //             // $_this.hide();
    //             ulDrop.empty();
    //             uDatas.forEach(uD => {

    //                 let rLocation = uD.locations.forEach(function (dLoc) {

    //                     let streamingListItems = $("<li>")
    //                         .addClass("divider")
    //                         .attr("tabindex", -1)
    //                         .appendTo(ulDrop);

    //                     let rALink = $("<a>")
    //                         .attr({
    //                             "href": dLoc.url,
    //                             "target": "_blank"
    //                         })
    //                         .appendTo(streamingListItems);

    //                     let rIcon = $("<img>")
    //                         .attr("src", dLoc.icon)
    //                         .appendTo(rALink);
    //                     console.log(rALink);

    //                 });
    //             });

    //         } else {
    //             $_this.hide();
    //             let $messageR = $("<p>")
    //                 .show()
    //                 .text("Sorry no streaming available! Check similar Movie!")
    //                 .addClass("redBold")
    //                 .appendTo(cardA);
    //         }

    // });


});