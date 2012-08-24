// Test if browser refuse to send cookies in a redirect request,
// the test result shows that express v3 `does` get the cookies
// after a redirect. So the problem may be caused by coke itself

var express = require( 'express' );
var app     = express();

app.get( '/aaa', function( req, res ){
  res.cookie( 'action_1', 'aaa' );
  res.send( 'In action `aaa`' );

  console.log( '\n# /aaa' );
  console.log( '-> req : ', req.headers );
  console.log( '-> res : ', res._headers );
});

app.get( '/bbb', function ( req, res ){
  res.cookie( 'action_2', 'bbb' );
  res.redirect( '/ccc' );

  console.log( '\n# /bbb' );
  console.log( '-> req : ', req.headers );
  console.log( '-> res : ', res._headers );
});

app.get( '/ccc', function ( req, res ){
  res.cookie( 'action_3', 'ccc' );
  res.send( 'In action `ccc`' );

  console.log( '\n# /ccc' );
  console.log( '-> req : ', req.headers );
  console.log( '-> res : ', res._headers );
});

app.listen( 3000 );
console.log( '\nListening on port 3000\n' );


