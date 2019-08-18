$(function () {
    M.AutoInit();

    let $searchMovie = $("#searchMovie");
    let $utellyResult = $("#utellyResult");
    let $resultMessage = $("#resultMessage");
    let $resultDiv = $("#resultDiv");
    let $imdbResult = $("#imdbResult");
    let $resultMessageIMDB = $("#resultMessageIMDB");
    let $resultDivIMBD = $("#resultDivIMDB");
    let $gBoxResult = $("#gBoxResult");
    let $resultMessagegBox = $("#resultMessagegBox");
    let searchValue = [];
    let utDatas = [];
    let GBOX_API_KEY = "4d70e7bce2dce36115cecdf657c823250d0ced70";

    $resultMessage.hide();
    $resultDivIMBD.hide();
    $resultMessagegBox.hide();


    $("#gboxForm").submit(function (event) {
        event.preventDefault();

        let gboxSearch = $("#gboxSearch").val();

        searchValue.push(gboxSearch);

        // let GBOX_API_KEY = "7cbaa5da2a59678a995910c255de77709361f8bd";
        //let GBOX_API_KEY = "4d70e7bce2dce36115cecdf657c823250d0ced70";

        // for title search /v2/search?api_key=YOUR_API_KEY&type=movie&field=title&query=Terminator(gboxSearch)
        // for shows search /v2/search?api_key=YOUR_API_KEY&type=show&field=title&query=Terminator(gboxSearch)
        // for person search /v2/search?api_key=YOUR_API_KEY&type=person&query=Harrison+Ford
        // I think we could have the url string broken up to be more dynamic and use only one search field and a if statement.
        // Cycle down through the options until one of them returns something positive, then run functions from the response data.
        // It would be a lot easier to use multiple search bars for this part. 
        // 
        let gboxTitleSearchURL = "https://api-public.guidebox.com/v2/search?api_key=" + GBOX_API_KEY + "&type=movie&field=title&query=" + gboxSearch;
        console.log("ajax start");
        $.get({
            url: gboxTitleSearchURL,
            dataType: 'json',
        })
            .then(function (response) {
                let dataGBOX = response;
                console.log("datas" + dataGBOX);
                console.log(dataGBOX);

                $gBoxResult.empty();

                if (dataGBOX.total_results > 0) {

                    let divRow = $("<div>")
                        .addClass("row")
                        .appendTo($gBoxResult);

                    dataGBOX.results.forEach(dGbox => {

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
                            .attr("src", dGbox.poster_240x342)
                            .appendTo(divImg);

                        let cardStacked = $("<div>")
                            .addClass("card-stacked")
                            .appendTo(divCardH);

                        let cardContent = $("<div>")
                            .addClass("card-content animated zoomIn")
                            .appendTo(cardStacked);

                        let titleData = $("<p>")
                            .addClass("titleData animated fadeIn")
                            .text(dGbox.title)
                            .appendTo(cardContent);

                        let yearRData = $("<p>")
                            .html(`Released Year: <b>${dGbox.release_year}</b>`)
                            .appendTo(cardContent);

                        // let inTheatersResult = dGbox.in_theaters;
                        // let inTR;

                        // if (inTheatersResult) {

                        //     inTR = "Yes"

                        // } else {
                        //     inTR = "No";
                        // }

                        let ratingDisplay = $("<p>")
                            .html(`Rating: <b>${dGbox.rating}</b>`)
                            .appendTo(cardContent);

                        let altTContainer = $("<div>")
                            .addClass("alternateTitle")
                            .appendTo(cardContent);

                        let altTitle = dGbox.alternate_titles.slice(0, 3);


                        if (altTitle.length > 0) {

                            let altT = $("<p>")
                                .html("<b>Alternate Title</b>")
                                .appendTo(altTContainer);

                            let ulAltT = $("<ul>")
                                .appendTo(altTContainer);

                            altTitle.forEach(aT => {

                                let ulListItem = $("<li>")
                                    .addClass("altT")
                                    .text(aT)
                                    .appendTo(ulAltT);
                            });

                        } else {

                            altTContainer.hide();
                        }

                        // let ratingData = $("<div>")
                        //     .addClass("rating")
                        //     .text(dGbox.rating)
                        //     .appendTo(divCardH);

                        let cardAction = $("<div>")
                            .addClass("card-action")
                            .attr({
                                "id": dGbox.id,
                                "data-movie": dGbox.title
                            })
                            .appendTo(cardContent);

                        let trailerButton = $("<button>")
                            .addClass("blue btn")
                            .attr({
                                "id": "trailButton",
                                "data-Value": dGbox.id
                            })
                            .text("Watch Trailer")
                            .appendTo(cardContent);

                        let buttonDropdown = $("<button>")
                            .addClass("dropdown-trigger blue-grey btn")
                            .attr({
                                "id": "dropButton",
                                "href": "#",
                                "dataValue": dGbox.id,
                                "data-target": "droplist",
                                "data-title": dGbox.title
                            })
                            .text("Streaming List!")
                            .appendTo(cardContent);

                        let streamingList = $("<ul>")
                            .addClass("dropdown-content")
                            .attr({
                                id: "droplist",
                                "data-drop": dGbox.id
                            })
                            .appendTo(cardContent);

                    });


                } else {
                    console.log("No Result!")
                    $resultMessagegBox.show()
                        .text("Please check your spelling and try again!")
                        .addClass("redBold")
                        .appendTo($gBoxResult);
                }



            })
        console.log("ajax done");
    });

    // this is the old code, I changed the results to limit 30 so we can see which one is the main trailer. Would need to add code to use this method.
    $("body").on("click", "#trailButton", function (event) {
        event.preventDefault();

        let gboxMovieID = $(this).attr("data-Value");
        console.log(gboxMovieID);
        let gBoxTrailerUrl = "https://api-public.guidebox.com/v2/movies/" + gboxMovieID + "/videos?api_key=" + GBOX_API_KEY + "&limit=30&sources=guidebox";
        $.get({
            url: gBoxTrailerUrl,
            dataType: 'json',
        }).then(function (mTrailer) {
            console.log(mTrailer);
            // console.log(results[0].free_web_sources[0].link);
            // add the link in so its watchable. 
            // also add an if statement for if there is no trailer link for the user to watch.
        });
    });

    // this is the NEWEST code that gives us a massive response which we can use for subscription sources, overview, trailer, purchase locations, and much more.
    // focus on getting the streaming list to populate correctly with materialize. 
    $("body").on("click", "#dropButton", function (event) {
        event.preventDefault();

        let gboxMovieID = $(this).attr("dataValue");
        console.log(gboxMovieID);
        let gBoxStreamUrl = "https://api-public.guidebox.com/v2/movies/" + gboxMovieID + "/?api_key=" + GBOX_API_KEY + "&sources=subscription";
        $.get({
            url: gBoxStreamUrl,
            dataType: 'json',
        }).then(function (mStream) {
            console.log(mStream);
            // add the link in so its watchable. 
            // also add an if statement for if there is no trailer link for the user to watch.
        });
    });


    //============================old code that may be very useful still================= // 
    // Yunys Utelly function
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

    //     });


    // });

});