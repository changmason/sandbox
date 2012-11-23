var assert = require("assert")
describe('String', function(){

  // beforeEach( function (){ console.log( 'before #indexOf()' ); });
  describe('#indexOf()', function(){

    // beforeEach( function (){ console.log( 'before it!' ); });
    it('should return -1 when the value is not present', function( done ){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
      setTimeout( done, 1000 );
      // done();
    });
  });
});