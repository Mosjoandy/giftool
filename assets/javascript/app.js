// // Array for buttons
// var userButtons = ["Excitement", "High Fives", "Good Job", "Disgust", "Nope", "Yup", "Surprised", "Awkward", "Listen", "Magic", "No way"];

// // Make a button function
// function renderButton() {
//     // Clear out hook with empty
//     $("#placeholder").empty();

//     for (var i = 0; i < userButtons.length; i++) {

//         // Make new buttons
//             var gifButton = $("<button>");
//         // Adding a class
//             gifButton.addClass("userButtons btn btn-outline-secondary");
//         // Adding button type
//             gifButton.attr("type", "button");
//         // Adding a data-attribute with a value of the gif at index i
//             gifButton.attr("data-attribute", userButtons[i]);
//         // Providing the button's text with a value of the gif at index i
//             gifButton.text(userButtons[i]);
//         // Adding the button to display
//             $("#placeholder").append(gifButton);
//     }
// }

//Search GIF button
// $(document).on("click", "#submitSearch", function(event){
//     event.preventDefault();

//     // taking user input
//         var gifSearch = $(".gifSearch").val().trim();
//     // pushing user input into array
//         userButtons.push(gifSearch);
//         renderButton();
// });

// $(document).on("click", ".userButtons", function(event){
//     event.preventDefault();


$(document).on("click", "#submitSearch", function(event){
    event.preventDefault();

    // taking user input
        var gifSearch = $(".gifSearch").val().trim();
    // pushing user input into array
        // userButtons.push(gifSearch);
        // renderButton();
    $(".gifs").empty();

    // Get data-attribute from buttons made earlier
        var userSearch = gifSearch

    console.log(userSearch);

    //ajax call using GIPHY API
    $.ajax({
    url: "https://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=z1Eb9fn2NeVbF2OEpyUtX5CfPu1tIJkT" + "&limit=25",
    method: "GET"
    }).then(function(response) {
    console.log(response);
    var gifs = response.data;

        for (var i = 0; i < gifs.length; i++) {
            // make container for each image
                var gifCard = $("<div>");
            //Put gifCard into a card-style from bootstrap?******
                gifCard.attr("class", "card");

            // Put image search result into an img 
                var gifResult = $("<img>");
                gifResult.attr("src", gifs[i].images.fixed_height_still.url);
            // Give attribute of image clickMe
                gifResult.attr("class", "clickMe card-img-top rounded");

            // Give attributes of animate, still, and state
                gifResult.attr("data-animate", gifs[i].images.fixed_height.url)
                gifResult.attr("data-still", gifs[i].images.fixed_height_still.url)
                gifResult.attr("data-state", "still");

            // Make rating p, give it data and some styling    
                var gifRating = $("<p>");
                gifRating.html("Rating: <strong>" + gifs[i].rating + "</strong>");
                
            // Make URL div, give it class and data
                var gifURL = $("<div>");
                gifURL.attr("class", "linkURL")
                gifURL.html(gifs[i].images.fixed_height.url);

            // Put gifResult, gifRating into gifCard
                gifCard.append(gifResult);
                gifCard.prepend(gifURL);
                gifCard.prepend(gifRating);
                
            // Append results to page
                $(".gifs").append(gifCard);
        }         
    });
});

// Pausing and playing the gifs
$(document).on("click", ".clickMe", function(){
    var state = $(this).attr("data-state");

    // Default state of images is "still"
    if (state === "still"){
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"))
    }
})

// renderButton();