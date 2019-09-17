'use strict';

//dependencies
const express = require('express');
const cors = require('cors');

// env variables
require('dotenv').config();

// set port
const PORT = process.env.PORT;

// set up app

// wth does this do
const app = express();

app.use(cors());

// console.log(cors());


// helpers

// take the query object from the frontend and run that through 
function searchToLatLong(query) {
    // temporarily a link to our hardcoded sample data
    const geoData = require('./data/geo.json');
    // read in the data that we get and turn that into a place object
    const place = new Place(geoData.results[0]);
    // add in the original query that we got to teh place object so we have a record of what the user searched for
    place.search_query = query;
    return place;
}

// use a constructor function to turn the json data that we get back into a Place object that we can do things with 
function Place(data) {
    this.formatted_query = data.formatted_address;
    this.latitude = data.geometry.location.lat;
    this.longitude = data.geometry.location.lng;   
}


// Make a route that when hit gets the browser's request object, hits google to turn that into lat/long,
// then returns the response which is 

// in:  the request object which has the query
// run that query through google maps and get back a location object 

app.get('/location', (request, response) => {

    const locationData = searchToLatLong(request.query.data);
    // console.log(request.query.data);
    // console.log(request.query);
    response.send(locationData);

});


// get app.listen in here
app.listen(PORT, () => console.log(`listening is up on ${PORT}`));