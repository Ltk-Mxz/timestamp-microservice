// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

function isValidTimestamp(value) {
  return !isNaN(value) && Number.isInteger(Number(value)) && Number(value) > 0;
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/:input?', function (req, res) {
  let input = req.params.input;

  if (!input)
    input = new Date();

  else if (isValidTimestamp(input))
    input = new Date(Number(input));

  else{
    input = new Date(input);
    if (isNaN(input.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  }

  res.json({
    unix: input.getTime(),
    utc: input.toUTCString()
  });
  
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});