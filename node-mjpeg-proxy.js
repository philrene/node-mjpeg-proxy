/**************************
TODO:
1. better passing of the headers
2. Make in modular
3. Write it modular so it can be dynamically set for cam creds
**************************/

var http = require('http');
var sys = require('sys');
// port of the cam
var cam = http.createClient(80, '192.168.1.186');
var allHttpClient = [];
// Starting the stream on the cam
var request = cam.request('GET', '/axis-cgi/mjpg/video.cgi?fps=5',
  {'host': '192.168.1.186',
   'Authorization': "Basic ZnFubWFveGJtb3A6MTAyMzc3"});
request.end();
request.on('response', function (response) {
  response.setEncoding('binary');
  response.on('data', function (chunk) {
      
      for(i=0; i < allHttpClient.length; i++)
      {       
       allHttpClient[i].write(chunk, 'binary');
      }  
      
  });  
  
});
var testServer = http.createServer();

testServer.on('request', function (req, res){
	res.writeHead(200, {"cache-control":"no-cache","pragma":"no-cache","expires":"Thu, 01 Dec 1994 16:00:00 GMT","content-type":"multipart/x-mixed-replace; boundary=myboundary"});
	allHttpClient.push(res);
});

testServer.listen(5080, "0.0.0.0");
sys.puts('Server started on port 5080');



























/*************************
DEPRECATED SHIT
*************************/
/******** READ AN IMAGE AND SEND IT ON CONNECTION *********/
//var image = fs.readFileSync('/home/prene/Desktop/hotmail.png', 'binary', function(err, data){
//		sys.puts("yep gone through");
//		if(err) throw err;
//        
//		return data;
//       });

//var server = http.createServer(function (req, res) {

//       res.writeHead(200, { "Content-Type": "text/jpg"
//                          , "Content-Length": image.length
//                          });
//     
//       res.end(image, 'binary');

//  
//}).listen(7878, "0.0.0.0");

/**** // *******/


/************ STORE ALL SOCKETS CONNECTING *****************/

//sockets = [];
// 

//net.createServer(function (socket) {

//  socket.setEncoding("utf8");
//  socket.addListener("connect", function () {
//    console.log("Connected");
//	
//  });

//  socket.addListener("end", function () {
//    socket.end();
//    
//  });

//  sockets.push(socket);

//}).listen(port, "0.0.0.0");
//sys.puts("Server TCP listening on 127.0.0.1 on port: " + port);

/************ // ********/
