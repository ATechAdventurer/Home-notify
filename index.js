var express = require('express');
var googlehome = require('google-home-notifier');
var ngrok = require('ngrok');
var localtunnel = require('localtunnel');
var bodyParser = require('body-parser');
var app = express();
var Config = require('./config');
const serverPort = 8091; // default port

var deviceName = 'Google Home';
var ip = '192.168.86.30'; // default IP

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/views'));
app.get('/', function (req, res){
    res.sendFile(__dirname + '/views/buttons.html');
});
app.get('/sounds', function (req, res){
    let {sounds} = Config;
    res.send(sounds);
});

app.get('/devices', function (req, res){
    let {devices} = Config;
    res.send(devices);
});

app.get('/google-home-notifier', function (req, res) {

  console.log(req.query);

  var text = req.query.text;

  if (req.query.ip) {
     ip = req.query.ip;
  }

  var language = 'pl'; // default language code
  if (req.query.language) {
    language;
  }

  googlehome.ip(ip, language);

  if (text) {
    try {
      if (text.startsWith('http')){
        var mp3_url = text;
        googlehome.play(mp3_url, function(notifyRes) {
          console.log(notifyRes);
          res.redirect('/');
          //res.send(deviceName + ' will play sound from url: ' + mp3_url + '\n');
        });
      } else {
        googlehome.notify(text, function(notifyRes) {
          console.log(notifyRes);
          res.redirect('/');
          //res.send({status: true});
          //res.send(deviceName + ' will say: ' + text + '\n');
          //res.sendFile(__dirname + '/views/buttons.html');
        });
      }
    } catch(err) {
      console.log(err);
      res.sendStatus(500);
      res.sendFile(__dirname + '/views/buttons.html');
    }
  }else{
    res.send('Please GET "text=Hello+Google+Home"');
  }
})

app.listen(serverPort, function () {
  /*ngrok.connect(serverPort, function (err, url) {
    console.log('Endpoints:');
    console.log('    http://' + ip + ':' + serverPort + '/google-home-notifier');
    console.log('    ' + url + '/google-home-notifier');
    console.log('GET example:');
    console.log('curl -X GET ' + url + '/google-home-notifier?text=Hello+Google+Home');
	console.log('POST example:');
	console.log('curl -X POST -d "text=Hello Google Home" ' + url + '/google-home-notifier');
  });
  */
  var tunnel = localtunnel(serverPort,{ subdomain: "cosbycompoundserver"},function(err, tunnel) {
      if (err){
        console.log(err)
      }

      // the assigned public url for your tunnel
      // i.e. https://abcdefgjhij.localtunnel.me
      console.log(tunnel.url);
  });
})