# HW_10_LIRI_NodeJS

Application that runs **Node.js** within the terminal .  It utilizes several packages pre-installed from npmjs.com.  

These include the **request package** which allows for HTTP(S) requests to specific URLs.

The **fs package** for navigating through the file system and reading/writing to different files.

The **node-spotify-api** which facilitates the request to spotify and incorporates the secret keys needed for the request.

The Liri Application can be asked to search for four different things:

Command: ***node ./liri.js spotify-this-song "Name of Song"*** - will return information about a specific song.
Example:
![spotify-this-song](https://github.com/mig9tx/HW_10_LIRI_NodeJS/blob/master/assets/images/spotify-this-song.PNG)

Command: ***node ./liri.js concert this "Name of Artist"*** - will return a list of upcoming venues, location, and dates of the artist's upcoming shows.

Example:
![concert-this](https://github.com/mig9tx/HW_10_LIRI_NodeJS/blob/master/assets/images/concert-this.PNG)

Command: ***node ./liri.js movie-this "Name of Movie"*** - will return information about a specific movie including, title, year released, imdb rating, Rotten Tomato Rating, Plot and Actors.

Example:
![movie-this](https://github.com/mig9tx/HW_10_LIRI_NodeJS/blob/master/assets/images/movie-this.PNG)

Command: ***node ./liri.js do-what-it-says*** - will read the command and search term in a text file, detect the command, perform the function and display the result.

Example:
![do-what-it-says](https://github.com/mig9tx/HW_10_LIRI_NodeJS/blob/master/assets/images/do-what-it-says.PNG)

All of the commands and results are also being appended into the log.txt file and can be viewed within VSC and github.

Video Demonstration:

For a video demonstration please follow this link:
https://drive.google.com/file/d/1ofO_AdzlXwsnJF0cAPDibU8bBIjh5NJZ/view