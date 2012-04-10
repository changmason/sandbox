var https = require('https');
var options = {
  host: 'gdata.youtube.com',
  port: 443,
  path: '/feeds/api/videos?alt=json',
  method: 'GET',
};

var data = '';
var req  = https.request( options, function( res ){
  console.log( '\nResponse code: ');
  console.log( res.statusCode );
  console.log( '\nHeaders: ' );
  console.log( res.headers );

  res.on( 'data', function ( chunk ){
    data = data + chunk;
  });

  res.on( 'end', function (){
    json = JSON.parse( data );
    console.log( '\nSingle feed entry data: ' );
    console.log( json[ 'feed' ][ 'entry' ][ 0 ]);
  });
});
req.end();

req.on('error', function( err ){
  console.error( err );
});