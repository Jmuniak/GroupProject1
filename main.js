$(function () {
    M.AutoInit();

    let $resultMessage = $("#resultMessage");
    let $gBoxResult = $("#gBoxResult");
    let $resultMessage = $("#resultMessagegBox");
    let searchValue = [];
    let GBOX_API_KEY = "98abf308077c7e107fa86590d74feff3f6fb2ff8";
    $resultMessage.hide();

    // Form Submit, generate search results with the API Call
    $("#gboxForm").submit(function (event) {
        event.preventDefault();
        let gboxSearch = $("#gboxSearch").val();
        searchValue.push(gboxSearch);
        // let GBOX_API_KEY = "7cbaa5da2a59678a995910c255de77709361f8bd"; old
        // let GBOX_API_KEY = "4d70e7bce2dce36115cecdf657c823250d0ced70"; old
        // let GBOX_API_KEY = "98abf308077c7e107fa86590d74feff3f6fb2ff8"; Jason's and current
        // let GBOX_API_KEY = "61c754f09f48fdfbf850ad240e0e95ae82ac47e9"; Mike F's
        let gboxTitleSearchURL = "https://api-public.guidebox.com/v2/search?api_key=" + GBOX_API_KEY + "&type=movie&field=title&query=" + gboxSearch;

        $.get({
            url: gboxTitleSearchURL,
            dataType: 'json',
        })
            .then(function (response) {
                let dataGBOX = response;

                $gBoxResult.empty();

                if (dataGBOX.total_results > 0) {
                    // Dynamically create Display cards
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

                        let ratingDisplay = $("<p>")
                            .html(`Rating: <b>${dGbox.rating}</b>`)
                            .appendTo(cardContent);

                        // Not working yet
                        let runtimeDisplay = $("<p>")
                            // .html(`Runtime: <b>${dOMDB.runtime}</b>`)
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

                        let cardAction = $("<div>")
                            .addClass("card-action")
                            .attr({
                                "id": dGbox.id,
                                "data-movie": dGbox.title
                            })
                            .appendTo(cardContent);

                        // Not working yet
                        let trailerButton = $("<button>")
                            .addClass("blue btn")
                            .attr({
                                "id": "trailerButton",
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
                                "data-target": dGbox.id,
                                "data-title": dGbox.title
                            })
                            .text("Streaming List!")
                            .appendTo(cardContent);
                    });

                } else {
                    $resultMessage.show()
                        .text("Please check your spelling and try again!")
                        .addClass("redBold")
                        .appendTo($gBoxResult);
                }

                // Not working yet
                //dOMDB(dGbox);
            })
    });

    // OMDB API Call, needs to be achieved while each card creates itself so we can use the gBox.title and dGbox.release_year to grab the right runtime from OMDB. 
    function dOMDB() {
        $(".card-content").each(function () {
            let _this = this;
            // console.log($(this));
            let omdbURL = "http://www.omdbapi.com/?t=" + dGbox.title + "&y=" + dGbox.release_year + "&APIkey=trilogy";
            $.get({
                url: omdbURL,
                dataType: 'json',
            })
                .then(function (OMDBresponse) {
                    let dOMDB = OMDBresponse;
                    $(".runTime", _this).text(`Runtime: <b>${dOMDB.runtime}</b>`);
                });
        })
    }

    // Not working yet Trailer button API Call
    $("body").on("click", "#trailerButton", function (event) {
        event.preventDefault();

        let gboxMovieID = $(this).attr("data-Value");
        let gBoxStreamUrl = "https://api-public.guidebox.com/v2/movies/" + gboxMovieID + "/?api_key=" + GBOX_API_KEY + "&sources=subscription";
        $.get({
            url: gBoxStreamUrl,
            dataType: 'json',
        })
            .then(function (mTrailer) {
                // console.log(mTrailer);
                // add the link in so its watchable.
                // also add an if statement for if there is no trailer link for the user to watch. "something went wrong, trailer unavailable."
            });
    });

    // Check for Subscription streaming availability button with API Call
    $("body").on("click", "#dropButton", function (event) {
        event.preventDefault();
        let $_this = $(this);
        let dataMovieID = $_this.attr("dataValue");
        let cardA = $(`[id=${dataMovieID}]`);
        let ulDrop = $(`[id=${dataMovieID}]`);
        let gboxMovieID = $(this).attr("dataValue");
        let gBoxStreamUrl = "https://api-public.guidebox.com/v2/movies/" + gboxMovieID + "/?api_key=" + GBOX_API_KEY + "&sources=subscription";

        $.get({
            url: gBoxStreamUrl,
            dataType: 'json',
        })
            .then(function (mStream) {
                let subWebSources = mStream.subscription_web_sources;
                if (subWebSources.length > 0) {
                    ulDrop.empty();
                    subWebSources.forEach(elem => {
                        let subscriptionLink = $("<a>")
                            .text(elem.display_name)
                            .attr({
                                "href": elem.link,
                                "target": "_blank"
                            })
                            .appendTo(ulDrop)
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


});