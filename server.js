var express = require('express');
var path = require('path');
var app = express();
const axios = require('axios');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, '/webApp-plivo/views'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
console.log(__dirname);
app.use(express.static(__dirname + '/webApp-plivo/public'));

// set the home page route
app.get('/:uid/:deviceId', async function(req, res) {
  // ejs render automatically looks in the views folder
  const { uid, deviceId } = req.params;
  console.log({uidCheck:uid})
  const getCallNumber = await axios.get(`https://eduarno-test-apis.uc.r.appspot.com/v1/api/conversations/getWaId/${uid}`);
  if(getCallNumber.data)console.log({getCallNumber : getCallNumber.data})
  res.render('index',{ waId: getCallNumber?.data?.result});
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});