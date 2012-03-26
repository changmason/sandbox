// demostrate how to create https request

var https = require('https');
var options = {
  host: 'api.github.com',
  port: 443,
  path: '/users/changmason',
  method: 'GET',
};

var req = https.request( options, function( res ){
  console.log( 'statusCode: ', res.statusCode );
  console.log( 'headers: ', res.headers );

  res.on( 'data', function ( data ){
    process.stdout.write( data );
  });
});
req.end();

req.on('error', function( err ){
  console.error( err );
});