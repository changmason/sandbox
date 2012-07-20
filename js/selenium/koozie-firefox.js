var koozie = require( 'koozie' );
var assert = require( 'assert' );

koozie.createServer({
  bin     : 'selenium-server-standalone-2.24.1.jar'
  }, function (){

  // start firefox
  var browser = koozie.createClient({
    host    : 'localhost',
    port    : 4444,
    url     : 'http://www.google.com',
    browser : 'firefox'
  });

  // perform tests like you normally would when using soda
  browser.chain.
    session().
    open( '/' ).
    type( 'q', 'Hello World' ).
    click( 'btnK' ).
    waitForElementPresent( 'foot' ).
    getTitle( function ( title ){
      assert.ok( ~title.indexOf( 'Hello World' ));
    }).
    end( function ( err ){
      browser.testComplete( function (){
        console.log( 'done' );

        if( err ) throw err;

        // cleanup when you're done (optional)
        koozie.stopServer();
      });
    });
});


