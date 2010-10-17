/**************************
TODO:
x. better passing of the headers
2. Make in modular
3. Write it modular so it can be dynamically set for cam creds
**************************/

var http = require('http'),
sys = require('sys'),
url = require('url');

var feedurl = "http://192.168.0.196:8080/videofeed";
feedurl = url.parse(feedurl);

// port of the cam
var cam = http.createClient(feedurl.port, feedurl.hostname);
var audienceClients = [];

var testServer = http.createServer();
testServer.listen(5080, "0.0.0.0");
sys.puts('Server started on port 5080');

// Starting the stream on the cam
var request = cam.request('GET', feedurl.pathname +
  (feedurl.search ? feedurl.search : ""),
  {'host': feedurl.hostname});
request.end();
request.on('response', function (srcResponse) {

  /** Setup server listener **/
  testServer.on('request', function (req, res) {
    /** Replicate the header from the source **/
    res.writeHead(200, srcResponse.headers);
    /** Push the client into the client list **/
    audienceClients.push(res);
    /** Clean up connections when they're dead **/
    res.socket.on('close', function () {
      audienceClients.splice(audienceClients.indexOf(res), 1);
    });
  });

  /** Send data to relevant clients **/
  srcResponse.setEncoding('binary');
  srcResponse.on('data', function (chunk) {
    var i;
    for (i = audienceClients.length; i--;) {
      audienceClients[i].write(chunk, 'binary');
    }
  });
});
