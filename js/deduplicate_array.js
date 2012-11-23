


Array.prototype.unique_by = function ( key ){
  var hash   = {};
  var object = {};
  var result = [];

  for( var i = 0; i < this.length; i++ ){
    object = this[ i ];

    if( !hash[ object[ key ] ]){
      result.push( object );
      hash[ object[ key ] ] = true;
    }
  }

  return result;
};

var test_array = [
  { id : 1, animal : 'cat' },
  { id : 2, animal : 'dog' },
  { id : 3, animal : 'tiger' },
  { id : 1, animal : 'cat' }
];

console.log( test_array.unique_by( 'id' ));
