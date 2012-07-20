// example code for webdriverjs, notice that remember start
// selenium server before running this example.

var assert    = require( 'assert' );
var webdriver = require( 'webdriverjs' );
var client    = webdriver.remote({
                  logLevel : 'silent',
                  desiredCapabilities : {
                    browserName : 'firefox'
                  }});

client.
  init().
  url( 'http://www.google.com' ).
  setValue( '[name="q"]', 'Hello World' ).
  click( '[name="btnK"]' ).
  waitFor( '#foot', 30000 ).
  getTitle( function ( title ){
    assert.ok( ~title.indexOf( 'Hello World' ));
  }).
  end();


