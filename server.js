// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models/index');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

// Home directory
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    // woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to Chris' personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/ckc1230/express-personal-api/blob/master/README.md", // CHANGE ME
    baseUrl: "https://glacial-springs-86107.herokuapp.com/", // CHANGE ME (done)
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/sjsharks", description: "SJ Sharks Players"},
      {method: "GET", path: "/api/sjsharks/:id", description: "Get A SJ Sharks Player"},
      {method: "POST", path: "/api/sjsharks", description: "Post a Player"}, // CHANGE ME
      {method: "PUT", path: "/api/sjsharks/:id", description: "Update a SJ Sharks Player"},
      {method: "DEL", path: "/api/sjsharks/:id", description: "Delete a SJ Sharks Player"}
    ]
  })
});

// Profile
app.get('/api/profile', function homepage(req, res) {
  res.json({ 
    name: "Christopher Chan",
    hometown: "Richmond, CA",
    favoriteSoundtracks: ["Lord of the Rings", "How to Train Your Dragon", "Star Wars"]

  });
});

app.get('/api/sjsharks', function sharksIndex(req, res) {
  db.Sharks.find({}, function(err, data){
    if (err) { console.log(err) };
    res.json(data);
  });
});

app.get('/api/sjsharks/:id', function homepage(req, res) {
  db.Sharks.findOne({ _id: req.params.id }, function(err, data){
    if (err) { console.log(err) };
    res.json(data);
  });
});

app.post('/api/sjsharks', function homepage(req, res) {
  var playerName = req.body.playerName;
  var playerNumber = req.body.playerNumber;
  var playerAge = req.body.playerAge;
  var playerPosition = req.body.playerPosition;
  var playerImage =  req.body.playerImage;   


  var sharksPlayer = new db.Sharks ({
    name: playerName,
    number: playerNumber,
    age: playerAge,
    position: playerPosition,
    image: playerImage
  });

  sharksPlayer.save(function(err, data) {
     if (err) { console.log(err) };
     console.log("Created new Sharks Players", sharksPlayer.name)
     res.json(data);

  })

});

app.put('/api/sjsharks/:id', function homepage(req, res) {
  db.Sharks.findOne(({ _id: req.params.id }, function(err, updateShark) {
    updateShark.name = req.body.playerName;
    updateShark.number = req.body.playerNumber;
    updateShark.age = req.body.playerAge;
    updateShark.position = req.body.playerPosition;
    updateShark.image = req.body.playerImage;   
    
    updateShark.save(function (err, data) {
        res.json(updateShark);
    })
    }));
});  


app.delete('/api/sjsharks/:id', function(req, res) {
  db.Sharks.findOneAndRemove({_id: req.params.id}, function(err, item) {
    res.json(item);
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
