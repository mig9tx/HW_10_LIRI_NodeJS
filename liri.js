require("dotenv").config(); //file where keys are hidden

var keys = require("./keys.js");
var fs = require("fs"); //file system
var moment = require('moment');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require("request");
var searchResult = '';//global variable to hold all of the results from any of the queries





// var bandsintown = require('bandsintown')(APP_ID);

//takes two arguments
//action (ie. 'concert-this', 'spotify-this-song', 'movie-this','do-what-it-says')
var action = process.argv[2];
//search term to be used in the action
var searchName = process.argv[3];

// console.log(Spotify);
// console.log(spotify);

// console.log(process.env.SPOTIFY_ID)/
// console.log(process.env.SPOTIFY_SECRET);

//switch cases for the actions

function searchLog() {
    var text = "Command: " + action + ", Search: "+ searchName;

    // Next, we append the text into the "log.txt" file.
    // If the file didn't exist, then it gets created on the fly.
    fs.appendFile("./log.txt", `${text}\n${searchResult}\n`, function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added!");
        }

    });
}

commands();

function commands() {
    switch (action) {
        case "concert-this":
            searchLog();
            concertThis();
            break;

        case "spotify-this-song":
            
            spotifyThisSong();
            break;

        case "movie-this":
            searchLog();
            movieThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;

            //instructions
        default:
            console.log("choose a command: concert-this, spotify-this-song, movie-this, or do-what-it-says");
    };
}

function spotifyThisSong() {
    let songName = searchName;
    if (!songName) {
        songName = 'The Sign ace of base';
    };

    spotify
        .search({
            type: 'track',
            query: songName,
            limit: 1
        })
        .then(function (response) {
            searchResult = "Artist: " + response.tracks.items[0].artists[0].name + "\n" + 
            "Song Name: " + response.tracks.items[0].name + "\n" + 
            "Preview Url: " + response.tracks.items[0].preview_url + "\n" +
            "Album Name: " + response.tracks.items[0].album.name + "\n";
            
            console.log(searchResult);
            searchLog();

            // console.log("Artist: " + response.tracks.items[0].artists[0].name);
            // console.log("Song Name: " + response.tracks.items[0].name);
            // console.log("Preview Url: " + response.tracks.items[0].preview_url);
            // console.log("Album Name: " + response.tracks.items[0].album.name);

        })
        .catch(function (err) {
            console.log(err);
        });
}



function concertThis() {

    var artist = searchName;
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.concert.app_id;

    request(queryUrl, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

        // If the request is successful
        if (!error && response.statusCode === 200) {
            const concerts = JSON.parse(body);
            console.log(concerts);
            searchResult = '';
            for (i = 0; i < concerts.length; i++) {
                searchResult = searchResult + "Venue: " + concerts[i].venue.name + "\n" +
                "Location: " + concerts[i].venue.city + ", " + concerts[i].venue.country + "\n" +
                "Date: " + moment(concerts[i].datetime).format("MM/DD/YYYY") + "\n";
            }
            console.log(searchResult);
            searchLog();

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        }
    });
}

function movieThis() {
    const movie = searchName;

    let queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + keys.movie.apikey;

    request(queryUrl, function (error, response, body) {

        let movieInfo = JSON.parse(body); // Parse the body of the site and recover just the imdbRating
        // console.log(movieInfo);
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            searchResult = "Title: " + movieInfo.Title + "\n" +// * Title of the movie.
            "Year: " + movieInfo.Year + "\n" + // * Year the movie came out.
            "IMDB rating: " + movieInfo.imdbRating + "\n" + // * IMDB Rating of the movie.
            "Rotten Rating: " + movieInfo.Ratings[1].Value + "\n" + // * Rotten Tomatoes Rating of the movie.
            "Country: " + movieInfo.Country + "\n" + // * Country where the movie was produced.
            "Language: " + movieInfo.Language + "\n" +  // * Language of the movie.
            "Plot: " + movieInfo.Plot + "\n" + // * Plot of the movie.
            "Actors: " + movieInfo.Actors + "\n"  // * Actors in the movie.
        }
        console.log(searchResult);
        searchLog();
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        searchName = dataArr[1];
        action = dataArr[0];
        console.log(searchName);
        console.log(action);
        commands();
        
    });
}