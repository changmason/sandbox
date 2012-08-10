// Test how moment.js add 1 month to a given date

var moment = require( 'moment' );
var month  = null;

for(var i=1; i<366; i++){
  var d1 = moment( new Date( 2012, 0, i, 8, 0, 0 ));
  var d2 = moment( d1 ).add( 'months', 1 );

  if( month != d1.month()){
    console.log( d1.format( "\\nMMMM" ));
  }

  month = d1.month()

  console.log(
    '  ',
    d1.format( 'YYYY-MM-DD' ),
    ' ---> ',
    d2.format( 'YYYY-MM-DD' ));
}


