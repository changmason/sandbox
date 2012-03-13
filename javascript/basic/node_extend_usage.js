// experimenting library : node.extend

var extend = require( "node.extend" );
var string = ""
var array1 = []
var array2 = []


String.prototype.to_shit = function (){
  return "shit";
}
console.log("string.to_shit() returns: " + string.to_shit() );

extend( true, array1, string );
console.log( "array1.to_shit() returns: " + array1.to_shit() );

extend( false, array2, string );
try {
  console.log( "array2.to_shit() returns: " + array2.to_shit() );
} catch(err) {
  console.log( "[ERROR] array2.to_shit() doesn't exist" );
}