// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment')

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

const convertToUtc = (uni)=>{
  const doUni = new Date(uni)
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  var dow = days[doUni.getDay() + 1]
  var year = doUni.getFullYear()
  var month = months[doUni.getMonth()];
  var date = doUni.getDate();
  var hour = doUni.getHours();
  var minute = "0" + doUni.getMinutes();
  var second = "0" + doUni.getSeconds();
  var time = `${dow}, ${date} ${month} ${year} ${hour}:${minute}:${second} GMT`
  return time;
}

const convertToUnix = (utc)=>{
  var date = new Date(utc)
  var unixTimestamp = Math.floor(date.getTime())  
  return unixTimestamp
}

app.get("/api/:given", function (req, res) {
  console.log(typeof req.params.given, req.params.given.length)
  if(req.params.given.length > 10){
    res.json({"unix": parseInt(req.params.given),
            "utc": convertToUtc(parseInt(req.params.given))
           })
  }else{
    res.json({"unix": convertToUnix(req.params.given) , "utc": req.params.given + ' 00:00:00 GMT' })
  }
  
});

// app.get("/api/:date", (req, res)=>{
//   console.log(req.params)


// })

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
