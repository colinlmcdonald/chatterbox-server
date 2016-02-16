/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
//var dispatcher = require('httpdispatcher');
  var object = {
    results: [],
  };

var requestHandler = function(request, response) {

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);
  console.log('Data request: ', response.data);

  // The outgoing status.
  var statusCode = 200;


  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "application/json";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

//we need to do the following:
//add on response for our GET request
//add on data response for POST that concats the chunks we are getting
//add on end for our post

 //   object.results.push(request.method);
    //we need write the response headers inside of each 'post' & 'get'

if (request.method === 'POST') {
  statusCode = 201;
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
    //object.results.push(data)
  });
  request.on('end', function() {
    var parsedData = JSON.parse(data);
    object.results.push(parsedData);
    response.writeHead(statusCode, headers);
    console.log('!!!!!!!!!!!!! INSIDE POST', object)
      var getResult = JSON.stringify(object);
      console.log('------------ INSDE POST', getResult)
    response.end(getResult);
  })
}

if (request.method === 'GET') {
  console.log('88888888888', object);
  var getResult = JSON.stringify(object);
  console.log('****** INSIDE GET', getResult);
  response.end(getResult);
}

response.writeHead(statusCode, headers);
// if (request.method === 'POST'){
//   var data;
//    request.on('data', function(chunk) {
//     data += chunk;
//    })
//    request.on('end', function() {
//     response.writeHead(201, headers)
//     object.results.push(data);
//     var getResult = JSON.stringify(object);
//     response.end(getResult);
//    })
// }

// console.log('inside GET ----------',object)
// if(request.method === 'GET'){
//   resquest.on('end', function() {
//     response.writeHead(200, headers)
//     console.log('this is object in GET ', object)
//     var getResult = JSON.stringify(object);
//     response.end(getResult);  
//   })
// }
// if(request.method === "GET") {
//       response.writeHead(200, {'Content-Type': 'application/json'});
//       response.end(formOutput);
//   } else if(request.method === "POST") {
//       var requestBody = '';
//       request.on('data', function(data) {
//         requestBody += data;
//       });
//       request.on('end', function() {
//         var formData = JSON.stringify(requestBody);
//         response.writeHead(201, {'Content-Type': 'application/json'});
//         response.end(formData);
//       });
//      else {
//       response.writeHead(404, 'Resource Not Found', {'Content-Type': 'text/html'});
//       response.end('<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>');
//     }
//   } 
// }

  

  //response.writeHead(statusCode, headers);
  
  // try {
  //     //log the request on console
  //     console.log(request.url);
  //     //Disptach
  //     dispatcher.dispatch(request, response);
  // } catch(err) {
  //     console.log(err);
  // }

  // request.on('error', function(err) {
  //   console.error(err);
  // }).on('data', function(chunk) {
  //   body.push(chunk);
  // }).on('end', function() {
  //   body = Buffer.concat(body).toString();
  // }
    

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  //response.end(object);
};


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;