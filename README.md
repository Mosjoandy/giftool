# GIF Aggregator

## Overview

Project GIF Aggregator was a task used to reinforce dynamic jquery creation and the introduction to JSON and Ajax. Users are provided with a static page that appends new images based on buttons created by the search feature in the navbar. Once a button is click, 10 still image gifs are dynamically created and appended to the screen in an organized manner. When still images are clicked, they become animated. Rating and URL provided for easy referencing and usage.

* * *
![GIF Aggregator](https://cdn.discordapp.com/attachments/276798661256806410/443217661413949440/unknown.png)

## Process

- When the page has been loaded, the user is presented with the navbar, a search form, 10 pre-generated buttons, and a blank canvas.
- Users can fill out the search form, which appends a new button to the pre-generated list.
- Alternatively, users can click on the pre-generated buttons to display 10 gifs based on the name of the button.
- The gifs pull from the GIPHY, via their provided API.
- Users recieve still images of the gifs, which can then be clicked on to animate (effort to reduce bandwidth usage).
- Users are provided with a rating as well as a direct link to the file.

## Logic

### Functions:

- userButton on click - uses ajax call to utilize the GIPHY API, creating cards with information and images dynamically, then appended to the screen.
- Not shown - dynamic button creation and append to screen carrying name as a data attribute, which is then invoked by this function.

```
$(document).on("click", ".userButtons", function(event){
    event.preventDefault();

    $(".gifs").empty();

    var userSearch = $(this).attr("data-attribute");

    $.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=" + userSearch + "&api_key=z1Eb9fn2NeVbF2OEpyUtX5CfPu1tIJkT" + "&limit=10",
    method: "GET"
    }).then(function(response) {
    console.log(response);
    var gifs = response.data;

        for (var i = 0; i < gifs.length; i++) {
            var gifCard = $("<div>");
                gifCard.attr("class", "card");

            var gifResult = $("<img>");
                gifResult.attr("src", gifs[i].images.fixed_height_still.url);
                gifResult.attr("class", "clickMe card-img-top rounded");

                gifResult.attr("data-animate", gifs[i].images.fixed_height.url)
                gifResult.attr("data-still", gifs[i].images.fixed_height_still.url)
                gifResult.attr("data-state", "still");

            var gifRating = $("<p>");
                gifRating.html("Rating: <strong>" + gifs[i].rating + "</strong>");
            
            var gifURL = $("<div>");
                gifURL.attr("class", "linkURL")
                gifURL.html(gifs[i].images.fixed_height.url);

            gifCard.append(gifResult);
            gifCard.prepend(gifURL);
            gifCard.prepend(gifRating);
            
            $(".gifs").append(gifCard);
        }         
    });
});
```

- click function that utilizes the data state, still, and animate using an if/else statement to animate, or freeze

```
// Pausing and playing the gifs
    $(document).on("click", ".clickMe", function(){
        var state = $(this).attr("data-state");

        if (state === "still"){
            $(this).attr("data-state", "animate");
            $(this).attr("src", $(this).attr("data-animate"));
        } else {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"))
        }
    })
```

## CDN's Used

- Bootstrap v4.1.0 - [getbootstrap](https://getbootstrap.com/)
- jQuery v3.3.1 (uncompressed) - [jQuery core](https://code.jquery.com/)

## API's Used

- GIPHY API - [GIPHY Developers](https://developers.giphy.com/)