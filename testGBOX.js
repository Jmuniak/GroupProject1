$(function () {
    // GuideBox

    // $ curl "http://api-public.guidebox.com/v2/genres?api_key=YOUR_API_KEY?api_key={YOUR API KEY}" 

    //Authorization API KEY:
    // "7cbaa5da2a59678a995910c255de77709361f8bd"


    // Select all movies:

    // GET /v2/movies
    // Example Request
    // $ curl http://api-public.guidebox.com/v2/movies?api_key=YOUR_API_KEY

    // GET /v2/movies?sources=free,amazon_prime

    $("#gboxForm").submit(function (event) {
        event.preventDefault();
        console.log('submitted the form');
        let gboxSearch = $("#gboxSearch").val();
        console.log(gboxSearch);
        let GBOX_API_KEY = "7cbaa5da2a59678a995910c255de77709361f8bd";
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


});