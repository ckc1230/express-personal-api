// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var mongoose = require("mongoose");

var db = require('./models/index');

var new_sharks = [
  { 
    name: "Joe Pavelski",
    number: 8,
    age: 32,
    position: "Right Wing",
    image: "https://cbssanfran.files.wordpress.com/2016/05/joe-pavelski-photo-by-thearon-w-henderson-getty-images.jpg?w=720"
  },

  { 
    name: "Patrick Marleau",
    number: 12,
    age: 37,
    position: "Left Wing",
    image: "http://www.novostimira.com.ua/userfiles/image/ANDREY_IVLIEV/13(312).jpg"
  }
];


db.Sharks.create(new_sharks, function(err, shark){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new Sharks Players", shark.name)
  process.exit(); // we're all done! Exit the program.
})
