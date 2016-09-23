var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");

module.exports.Sharks = require("./sharks.js");
// module.exports.Campsite = require("./campsite.js.example");
