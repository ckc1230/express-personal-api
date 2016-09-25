// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var mongoose = require("mongoose");

var db = require('./models/index');

var new_shark = {
  name: "Joe Pavelski",
  number: 8,
  age: 32,
  position: "Right Wing"
};



var new_sharks = [
  { 
    name: "Joe Pavelski",
    number: 8,
    age: 32,
    position: "Right Wing"
  },

  { 
    name: "Patrick Marleau",
    number: 12,
    age: 37,
    position: "Left Wing"
  }
];


db.Sharks.create(new_sharks, function(err, shark){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new Sharks Players", shark.name)
  process.exit(); // we're all done! Exit the program.
})
