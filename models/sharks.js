var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SharksSchema = new Schema({
  name: String,
  number: Number,
  age: Number,
  position: String
});


var Sharks = mongoose.model('Sharks', SharksSchema);

module.exports = Sharks;