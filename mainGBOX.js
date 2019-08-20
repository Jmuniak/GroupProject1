$(function() {
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
    let GBOX_API_KEY = "98abf308077c7e107fa86590d74feff3f6fb2ff8";

    $resultMessage.hide();
    $resultDivIMBD.hide();
    $resultMessagegBox.hide();


    $("#gboxForm").submit(function(event) {
        event.preventDefault();

        let gboxSearch = $("#gboxSearch").val();

        searchValue.push(gboxSearch);
        // let GBOX_API_KEY = "7cbaa5da2a59678a995910c255de77709361f8bd"; old
        // let GBOX_API_KEY = "4d70e7bce2dce36115cecdf657c823250d0ced70"; old
        // let GBOX_API_KEY = "98abf308077c7e107fa86590d74feff3f6fb2ff8"; Jason's
        // let GBOX_API_KEY = "61c754f09f48fdfbf850ad240e0e95ae82ac47e9"; Mike F's




        let gboxTitleSearchURL = "https://api-public.guidebox.com/v2/search?api_key=" + GBOX_API_KEY + "&type=movie&field=title&query=" + gboxSearch;
        console.log("ajax start");
        $.get({
                url: gboxTitleSearchURL,
                dataType: 'json',
            })
            .then(function(response) {
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

                        let runtimeDisplay = $("<p>")
                            .html(`Runtime: <b>${dOMDB.runtime}</b>`)
                            .addClass(`runTime`)
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

                        let buttonDropdown = $("<a>")
                            .addClass("dropdown-trigger blue-grey btn")
                            .attr({
                                "id": "dropButton",
                                "href": "#",
                                "dataValue": dGbox.id,
                                "data-target": dGbox.id, // change droplist to another form of movie id. also look into the auto init being later since the list is created after the doc is loaded
                                "data-title": dGbox.title
                            })
                            .text("Streaming List!")
                            .appendTo(cardContent);

                        // let streamingList = $("<ul>")
                        //     .addClass("dropdown-content")
                        //     .attr({
                        //         "id": dGbox.id + 17,
                        //         "data-drop": dGbox.id
                        //     })
                        //     .appendTo(cardContent);


                    });

                } else {
                    console.log("No Result!")
                    $resultMessagegBox.show()
                        .text("Please check your spelling and try again!")
                        .addClass("redBold")
                        .appendTo($gBoxResult);
                }

                //dOMDB(dGbox);
            })

        console.log("ajax done");
    });

    // OMDB API Call, needs to be achieved while each card creates itself so we can use the gBox.title and dGbox.release_year to grab the right runtime. 
    function dOMDB() {
        $(".card-content").each(function() {
            let _this = this;
            console.log($(this));
            let omdbURL = "http://www.omdbapi.com/?t=" + dGbox.title + "&y=" + dGbox.release_year + "&APIkey=trilogy";
            $.get({
                    url: omdbURL,
                    dataType: 'json',
                })
                .then(function(OMDBresponse) {
                    let dOMDB = OMDBresponse;
                    console.log(dOMDB);
                    $(".runTime", _this).text(`Runtime: <b>${dOMDB.runtime}</b>`);

                });
        })
    }


    // this is the old code, I changed the results to limit 30 so we can see which one is the main trailer. Would need to add code to use this method.
    $("body").on("click", "#trailButton", function(event) {
        event.preventDefault();

        let gboxMovieID = $(this).attr("data-Value");
        console.log(gboxMovieID);
        let gBoxStreamUrl = "https://api-public.guidebox.com/v2/movies/" + gboxMovieID + "/?api_key=" + GBOX_API_KEY + "&sources=subscription";
        $.get({
            url: gBoxStreamUrl,
            dataType: 'json',
        }).then(function(mTrailer) {
            console.log(mTrailer);
            // add the link in so its watchable. User materialize Modal for that. use the over view in the modal
            // also add an if statement for if there is no trailer link for the user to watch. "something went wrong, trailer unavailable."
        });
    });

    // this is the NEWEST code that gives us a massive response which we can use for subscription sources, overview, trailer, purchase locations, and much more.
    // focus on getting the streaming list to populate correctly with materialize. 


    $("body").on("click", "#dropButton", function(event) {
        event.preventDefault();
        //M.AutoInit();
        let $_this = $(this);
        let dataMovieID = $_this.attr("dataValue");
        let cardA = $(`[id=${dataMovieID}]`);
        let ulDrop = $(`[id=${dataMovieID}]`);
        let searchMV = $_this.attr("data-title");
        // console.log("SearchMOvie - " + searchMV);
        // console.log("CardAction - " + cardA);
        // console.log("DataMOvieID - " + dataMovieID);
        // cardA.empty();
        let gboxMovieID = $(this).attr("dataValue");
        console.log(gboxMovieID);
        let gBoxStreamUrl = "https://api-public.guidebox.com/v2/movies/" + gboxMovieID + "/?api_key=" + GBOX_API_KEY + "&sources=subscription";
        $.get({
            url: gBoxStreamUrl,
            dataType: 'json',
        }).then(function(mStream) {
            console.log(mStream);
            // start with an if statement
            // if subscription_web_sources has content do the following
            let subWebSources = mStream.subscription_web_sources;
            console.log(subWebSources);
            // for each through subwebsources. grab display_name and the link
            // populate the <li> with those results. 
            // if subscription_web_sources doesn't have content "sorry not available for streaming"
            if (subWebSources.length > 0) {
                ulDrop.empty();

                subWebSources.forEach(elem => {
                    // M.AutoInit();
                    // let streamingListItems = $("<li>")
                    //     // .addClass("divider")
                    //     // .attr("tabindex", -1)
                    //     .appendTo(ulDrop);

                    let rALink = $("<a>")
                        .text(elem.display_name)
                        .attr({
                            "href": elem.link,
                            "target": "_blank"
                        })
                        .appendTo(ulDrop)
                        // $('.dropdown-trigger').dropdown();

                    // let rIcon = $("<img>")
                    //     .attr("src", dLoc.icon)
                    //     .appendTo(rALink);
                    // console.log(rALink);
                    console.log(elem.link);
                });
            } else {
                $_this.hide();
                let $messageR = $("<p>")
                    .show()
                    .text("Sorry no streaming available! Check similar Movie!")
                    .addClass("redBold")
                    .appendTo(cardA);
            };
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

    // });


});
