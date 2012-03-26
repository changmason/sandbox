// demostrate how to create http request

var https   = require('https');
var client  = http.createClient( 80, 'www.google.com' );
var request = client.request('GET', '/');

request.on('response', function(response) {
  console.log( "[begin response]" );

  response.on('data', function(chunk) {
    console.log( chunk.toString());
  });

  response.on('end', function() {
    console.log( "[end of response]" );
  });
});

request.end();

