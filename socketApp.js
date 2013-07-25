/**
 * This app basically shows how a device can control remotly another device via its accelerometer.
 */

//Initialize the express server
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


//Assign the port to listen to
server.listen(8080);

//Serve the requested page as index by default
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

//Serve the requested mouse display client
app.get('/client.html', function (req, res) {
  res.sendfile(__dirname + '/client.html');
});

app.get('/img/pin.png', function (req, res) {
  res.sendfile(__dirname + '/img/pin.png');
});


//Phone Client page
app.get('/client-two.html', function (req, res) {
  res.sendfile(__dirname + '/client-two.html');
});

//Resources JS
app.get('/js/jquery-1.10.2.min.js', function (req, res) {
  res.sendfile(__dirname + '/js/jquery-1.10.2.min.js');
});

//Resources CSS
app.get('/css/bootstrap.min.css', function (req, res) {
  res.sendfile(__dirname + '/css/bootstrap.min.css');
});
app.get('/css/bootstrap-responsive.min.css', function (req, res) {
  res.sendfile(__dirname + '/css/bootstrap-responsive.min.css');
});

//When a socket is connected run the following
io.sockets.on('connection', function (socket) {

  console.log('Client Connected..');	
  socket.emit('client connected',{message:'Connected successfully'});

  //When user sends data to the server
  socket.on('accel data', function (data) {
     var coordinateData = {};
     coordinateData.x = data.posX;
     coordinateData.y = data.posY;
     coordinateData.z = data.posZ;
     console.log(JSON.stringify(coordinateData));
     io.sockets.emit('update accel data',{coordinateData:coordinateData});
  });
  
  //When socket is disconnected
  socket.on('disconnect', function (data) {
	console.log('Client Disconnected..');
    io.sockets.emit('user disconnected');
  });
});